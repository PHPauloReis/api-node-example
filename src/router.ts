import { Router } from 'express'
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';

const router = Router();

const userController = new UserController();

router.get("/users", userController.all);
router.get("/users/:id", userController.view);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

const surveyController = new SurveyController();

router.get("/surveys", surveyController.all);
router.get("/surveys/:id", surveyController.view);
router.post("/surveys", surveyController.create);
router.put("/surveys/:id", surveyController.update);
router.delete("/surveys/:id", surveyController.delete);

export { router };