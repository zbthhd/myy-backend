import { Hono } from 'hono';
import { UserController } from '../controllers/user_controller';
import { handleErrorResponse, handleSuccessResponse } from '../utils/response';
import { authMiddleware } from '../middleware/auth';

const userController = new UserController();

const userRoutes = new Hono();



// 公开路由
userRoutes.post('/login', userController.login.bind(userController));

// 需要认证的路由
userRoutes.get('/users', authMiddleware, userController.getUsers);
userRoutes.get('/users/id', authMiddleware, userController.getUserById);
userRoutes.get('/users/get-mydev', authMiddleware, userController.getMyDev);
userRoutes.get('/tree/task/:id/list', authMiddleware, userController.getTaskList);
userRoutes.post('/users/upload-consultation', authMiddleware, userController.upload_consultations);
userRoutes.post('/users/upload-work-order', authMiddleware, userController.upload_work_order);
userRoutes.post('/users/maintenance-appointment', authMiddleware, userController.maintenance_tree);
userRoutes.get('/users/check-orders', authMiddleware, userController.getOrdersByUserId);
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

export default userRoutes;
