import {Hono} from 'hono';
// import {oss_config} from "../config.js";
// import OSS, {STS} from "ali-oss";
// import moment from "moment/moment";
// import * as $OpenApi from "@alicloud/openapi-client"; // 导入连接池


const miscRoutes = new Hono();


// const getToken = async () => {
//     const {accessKeyId, accessKeySecret, roleArn, bucket} = oss_config;
//     console.log(accessKeyId, accessKeySecret, roleArn, bucket);
//     const seconds = 3000; //3000秒，50分钟过期
//     const date = new Date();
//     date.setSeconds(date.getSeconds() + seconds);
//     // const dir = "user-dirs/";
//     const policy = {
//         expiration: date.toISOString(), // 请求有效期。
//         conditions: [
//             ["content-length-range", 0, 1048576000], // 设置上传文件的大小限制。
//             // ["starts-with", "$key", dir], // 限制文件只能上传到user-dirs目录下。
//             {bucket}, // 限制文件只能上传至指定Bucket。
//         ],
//     };
//     /* 使用stsToken上传。 */
//     let stsToken;
//     let client
//     if (roleArn) {
//         let sts = new STS({
//             accessKeyId,
//             accessKeySecret,
//         });
//         const {
//             credentials: {AccessKeyId, AccessKeySecret, SecurityToken},
//         } = await sts.assumeRole(roleArn, "", seconds, "sessiontest");
//         stsToken = SecurityToken;
//         client = new OSS({
//             accessKeyId: AccessKeyId,
//             accessKeySecret: AccessKeySecret,
//             stsToken,
//         });
//     }
//
//     // 计算签名。
//     const formData = await client.calculatePostSignature(policy);
//
//     // 返回参数。
//     return {
//         expire: moment(date).unix().toString(),
//         policy: formData.policy,
//         signature: formData.Signature,
//         accessid: formData.OSSAccessKeyId,
//         stsToken,
//         host: `http://${oss_config.bucket}.${oss_config.region}.aliyuncs.com`,
//         // dir,
//     };
// };

// miscRoutes.get("/oss_token", async (c) => {
//     const result = await getToken();
//     // res.header["Access-Control-Allow-Origin"] = "*";
//     // res.json(result);
//     c.res.headers.set("Access-Control-Allow-Origin", "*");
//     return c.json(result);
// });


export default miscRoutes;
