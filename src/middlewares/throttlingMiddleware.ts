import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { config } from '../config';

const points: number = parseInt(config.maxThrottlLimit);

const rateLimiter = new RateLimiterMemory({
  points: points,
  duration: 2, // per second
});

export const throttlingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ipAddress: any = req.ip;
  console.log("Request From IP Address: "+ipAddress);
  rateLimiter.consume(ipAddress)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ message: 'Too many requests. Please try again later.' });
    });
};
