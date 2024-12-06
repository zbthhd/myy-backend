import { AppDataSource } from '../db/orm/data-source';
import { User } from '../entity/User';
import { Context } from 'hono';

export class UserController {
  async getUsers(c: Context) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      return c.json(users, 200);
    } catch (error) {
      console.error('Error fetching users:', error); // 添加日志输出
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  }

  async getUserById(c: Context) {
    try {
      const { id } = c.req.param();
      const userRepository = AppDataSource.getRepository(User);
      const userId = parseInt(id); // 将字符串转换为数字
      const user = await userRepository.findOne({ where: { user_id: userId } });
      if (!user) {
        return c.json({ error: 'User not found' }, 404);
      }

      return c.json(user, 200);
    } catch (error) {
      console.error('Error fetching user:', error); // 添加日志输出
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  }
}