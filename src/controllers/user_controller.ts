import { AppDataSource } from '../db/orm/data-source';
import { User } from '../entity/User';
import { Context } from 'hono';
//import SmsService from '../services/sms_service';
import { generateSecureRandomCode } from '../utils/randomCodeGenerator';
import * as dotenv from 'dotenv';
import { handleErrorResponse, handleSuccessResponse } from '../utils/response';
import { And, Any, In } from 'typeorm';
import { error } from 'console';
import { UserDevMapping } from '../entity/UserDevMapping';
import { compareSync } from 'bcrypt';
import { Device } from '../entity/Device';
import { MaintenanceOrders } from '../entity/MaintenanceOrders';
import jwt from 'jsonwebtoken';

//import redisClient from '../services/redisClient';

// 加载 .env 文件
dotenv.config({ path: '.env.dev' });

// JWT密钥，实际应用中应该放在环境变量中
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserController {
    //获取一个树木的订单养护列表
    async getTaskList(c: Context) {
        const ordersRepository = AppDataSource.getRepository(MaintenanceOrders);
        const { id } = c.req.param();
        console.log("id:", id);
        // 验证 id 是否有效（例如，是否为数字）
        if (!id || isNaN(parseInt(id, 10))) {
            return handleErrorResponse(c, 'Invalid or missing user_id parameter', 400);
        }
        try {
            const oreders = await ordersRepository.find({
                where: { id: parseInt(id, 10) },
            });
            return handleSuccessResponse(c, oreders);
        } catch (error) {
            console.error('Error fetching users:', error); // 添加日志输出
            return handleErrorResponse(c, '查找失败', 500, error);
        }
    }
    async getUsers(c: Context) {
        const userRepository = AppDataSource.getRepository(User);
        try {

            const users = await userRepository.find();
            return handleSuccessResponse(c, users);
        } catch (error) {
            console.error('Error fetching users:', error); // 添加日志输出
            return handleErrorResponse(c, '查找失败', 500, error);
        }
    }
    async getMyDev(c: Context) {
        const userDevMappingRepository = AppDataSource.getRepository(UserDevMapping);
        const devRepository = AppDataSource.getRepository(Device);
        try {
            // 从请求参数中获取 user_id
            const user_id = c.req.query('user_id');
            console.log(user_id);
            if (!user_id || isNaN(parseInt(user_id, 10))) {
                return handleErrorResponse(c, 'Invalid or missing user_id parameter', 400);
            }
            // 查找用户设备映射表中的记录
            console.log("到这儿了吗？");
            const parsedUserId = parseInt(user_id, 10);
            console.log("userID:", parsedUserId)
            const userDevMappings = await userDevMappingRepository.find({
                where: { user_id: parsedUserId },
            });
            console.log("mappings", userDevMappings);
            // 提取所有的 dev_id
            const devIds = userDevMappings.map(mapping => mapping.dev_id);
            console.log("devIds", devIds);
            // 根据 dev_id 查询设备表
            const devices = await devRepository.find({
                where: { id: In(devIds) }, // 使用 In 操作符查找多个 dev_id
            });
            console.log("devices", devices);
            return handleSuccessResponse(c, devices);
        }
        catch (error) {
            console.error('Error fetching devices:', error ? (error instanceof Error ? error.stack : JSON.stringify(error, null, 2)) : 'Unknown error');
            return handleErrorResponse(c, 'Failed to fetch devices', 500, error);
        }
    }
    async getUserById(c: Context) {
        try {
            const { id } = c.req.param();
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id: id });
            if (!user) {
                return handleErrorResponse(c, '没找到该用户', 404, error)
            }

            return handleSuccessResponse(c, user)
        } catch (error) {
            console.error('Error fetching user:', error); // 添加日志输出
            return handleErrorResponse(c, '出错了', 404, error)
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
    //登录的逻辑实现
    async login(c: Context) {
        try {
            const requestBody = await c.req.json();
            const { user_name, password, phone, verificationCode } = requestBody;

            if (user_name && password) {
                // 用户名和密码登录
                console.log("正在进行用户名和密码登录：", user_name, password);
                let result = await this.loginByUsernameAndPassword(user_name, password);
                
                // 生成 JWT token
                const token = jwt.sign(
                    { 
                        id: result.user.id,
                        user_name: result.user.user_name,
                        phone: result.user.phone,
                        // 添加其他你想要包含在 token 中的用户信息
                    },
                    JWT_SECRET,
                    { expiresIn: '24h' } // token 24小时后过期
                );

                // 返回用户信息和 token
                return handleSuccessResponse(c, token, "登录成功", 200);
            } else if (phone && verificationCode) {
                // 手机号和验证码登录逻辑保持不变
                return handleErrorResponse(c, '暂不支持验证码登录', 400);
            } else {
                return handleErrorResponse(c, 'Invalid parameters', 400);
            }
        } catch (error) {
            console.error('Error during login:', error);
            return handleErrorResponse(c, 'Internal Server Error', 500, error);
        }
    }
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

