import { AppDataSource } from '../../db/orm/data-source';
import { Device } from '../../entity/Device';

export class DataFluctuationService {
  private deviceRepository = AppDataSource.getRepository(Device);

  // ... 保留原有的 fluctuationRanges 定义 ...
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

  async updateWithFluctuation() {
    const devices = await this.deviceRepository.find();
    for (const device of devices) {

      for (const [field, range] of Object.entries(this.fluctuationRanges)) {
        if (this.isDeviceField(field) && typeof device[field] === 'number') {
          const fluctuation = (Math.random() - 0.5) * 2 * range;
          (device[field] as number) = Number((device[field] as number + fluctuation).toFixed(2));
        }
      }

      await this.deviceRepository.save(device);
    }
  }


  // ... 保留原有的 isDeviceField 方法 ...
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




