import { Router } from 'express'
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();

router.get("/users", userController.all);
router.get("/users/:id", userController.view);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

export { router };