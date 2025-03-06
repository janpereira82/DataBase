const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { createSubscriber, createPublisher } = require('./config/redis');
const chatModel = require('./models/chat');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Initialize Redis clients
let subscriber;
let publisher;

// Initialize Redis Pub/Sub
async function initializePubSub() {
    subscriber = await createSubscriber();
    publisher = await createPublisher();

    // Subscribe to chat channels
    subscriber.subscribe('chat', (message) => {
        const parsedMessage = JSON.parse(message);
        io.to(parsedMessage.roomId).emit('message', parsedMessage);
    });
}

// Socket.IO connection handling
io.on('connection', async (socket) => {
    console.log('User connected:', socket.id);

    // Join room
    socket.on('join_room', async ({ userId, roomId }) => {
        socket.join(roomId);
        await chatModel.addUserToRoom(roomId, userId);
        await chatModel.updateUserStatus(userId, 'online');

        // Get room history
        const messages = await chatModel.getRoomMessages(roomId);
        socket.emit('room_history', messages);

        // Notify room about new user
        io.to(roomId).emit('user_joined', { userId, roomId });
    });

    // Handle new message
    socket.on('send_message', async (messageData) => {
        const { roomId, userId, content } = messageData;
        const message = {
            userId,
            content,
            roomId,
            timestamp: Date.now()
        };

        // Save message to Redis
        await chatModel.saveMessage(roomId, message);

        // Publish message to Redis channel
        await publisher.publish('chat', JSON.stringify(message));
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);
    });
});

// Initialize Pub/Sub and start server
initializePubSub().then(() => {
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize Redis Pub/Sub:', err);
    process.exit(1);
});