import { Request, Response } from "express";
import { OurRequest } from "../types/RequestTypes";
import userService from "../Services/UserService";
import todoListService from "../Services/TodoListService";
import { TodoListBuilder } from "../Entities/TodoList";
import TodoListValidationError from "../Exception/TodoList/TodoListValidationError";



export default class TodoListController {
    create = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { title } = request.body;
            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const todoList = new TodoListBuilder()
                .setTitle(title)
                .setUserId(user.getId())
                .build();

            const todoListJSON = await todoListService.create(todoList)
            
            return response.status(201).json(todoListJSON);
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    update = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { title } = request.body;
            const { id } = request.params;
            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const todoList = await todoListService.getTodoListById(id);
            await todoListService.isTodoListOwner(todoList, user.getId());
            todoList.setTitle(title)

            const todoListJSON = await todoListService.update(todoList)
            
            return response.status(200).json(todoListJSON);
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    getAll = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const lists = await todoListService.getAllUserLists(user.getId());

            return response.status(200).json(lists);
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }
    
    getById = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { id } = request.params;
            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const list = await todoListService.getTodoListById(id);
            await todoListService.isTodoListOwner(list, user.getId());
            
            return response.status(200).json(list);
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    delete = async (request: OurRequest, response: Response): Promise<Response> => {
        try {
            const { id } = request.params;
            const email = String(request.email);

            const user = await userService.getUserByEmail(email);
            const todoList = await todoListService.getTodoListById(id);
            await todoListService.isTodoListOwner(todoList, user.getId());

            await todoListService.delete(todoList.getId());
            
            return response.status(204).end();
        } catch (error) {
            return error instanceof TodoListValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }
}