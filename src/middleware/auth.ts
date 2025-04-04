// import { Context, Next } from 'hono';
// import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { handleErrorResponse } from '../utils/response';

import { sign } from 'hono/jwt';
import { verify } from 'hono/jwt'
import { Context, Next } from 'hono';
import { JwtTokenExpired } from 'hono/utils/jwt/types';
// 加载环境变量
dotenv.config({ path: '.env.dev' });

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';



// 生成JWT令牌
export const generateToken = async (payload: any) => {
  return await sign(payload, JWT_SECRET);
};


// 验证JWT令牌
export const verifyToken = async (token: string) => {
  try {
    return await verify(token, JWT_SECRET);
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
    const decoded = await verifyToken(token);
 

    if (!decoded) {
      return handleErrorResponse(c, '无效的令牌', 401);
    }


    // 将解码后的用户信息添加到请求上下文中
    c.set('user', decoded);

    // 继续处理请求
    await next();
  } catch (error) {

    if (error instanceof Error) {
      // 检查是否是 JwtTokenExpired 错误
      if (error.name === 'JwtTokenExpired') {
        return handleErrorResponse(c, 'Token已过期，请重新登录', 401);
      }
      // 其他类型的错误
      console.error('Token验证错误:', error.message);
      return handleErrorResponse(c, '认证失败，请重新登录', 401);
    } else {
      // 如果 error 不是 Error 类型，记录原始值并返回通用错误
      console.error('未知错误:', error);
      return handleErrorResponse(c, '认证失败，请稍后重试', 500);

    }

  }
}; 