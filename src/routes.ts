import { Router } from "express";
import UserController from "./Controllers/UserController";
import { validateJWT, validateUser } from "./Middlewares/authentication";

const routes = Router();

const userController = new UserController();

routes.post('/user', userController.createUser);
routes.post('/user/login', validateUser, userController.login);

export { routes };