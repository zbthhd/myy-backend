import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../../entity/User';
import { Tree } from '../../entity/Tree';
import { UserDevMapping } from '../../entity/UserDevMapping';
import { Device } from '../../entity/Device';
import { Record } from '../../entity/Record';

import { MaintenanceOrders } from '../../entity/MaintenanceOrders';



// 加载 .env 文件
dotenv.config({ path: '.env.dev' });

// 显示打印环境变量
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

// 定义数据源
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // 或者 false，根据你的需求
    logging: ['query', 'error'], // 启用查询和错误日志

    entities: [User, Tree, UserDevMapping, Device, Record,MaintenanceOrders],

    migrations: [],
    subscribers: []
});

// 初始化数据源
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });