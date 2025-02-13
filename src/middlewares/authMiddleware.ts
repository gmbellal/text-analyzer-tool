import { Request, Response, NextFunction } from 'express';
import {logError } from '../utils/logVisualizer';
import { config } from '../config';
import jwt from 'jsonwebtoken';



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }
  const token: string = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next(); // Move to the next middleware
  } catch (error) {
    logError('Invalid or expired token : '+token);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
