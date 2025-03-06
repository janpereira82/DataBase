const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// Redis client configuration
const redisConfig = {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD,
};

// Create Redis client
const createRedisClient = async () => {
    const client = createClient(redisConfig);

    client.on('error', (err) => console.error('Redis Client Error:', err));
    client.on('connect', () => console.log('Redis Client Connected'));

    await client.connect();
    return client;
};

// Create Redis subscriber client (for Pub/Sub)
const createSubscriber = async () => {
    const subscriber = createClient(redisConfig);

    subscriber.on('error', (err) => console.error('Redis Subscriber Error:', err));
    subscriber.on('connect', () => console.log('Redis Subscriber Connected'));

    await subscriber.connect();
    return subscriber;
};

// Create Redis publisher client (for Pub/Sub)
const createPublisher = async () => {
    const publisher = createClient(redisConfig);

    publisher.on('error', (err) => console.error('Redis Publisher Error:', err));
    publisher.on('connect', () => console.log('Redis Publisher Connected'));

    await publisher.connect();
    return publisher;
};

module.exports = {
    createRedisClient,
    createSubscriber,
    createPublisher
};