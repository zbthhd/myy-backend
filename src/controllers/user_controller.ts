import { AppDataSource } from '../db/orm/data-source';
import { User } from '../entity/User';
import { Context } from 'hono';
//import SmsService from '../services/sms_service';
import { generateSecureRandomCode } from '../utils/randomCodeGenerator';
import * as dotenv from 'dotenv';
import { handleErrorResponse, handleSuccessResponse } from '../utils/response';

//import redisClient from '../services/redisClient';

// 加载 .env 文件
dotenv.config({ path: '.env.dev' });



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
            const user = await userRepository.findOneBy({ id: id });
            if (!user) {
                return c.json({ error: 'User not found' }, 404);
            }

            return c.json(user, 200);
        } catch (error) {
            console.error('Error fetching user:', error); // 添加日志输出
            return c.json({ error: 'Internal Server Error' }, 500);
        }
    }
    // //实现发送验证码的功能
    // async getVerifaction(phone: string) {
    //     try {
    //         const smsService = new SmsService();

    //         // 从环境变量中读取 signName 和 templateCode
    //         const signName = process.env.SIGN_NAME;
    //         const templateCode = process.env.TEMPLATE_CODE;
    //         const code = generateSecureRandomCode(6); // 示例验证码，可以随机生成


    //         if (!signName || !templateCode) {
    //             throw new Error('Missing required environment variables for SMS service');
    //         }

    //         const result = await smsService.sendVerificationCode(phone, code, signName, templateCode);

    //         if (result.success) {
    //             console.log('验证码发送成功');
    //         } else {
    //             console.error('验证码发送失败');
    //         }
    //     } catch (error) {
    //         if (error instanceof Error) { // 进行类型检查和断言
    //             console.error('处理过程中发生错误:', error.message);
    //         } else {
    //             console.error('处理过程中发生未知错误:', error);
    //         }
    //     }
    // }

    // //实现发送验证码的功能
    // async register(c: Context) {
    //     try {
    //         const requestBody = await c.req.json();
    //         const { phone, verificationCode } = requestBody;

    //         if (!phone || !verificationCode) {
    //             return handleErrorResponse(c, 'Phone number and verification code are required', 400);
    //         }

    //         // 从 Redis 获取验证码
    //         const storedVerificationCode = await redisClient.get(`verification:${phone}`);

    //         if (!storedVerificationCode) {
    //             return handleErrorResponse(c, 'No verification code found for this phone number', 400);
    //         }

    //         if (storedVerificationCode !== verificationCode) {
    //             return handleErrorResponse(c, 'Invalid verification code', 400);
    //         }

    //         // 清除已验证的验证码
    //         await redisClient.del(`verification:${phone}`);

    //         // 执行注册逻辑，例如保存用户信息到数据库
    //         const userRepository = AppDataSource.getRepository(User);
    //         const newUser = new User();
    //         newUser.phone = phone;

    //         // 设置其他必要的用户属性
    //         await userRepository.save(newUser);

    //         return handleSuccessResponse(c, null, 'User registered successfully', 200);
    //     } catch (error) {
    //         console.error('Error during registration:', error);
    //         return handleErrorResponse(c, 'Internal Server Error', 500, error);
    //     }
    // }
    // //登录的逻辑实现
    // async login(c: Context) {
    //     try {
    //         const requestBody = await c.req.json();
    //         const { user_name, password, phone, verificationCode } = requestBody;

    //         if (user_name && password) {
    //             // 用户名和密码登录
    //             console.log("正在进行用户名和密码登录：", user_name, password);
    //             let result = await this.loginByUsernameAndPassword(user_name, password);
    //             return handleSuccessResponse(c, result.user, "登录成功", 200);
    //         } else if (phone && verificationCode) {
    //             // 手机号和验证码登录
    //             let result = await this.loginByPhoneAndVerificationCode(phone, verificationCode);
    //             if (result.success == true) {
    //                 return handleSuccessResponse(c, result.user, "登录成功", 200);
    //             }
    //         } else {
    //             return handleErrorResponse(c, 'Invalid parameters', 400);
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //         return handleErrorResponse(c, 'Internal Server Error', 500, error);
    //     }
    // }
    //根据用户名和密码登录
    private async loginByUsernameAndPassword(username: string, password: string) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { user_name: username } });
        console.log("user:", user);
        if (!user) {
            throw new Error('User not found');
        }
        let isPasswordValid = false;
        if (password === user.password) {
            console.log("密码正确");
            isPasswordValid = true;
        }
        else {
            isPasswordValid = false;
        }

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // 登录成功，返回用户信息或生成 token 等操作
        return { success: true, user };
    }
    // //根据电电话号码和验证码登录
    // private async loginByPhoneAndVerificationCode(phone: string, verificationCode: string) {
    //     const userRepository = AppDataSource.getRepository(User);
    //     const user = await userRepository.findOne({ where: { phone } });

    //     if (!user) {
    //         throw new Error('User not found');
    //     }

    //     // 从 Redis 获取验证码
    //     const storedVerificationCode = await redisClient.get(`verification:${phone}`);

    //     if (!storedVerificationCode) {
    //         throw new Error('No verification code found for this phone number');
    //     }

    //     if (storedVerificationCode !== verificationCode) {
    //         throw new Error('Invalid verification code');
    //     }

    //     // 清除已验证的验证码
    //     await redisClient.del(`verification:${phone}`);

    //     // 登录成功，返回用户信息或生成 token 等操作
    //     return { success: true, user };
    // }


}

