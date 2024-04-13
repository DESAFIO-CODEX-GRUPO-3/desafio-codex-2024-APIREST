import { Request, Response } from "express";
import { OurRequest } from "../types/RequestTypes";
import userService from "../Services/UserService";
import todoListService from "../Services/TodoListService";
import { TodoListBuilder } from "../Entities/TodoList";
import TodoListValidationError from "../Exception/TodoList/TodoListValidationError";
import taskService from "../Services/TaskService";
import { TaskBuilder } from "../Entities/Task";
import TaskValidationError from "../Exception/Task/TaskValidationError";



export default class TaskController {
    create = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { title, day } = request.body;
            const { todoListId } = request.query;
            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const todoList = await todoListService.getTodoListById(String(todoListId));
            await todoListService.isTodoListOwner(todoList, user.getId());


            const task = new TaskBuilder()
                .setTitle(title)
                .setDay(day)
                .build();

            const todoListJSON = await taskService.create(task, todoList);
            
            return response.status(201).json(todoListJSON);
        } catch (error) {
            return error instanceof TaskValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    update = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { title, day } = request.body;
            const { todoListId, taskId } = request.query;
            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const todoList = await todoListService.getTodoListById(String(todoListId));
            await todoListService.isTodoListOwner(todoList, user.getId());

            const task = await taskService.getTaskById(String(taskId));
            task.setTitle(title);
            task.setDay(day);

            const todoListJSON = await taskService.update(task);
            
            return response.status(200).json(todoListJSON);
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    check = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { finished } = request.body;
            const { todoListId, taskId } = request.query;
            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const todoList = await todoListService.getTodoListById(String(todoListId));
            await todoListService.isTodoListOwner(todoList, user.getId());

            const task = await taskService.getTaskById(String(taskId));

            const todoListJSON = await taskService.finishUnfinish(task, finished);
            
            return response.status(200).json(todoListJSON);
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    getAll = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { todoListId } = request.query;

            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const todoList = await todoListService.getTodoListById(String(todoListId));
            await todoListService.isTodoListOwner(todoList, user.getId());

            const tasks = await taskService.getTaskList(todoList.getId());


            return response.status(200).json(tasks);
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }
    
    getById = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { id } = request.params;

            const task = await taskService.getTaskById(String(id));

            return response.status(200).json(task);
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    delete = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { id } = request.params;

            await taskService.delete(String(id));
            
            return response.status(204).end();
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }
}