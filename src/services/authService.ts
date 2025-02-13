import bcrypt from 'bcrypt';
import {logError } from '../utils/logVisualizer';
import { config } from '../config';


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
}
