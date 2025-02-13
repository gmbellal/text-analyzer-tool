import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI!,
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || '6379',
  redisPassword: process.env.REDIS_PASSWORD || '',
  secretKey: process.env.SECRET_KEY!,
  expiresIn: process.env.EXPIRES_IN!,
  saltRounds: process.env.SALT_ROUNDS!,
  maxThrottlLimit: process.env.MAX_THROTTL_LIMIT!,
};