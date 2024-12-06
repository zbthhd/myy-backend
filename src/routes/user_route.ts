import { Hono } from 'hono';
import { UserController } from '../controllers/user_controller';

const userController = new UserController();

const app = new Hono();

app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUserById);

export default app;