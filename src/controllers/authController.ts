import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserService } from '../services/userService';

export class AuthController {
  
  static async login(req: Request, res: Response) {
    const {username, password } = req.body;
    const user = await UserService.getUser(username);
    if (!user) {
      return res.status(404).json({ message: 'Invalid username or password' });
    }else {
      const isMatch = await AuthService.checkPassword(password, user.password);
      if (isMatch) {
        const response = {
          id: user._id,
          name: user.name,
          username: user.username,
          signData: await AuthService.generateToken({ id: user._id, name: user.name, username: user.username })
        }
        return res.status(200).json({ message: 'Login successful', data: response });
      }else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    }
  }

}
