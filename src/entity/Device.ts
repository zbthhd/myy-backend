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

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('myt01_iot_record')
export class Device {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50 })
    deviceName: string;

    @Column({ type: 'bigint' })
    time: number;

    @Column({ type: 'float' })
    LightLux: number;

    @Column({ type: 'float' })
    RelativeHumidity: number;

    @Column({ type: 'float' })
    SoilEC: number;

    @Column({ type: 'float' })
    SoilPH: number;

    @Column({ type: 'float' })
    SoilHumidity: number;

    @Column({ type: 'float' })
    SoilTemperature: number;

    @Column({ type: 'float' })
    SoilN: number;

    @Column({ type: 'float' })
    SoilP: number;

    @Column({ type: 'float' })
    SoilK: number;

    @Column({ type: 'tinyint', width: 1 })
    WaterOutletSwitch: number;

    @Column({ type: 'float' })
    CurrentTemperature: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date;
}
