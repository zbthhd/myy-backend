import "reflect-metadata"
import {DataSource} from "typeorm"
import * as dotenv from "dotenv"

dotenv.config({path: '.env.dev'})


import {User} from "./entity/User";
import {Tree} from "./entity/Tree";

// export const createAppDataSource = (
//     host: string,
//     port: number,
//     username: string,
//     password: string,
//     database: string,
// ) => {
//     return new DataSource({
//         type: "mysql",
//         host: host,
//         port: port,
//         username: username,
//         password: password,
//         database: database,
//         synchronize: true,
//         logging: false,
//         entities: [User,Tree],
//         migrations: [],
//         subscribers: [],
//         // entitySkipConstructor: true,
//     })
// }


// export const AppDataSource = createAppDataSource(
//     process.env.DB_HOST,
//     parseInt(process.env.DB_PORT),
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     process.env.DB_NAME
// )

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User,Tree],
    migrations: [],
    subscribers: [],
})

