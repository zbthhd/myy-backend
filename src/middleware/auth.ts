import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { handleErrorResponse } from '../utils/response';

// 加载环境变量
dotenv.config({ path: '.env.dev' });

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// JWT 验证中间件
export const authMiddleware = async (c: Context, next: Next) => {
  // 从请求头中获取 token
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return handleErrorResponse(c, '未授权访问', 401);
  }

  // 提取 token
  const token = authHeader.split(' ')[1];

  try {
    // 验证 token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 将解码后的用户信息添加到请求上下文中
    c.set('user', decoded);
    
    // 继续处理请求
    await next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return handleErrorResponse(c, 'Token已过期', 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      return handleErrorResponse(c, '无效的Token', 401);
    } else {
      console.error('Token验证错误:', error);
      return handleErrorResponse(c, '认证失败', 401);
    }
  }
}; 