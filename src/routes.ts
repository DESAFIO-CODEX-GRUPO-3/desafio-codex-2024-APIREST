import { Router } from "express";
import UserController from "./Controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.post('/user', userController.createUser);

export { routes };