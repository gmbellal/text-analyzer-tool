import Redis from 'ioredis';
import { config } from '../config';

// Create a Redis client with better features (like automatic reconnection)
const client = new Redis({
  host: config.redisHost,       // Your Redis host
  port: parseInt(config.redisPort), // Your Redis port
  password: config.redisPassword,  // Optional, if your Redis requires authentication
  db: 0,  // Optional, if you're using specific DB numbers in Redis
  lazyConnect: true,  // Optional, connects lazily to Redis to avoid blocking on startup
});

// Listen for errors
client.on('error', (err: any) => {
  console.error('Redis error:', err);
});

export const cache = {
  // Get data from cache
  get: async (key: string): Promise<any> => {
    console.log('Getting data from Redis:', key);
    try {
      const data = await client.get(key);
      return data;
    } catch (err) {
      console.error('Error getting data from Redis:', err);
      throw err;
    }
  },

  // Set data to cache with expiry
  set: async (key: string, value: string, ttl: number = 3600): Promise<void> => {
    try {
      console.log('Setting data to Redis:', key);
      await client.setex(key, ttl, value); // Set with TTL (default is 1 hour)
    } catch (err) {
      console.error('Error setting data to Redis:', err);
      throw err;
    }
  },
};
