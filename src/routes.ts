import { Router } from "express";
import UserController from "./Controllers/UserController";
import { validateJWT, validateUser } from "./Middlewares/Authentication";
import TodoListController from "./Controllers/TodoListController";

const routes = Router();

const userController = new UserController();
const todoListController = new TodoListController();

routes.post('/user', userController.createUser);
routes.post('/user/login', validateUser, userController.login);
routes.post('/logout', validateJWT, userController.logout);

routes.post('/todolist', validateJWT, todoListController.create);
routes.put('/todolist/:id', validateJWT, todoListController.update);
routes.delete('/todolist/:id', validateJWT, todoListController.delete);

routes.post('/task', validateJWT);
routes.put('/task', validateJWT);
routes.delete('/task/:id', validateJWT);

export { routes };