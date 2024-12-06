// create table odor_dev.device
// (
//     id            int auto_increment comment 'id'
// primary key,
//     device_name   varchar(255) not null comment '设备名',
//     product_key   varchar(255) not null comment '产品key',
//     operator_name varchar(255) null comment '操作人',
//     sensor_id_1   int          null comment '传感器1id;',
//     sensor_id_2   int          null comment '传感器2id;',
//     sensor_id_3   int          null comment '传感器3id;',
//     sensor_id_4   int          null comment '传感器4id;',
//     sensor_id_5   int          null comment '传感器5id;',
//     sensor_id_6   int          null comment '传感器6id;',
//     sensor_id_7   int          null comment '传感器7id;',
//     sensor_id_8   int          null comment '传感器8id;',
//     constraint device_device_name_uindex
// unique (device_name)
// )
// comment '设备';
//

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Device {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 255 })
    device_name: string

    @Column('varchar', { length: 255 })
    product_key: string




}
