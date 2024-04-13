import { Router } from "express";
import UserController from "./Controllers/UserController";
import { validateJWT, validateUser } from "./Middlewares/Authentication";
import TodoListController from "./Controllers/TodoListController";
import TaskController from "./Controllers/TaskController";

const routes = Router();

const userController = new UserController();
const todoListController = new TodoListController();
const taskController = new TaskController();

routes.post('/user', userController.createUser);
routes.post('/user/login', validateUser, userController.login);
routes.post('/logout', validateJWT, userController.logout);

routes.post('/todolist', validateJWT, todoListController.create);
routes.get('/todolist', validateJWT, todoListController.getAll);
routes.get('/todolist/:id', validateJWT, todoListController.getById);
routes.put('/todolist/:id', validateJWT, todoListController.update);
routes.delete('/todolist/:id', validateJWT, todoListController.delete);

routes.post('/task', validateJWT, taskController.create);
routes.get('/task', validateJWT, taskController.getAll);
routes.get('/task/:id', validateJWT, taskController.getById);
routes.patch('/task', validateJWT, taskController.check);
routes.put('/task', validateJWT, taskController.update);
routes.delete('/task/:id', validateJWT, taskController.delete);

export { routes };