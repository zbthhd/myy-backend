// create table if not exists user
// (
//     user_id     int auto_increment primary key comment '用户id',
//     user_name   varchar(20) not null comment '用户名',
//     password    varchar(20) not null comment '密码',
//     create_time date        not null comment '创建时间'
// ) comment '用户信息表';

import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid', {comment: '用户id'})
    id: number

    @Column('varchar', {length: 255, nullable: true})
    user_name: string

    @Column('varchar', {length: 255, nullable: true})
    password: string

    @Column('varchar', {length: 16})
    phone: string

    @Column('varchar', {length: 255})
    wc_unionid: string

    @Column('varchar', {length: 255})
    wc_openid: string

    @Column('int', {nullable: true})
    age: number

    @CreateDateColumn()
    create_time: Date

}
