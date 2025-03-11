// // sms_service.ts

// import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
// import * as $Util from '@alicloud/tea-util';
// //import redisClient from './redisClient';

// class SmsService {
//   private client: Dysmsapi20170525;

//   constructor() {
//     this.client = this.createClient();
//   }

//   /**
//    * 初始化阿里云客户端
//    * @returns {Dysmsapi20170525} 阿里云短信服务客户端实例
//    */
//   private createClient(): Dysmsapi20170525 {
//     const config = new $OpenApi.Config({
//       accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
//       accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
//     });

//     // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
//     config.endpoint = 'dysmsapi.aliyuncs.com';
//     return new Dysmsapi20170525(config);
//   }

//   /**
//    * 发送验证码
//    * @param phone - 接收验证码的手机号码
//    * @param code - 验证码内容
//    * @param signName - 短信签名名称
//    * @param templateCode - 短信模板编码
//    * @returns {Promise<{ success: boolean }>} 发送结果
//    */
//   async sendVerificationCode(phone: string, code: string, signName: string, templateCode: string) {

//     try {
//       // 创建 SendSmsRequest 对象
//       const request = new $Dysmsapi20170525.SendSmsRequest({
//         Phone: phone,
//         SignName: signName,
//         TemplateCode: templateCode,
//         TemplateParam: JSON.stringify({ code }),
//       });

//       const response = await this.client.sendSms(request);

//       // 检查 response.body 是否存在
//       if (response.body && response.body.code === 'OK') {
//         // 存储验证码到 Redis 并设置过期时间为 5 分钟
//         //      await redisClient.set(`verification:${phone}`, code, 'EX', 300);
//         return { success: true };
//       } else {
//         throw new Error(response.body ? response.body.message : 'Failed to send SMS');
//       }
//     } catch (error: any) {
//       console.error('Failed to send verification code:', error.message);
//       throw error;
//     }
//   }

// }

// export default SmsService;