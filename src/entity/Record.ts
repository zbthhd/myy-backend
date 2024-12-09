

// const ddl = `create table myy_dev.test
//              (
//                  id                 bigint auto_increment primary key,
//                  deviceName         text   not null,
//                  time               bigint not null,
//                  WaterOutletSwitch  tinyint(1) null,
//                  CurrentTemperature float null,
//                  RelativeHumidity   float null,
//                  LightLux           float null,
//                  SoilTemperature    float null,
//                  SoilHumidity       float null,
//                  SoilPH             float null,
//                  SoilEC             float null,
//                  SoilK              float null,
//                  SoilP              float null,
//                  SoilN              float null
//              );`


import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Record {

    @PrimaryGeneratedColumn('increment', {type: 'bigint'})
    id: number

    @Column('varchar', {length: 255})
    deviceName: string

    @Column('bigint')
    timestamp: number

    @Column('tinyint', {width: 1})
    WaterOutletSwitch: number

    @Column('float')
    CurrentTemperature: number

    @Column('float')
    RelativeHumidity: number

    @Column('float')
    LightLux: number

    @Column('float')
    SoilTemperature: number

    @Column('float')
    SoilHumidity: number

    @Column('float')
    SoilPH: number

    @Column('float')
    SoilEC: number

    @Column('float')
    SoilK: number

    @Column('float')
    SoilP: number

    @Column('float')
    SoilN: number

}
