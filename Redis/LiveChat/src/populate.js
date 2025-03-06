const chatModel = require('./models/chat');

// Sample test data
const testUsers = [
    { id: 'user1', name: 'Alice', email: 'alice@example.com' },
    { id: 'user2', name: 'Bob', email: 'bob@example.com' },
    { id: 'user3', name: 'Charlie', email: 'charlie@example.com' }
];

const testRooms = [
    { id: 'room1', name: 'General Chat', description: 'Public chat room for everyone' },
    { id: 'room2', name: 'Tech Talk', description: 'Discussion about technology' }
];

const testMessages = [
    { roomId: 'room1', userId: 'user1', content: 'Hello everyone!' },
    { roomId: 'room1', userId: 'user2', content: 'Hi Alice!' },
    { roomId: 'room2', userId: 'user3', content: 'Anyone interested in Redis?' },
    { roomId: 'room2', userId: 'user1', content: 'Redis is awesome!' }
];

// Populate database with test data
async function populateDatabase() {
    try {
        console.log('Populating database with test data...');

        // Create users
        for (const user of testUsers) {
            await chatModel.createUser(user.id, user);
            console.log(`Created user: ${user.name}`);
        }

        // Create rooms
        for (const room of testRooms) {
            await chatModel.createRoom(room.id, room);
            console.log(`Created room: ${room.name}`);
        }

        // Add users to rooms and create messages
        for (const message of testMessages) {
            await chatModel.addUserToRoom(message.roomId, message.userId);
            await chatModel.saveMessage(message.roomId, message);
            console.log(`Added message from ${message.userId} to ${message.roomId}`);
        }

        console.log('Database population completed successfully!');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        await chatModel.disconnect();
        process.exit(0);
    }
}

// Run the population script
populateDatabase();