import { User } from '../models/userModel';

export class UserService {
  static async createUser(name: string, username: string, password: string): Promise<any> {
    const newUser = new User({ name, username, password });
    return newUser.save();
  }

  static async getUser(username: string): Promise<any> {
    return User.findOne({ username });
  }


}
