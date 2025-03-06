const { createRedisClient } = require('../config/redis');

class ChatModel {
    constructor() {
        this.client = null;
        this.initializeClient();
    }

    async initializeClient() {
        try {
            this.client = await createRedisClient();
        } catch (error) {
            console.error('Failed to initialize Redis client:', error);
            throw error;
        }
    }

    // User management
    async createUser(userId, userData) {
        if (!this.client) await this.initializeClient();
        const entries = Object.entries(userData);
        await this.client.hSet(`user:${userId}`, ...entries.flat());
    }

    async getUser(userId) {
        if (!this.client) await this.initializeClient();
        return await this.client.hGetAll(`user:${userId}`);
    }

    async updateUserStatus(userId, status) {
        await this.client.hSet(`user:${userId}`, 'status', status);
    }

    // Room management
    async createRoom(roomId, roomData) {
        const entries = Object.entries(roomData);
        await this.client.hSet(`room:${roomId}`, ...entries.flat());
    }

    async addUserToRoom(roomId, userId) {
        await this.client.sAdd(`room:${roomId}:users`, userId);
    }

    async getRoomUsers(roomId) {
        return await this.client.sMembers(`room:${roomId}:users`);
    }

    // Message management
    async saveMessage(roomId, message) {
        const messageId = await this.client.incr('message:id');
        const messageKey = `room:${roomId}:messages`;
        
        message.id = messageId;
        message.timestamp = Date.now();
        
        await this.client.rPush(messageKey, JSON.stringify(message));
        return messageId;
    }

    async getRoomMessages(roomId, limit = 50) {
        const messages = await this.client.lRange(`room:${roomId}:messages`, -limit, -1);
        return messages.map(msg => JSON.parse(msg));
    }

    // Cleanup
    async disconnect() {
        if (this.client) {
            await this.client.quit();
        }
    }
}

module.exports = new ChatModel();