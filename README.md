# MYY项目后端

## 技术栈

- typescript (编程语言)
- node.js (运行环境)
- Hono (服务器框架)
- typeorm (数据库ORM框架)

## 参考文档

- 微信小程序开发文档 [Doc](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- Hono文档 [Doc](https://hono.dev/)
- typeorm文档 [Doc](http://typeorm.io/)
- pino文档 (日志库) [Doc](https://getpino.io/)
- bcrypt文档 (密码加密库) [Doc](https://github.com/kelektiv/node.bcrypt.js)

## 运行

```
npm install
npm run dev
```

```
open http://localhost:3090
```

开发环境的`.env.dev`文件请联系管理员获取。

## 问题记录

开发过程中踩过的坑可以在这里记录下来，方便后续查阅。

### typeorm中定义实体时出现TS2815

[TS2815 in typeorm](https://github.com/typeorm/typeorm/issues/9111)

目前的解决方法是在`tsconfig.json`中添加如下配置：

```json
"strictPropertyInitialization": false
```

### foo

bar

