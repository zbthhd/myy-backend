import "reflect-metadata"
import {DataSource} from "typeorm"
import * as dotenv from "dotenv"

dotenv.config({path: '.env.dev'})


import {User} from "./entity/User";
import {Tree} from "./entity/Tree";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Tree],
    migrations: [],
    subscribers: [],
})

