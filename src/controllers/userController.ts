import { Request, Response } from 'express';
import {logError } from '../utils/logVisualizer';
import { AuthService } from '../services/authService';
import { UserService } from '../services/userService';


export class UserController {
  
    static async createUser(req: Request, res: Response) {
      const { name, username, password } = req.body;
      await UserService.createUser(name, username, await AuthService.bcrypt(password)).then((user) => {
        user.password = null;
        res.status(200).json({ message: 'Username created successfully', data: user });
      }).catch((err: any) => {
        if (err.code === 11000) {
          res.status(400).json({ message: 'Username already exists', data: null });
        }else{
          logError('Error creating user. Message: ' + err.message.toString()); 
          res.status(500).json({ message: err });
        }
      });
    }
  
  
  
  }