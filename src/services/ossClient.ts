// ossClient.ts

import * as dotenv from 'dotenv';

// 加载 .env 文件
dotenv.config({ path: '.env.dev' });
import OSS from 'ali-oss'; // 使用 import 导入
console.log('OSS_REGION:', process.env.OSS_REGION);
console.log('OSS_ACCESS_KEY_ID:', process.env.OSS_ACCESS_KEY_ID);
console.log('OSS_ACCESS_KEY_SECRET:', process.env.OSS_ACCESS_KEY_SECRET);
console.log('OSS_BUCKET_NAME:', process.env.OSS_BUCKET_NAME);
const ossClient = new OSS({
  region: process.env.OSS_REGION!, // 使用非空断言
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!, // 使用非空断言
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!, // 使用非空断言
  bucket: process.env.OSS_BUCKET_NAME!, // 使用非空断言
});

export default ossClient;