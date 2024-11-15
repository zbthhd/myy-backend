import {Hono} from 'hono';
import {createModuleLogger} from '../utils/logger';
const authLogger = createModuleLogger('auth');

const authRoutes = new Hono();

// 示例
authRoutes.post('/register', async (c) => {
    // 这个type在ApiFox里点击自动生成就行
    type Request = {
        /**
         * 短信验证码
         */
        captcha?: string;
        /**
         * 小程序code
         */
        code: string;
        /**
         * 手机号
         */
        phone?: string;
        [property: string]: any;
    }

    type Response = {
        code: number;
        message: null;
        data?: Data;
        [property: string]: any;
    }

    type Data = {
        /**
         * 登录token
         */
        token: string;
        [property: string]: any;
    }

    // TODO：业务逻辑
    // https://blog.csdn.net/qq_46637011/article/details/141816561
    authLogger.info("Registering a new user...")

    const body: Request = await c.req.parseBody();

    // 校验逻辑
    if ('some error') {
        // 具体参考apifox错误码定义
        authLogger.error('Some error message')
        return c.json({
            code: 40001,
            message: 'Some error message',
        } as Response, 401)

    }

    // 返回
    return c.json({
        code: 200,
        message: null,
        data: {
            // TODO: 返回数据
            token: 'sample_token'
        } as Data
    } as Response)

})

export default authRoutes;
