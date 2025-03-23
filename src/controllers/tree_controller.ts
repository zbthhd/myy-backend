import * as dotenv from 'dotenv';
import { Context } from 'hono';
import { Tree } from 'typeorm';
import { AppDataSource } from '../db/orm/data-source';

// 加载 .env 文件
dotenv.config({ path: '.env.dev' });



export class TreeController {
    //获取苗木的信息列表
    async getList(c: Context) {
        const ordersRepository = AppDataSource.getRepository(Tree);
        const { id } = c.req.param();
    }
}