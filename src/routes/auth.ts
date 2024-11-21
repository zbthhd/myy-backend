import {Hono} from 'hono';
import {createModuleLogger} from '../utils/logger';
import {AppDataSource} from "../db/orm/data-source";
import {User} from "../db/orm/entity/User";
import * as bcrypt from 'bcrypt';
import {Response400} from "../utils/types";

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

    // XXX 1 manager 实体管理器
    const user = new User();
    user.user_name = "Timber";
    user.password = bcrypt.hashSync("Saw1", 10);
    user.phone = "123456789";
    user.wc_openid = "123456789";
    user.wc_unionid = "123456789";
    await AppDataSource.manager.save(user);

    const allUsers = await AppDataSource.manager.find(User); // find all
    const timber = await AppDataSource.manager.findOne(User, {select: ["user_name"], where: {user_name: "Timber"}}); // find by name


    // XXX 2 repository 实体仓库
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({
        user_name: "Timber",
        password: bcrypt.hashSync("Saw2", 10),
        phone: "123456789",
        wc_openid: "123456789",
        wc_unionid: "123456789"
    });
    await userRepository.save(newUser);

    const allUsers2 = await userRepository.find(); // find all
    const firstUser2 = await userRepository.findOneBy({user_name: 'Timber'}); // find one by name
    const timber2 = await userRepository.findBy({user_name: 'Timber', age: 25}) // find by condition
    const [users, usersCount] = await userRepository.findAndCount() // find and count
    console.log(users)
    console.log('count: ' + usersCount)


    // 校验逻辑
    if ('some error') {
        // 具体参考apifox错误码定义
        authLogger.error('Some error message')
        return c.json({
            code: 40001,
            message: 'Some error message',
        } as Response400, 401)

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
