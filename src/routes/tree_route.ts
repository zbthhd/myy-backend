import { Hono } from "hono";
import { TreeController } from "../controllers/tree_controller";


const treeController = new TreeController();

const app = new Hono();
app.get('/tree/list', treeController.getList);

