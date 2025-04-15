import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 为解决找不到 '@nestjs/schedule' 模块的问题，需要安装该模块。
// 请在终端中运行以下命令：
// npm install @nestjs/schedule
import { ScheduleModule } from '@nestjs/schedule';
import { Device } from '../../entity/Device';
import { DataFluctuationService } from '../fluctuation/dataFluctuation.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Device]),
        ScheduleModule.forRoot()
    ],
    providers: [DataFluctuationService]
})
export class FluctuationModule {}