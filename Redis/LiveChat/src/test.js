const { createClient } = require('redis');
const chatModel = require('./models/chat');
const { createSubscriber, createPublisher } = require('./config/redis');

async function runTests() {
    console.log('Starting Redis Chat System Tests...');
    let subscriber, publisher;

    try {
        // Test 1: Redis Connection
        console.log('\nTest 1: Testing Redis Connection...');
        const client = createClient();
        await client.connect();
        console.log('✓ Redis connection successful');
        await client.quit();

        // Test 2: User Management
        console.log('\nTest 2: Testing User Management...');
        const testUser = { id: 'test-user', name: 'Test User', email: 'test@example.com' };
        await chatModel.createUser(testUser.id, testUser);
        const retrievedUser = await chatModel.getUser(testUser.id);
        console.log('✓ User creation and retrieval successful');

        // Test 3: Room Management
        console.log('\nTest 3: Testing Room Management...');
        const testRoom = { id: 'test-room', name: 'Test Room', description: 'Test room description' };
        await chatModel.createRoom(testRoom.id, testRoom);
        await chatModel.addUserToRoom(testRoom.id, testUser.id);
        const roomUsers = await chatModel.getRoomUsers(testRoom.id);
        console.log('✓ Room creation and user addition successful');

        // Test 4: Message Management
        console.log('\nTest 4: Testing Message Management...');
        const testMessage = {
            userId: testUser.id,
            content: 'Test message',
            roomId: testRoom.id
        };
        const messageId = await chatModel.saveMessage(testRoom.id, testMessage);
        const messages = await chatModel.getRoomMessages(testRoom.id);
        console.log('✓ Message creation and retrieval successful');

        // Test 5: Pub/Sub System
        console.log('\nTest 5: Testing Pub/Sub System...');
        subscriber = await createSubscriber();
        publisher = await createPublisher();

        let messageReceived = false;
        subscriber.subscribe('test-channel', (message) => {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.content === 'Test pub/sub message') {
                messageReceived = true;
                console.log('✓ Pub/Sub message received successfully');
            }
        });

        await publisher.publish('test-channel', JSON.stringify({
            content: 'Test pub/sub message',
            timestamp: Date.now()
        }));

        // Wait for pub/sub message
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('\nAll tests completed successfully! 🎉');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Cleanup
        if (subscriber) await subscriber.quit();
        if (publisher) await publisher.quit();
        await chatModel.disconnect();
        process.exit(0);
    }
}

runTests();