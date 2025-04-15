import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../../entity/Device';

@Injectable()
export class DataFluctuationService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  // 定义各字段的波动范围
  private fluctuationRanges = {
    LightLux: 50, // ±50 lux
    RelativeHumidity: 2, // ±2%
    SoilEC: 0.1, // ±0.1
    SoilPH: 0.2, // ±0.2
    SoilHumidity: 1, // ±1%
    SoilTemperature: 0.3, // ±0.3°C
    SoilN: 0.05, // ±0.05
    SoilP: 0.05, // ±0.05
    SoilK: 0.05, // ±0.05
    CurrentTemperature: 0.5, // ±0.5°C
  };

  /**
   * 更新设备数据并添加波动
   */
  async updateWithFluctuation() {
    const devices = await this.deviceRepository.find();

    for (const device of devices) {
      // 为每个字段添加波动
      for (const [field, range] of Object.entries(this.fluctuationRanges)) {
        if (this.isDeviceField(field) && typeof device[field] === 'number') {
          const fluctuation = (Math.random() - 0.5) * 2 * range; // 计算随机波动值
        // 由于类型检查问题，使用类型断言来解决 '不能将类型“number”分配给类型“never”' 的错误
        // 前提是确保 device[field] 是 number 类型
        (device[field] as number) = Number((device[field] as number + fluctuation).toFixed(2)); // 更新字段值
        }
      }

      // 更新设备数据到数据库
      await this.deviceRepository.save(device);
    }
  }

  /**
   * 类型保护：检查字段是否是 Device 的合法键
   */
  private isDeviceField(key: string): key is keyof Device {
    return [
      'LightLux',
      'RelativeHumidity',
      'SoilEC',
      'SoilPH',
      'SoilHumidity',
      'SoilTemperature',
      'SoilN',
      'SoilP',
      'SoilK',
      'CurrentTemperature',
    ].includes(key);
  }
}