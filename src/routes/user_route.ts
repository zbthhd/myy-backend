import { Hono } from 'hono';
import { UserController } from '../controllers/user_controller';
import { handleErrorResponse, handleSuccessResponse } from '../utils/response';


const userController = new UserController();

const app = new Hono();

app.get('/users', userController.getUsers);
app.get('/users/id', userController.getUserById);
app.get('/users/get-mydev', userController.getMyDev);
app.get('/tree/task/:id/list',userController.getTaskList)

// // 新增的根据电话号码获取验证码的接口
// app.get('/user/get-verifiction', async (c) => {
//     const phoneNumber = c.req.query('phoneNumber'); // 从查询参数中提取电话号码

//     if (!phoneNumber) {
//         return c.json({ error: 'Phone number is required' }, 400);
//     }

//     try {
//         const verificationCode = await userController.getVerifaction(phoneNumber);
//         return handleSuccessResponse(c, null, 'Verification code sent successfully', 200);
//     } catch (error) {
//         console.error('Error sending verification code:', error);
//         return handleErrorResponse(c, 'Failed to send verification code', 500, error);
//     }
// });

// // 登录路由
// app.post('/user/login', async (c) => {
//     return userController.login(c);
// });

export default app;
