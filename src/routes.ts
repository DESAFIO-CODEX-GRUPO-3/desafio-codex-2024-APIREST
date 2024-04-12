import { Router } from "express";
import UserController from "./Controllers/UserController";
import { validateJWT, validateUser } from "./Middlewares/Authentication";

const routes = Router();

const userController = new UserController();

routes.post('/user', userController.createUser);
routes.post('/user/login', validateUser, userController.login);
routes.post('/logout', validateJWT, userController.logout);

export { routes };