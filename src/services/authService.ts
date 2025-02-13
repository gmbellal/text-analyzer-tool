import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {logError } from '../utils/logVisualizer';
import { config } from '../config';
import ms from 'ms';


export class AuthService {

  static async bcrypt(password: string): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(parseInt(config.saltRounds));
      const hash = await bcrypt.hash(password, salt);
      return hash;
    }catch (error) {
      console.log(error);
      logError('Error with bcrypt hashing password');
      throw new Error('Error hashing password');
    }
  }


  static async checkPassword(enteredPassword: string, storedHash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(enteredPassword, storedHash);
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  }


  static async generateToken(payload: object, expiresIn: any = config.expiresIn) {
    return {
      token: jwt.sign(payload, config.secretKey, { expiresIn }),
      expiresIn: expiresIn,
      expiryTime: Math.floor(Date.now() / 1000) + Math.floor(parseInt(ms(expiresIn)) / 1000)
    };
  }

  
}
