import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { handleErrorResponse } from '../utils/response';

// 加载环境变量
dotenv.config({ path: '.env.dev' });

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const TOKEN_EXPIRY = '24h'; // 默认24小时

// 生成JWT令牌
export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

// 验证JWT令牌
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

// JWT 验证中间件
export const authMiddleware = async (c: Context, next: Next) => {
  try {
    // 从请求头中获取 token
    const authHeader = c.req.header('Authorization');
    console.log("authHeader", authHeader);
    
    if (!authHeader) {
      return handleErrorResponse(c, '未提供认证令牌', 401);
    }

    // 提取 token，处理有无Bearer前缀的情况
    let token;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      token = authHeader; // 直接使用整个header作为token
    }
    
    if (!token || token.trim() === '') {
      return handleErrorResponse(c, '令牌不能为空', 401);
    }
    
    console.log("token", token);
    
    // 验证 token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return handleErrorResponse(c, '无效的令牌', 401);
    }

    
    // 将解码后的用户信息添加到请求上下文中
    c.set('user', decoded);
    
    // 继续处理请求
    await next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {

      return handleErrorResponse(c, 'Token已过期，请重新登录', 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      return handleErrorResponse(c, '无效的Token格式', 401);
    } else if (error instanceof jwt.NotBeforeError) {
      return handleErrorResponse(c, 'Token尚未生效', 401);
    } else {
      console.error('Token验证错误:', error);
      return handleErrorResponse(c, '认证失败，请重新登录', 401);

    }
  }
}; 