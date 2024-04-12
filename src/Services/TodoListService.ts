import { TodoList, TodoListBuilder } from "../Entities/TodoList";
import TodoListNotOwnerError from "../Exception/TodoList/TodoListNotOwnerError";
import TodoListValidationError from "../Exception/TodoList/TodoListValidationError";
import TodoListNotFoundError from "../Exception/TodoList/UserJWTIsInvalidError";
import { TodoListModel } from "../Models/TodoListModel";
import { TodoListDocument } from "../types/TodoListTypes";


class TodoListService {
    create = async (todoList: TodoList) => {
        const todoListModel = new TodoListModel({
            title: todoList.getTitle(),
            tasks: todoList.getTasks(),
            user: todoList.getUserId()
        });

        const error = todoListModel.validateSync();

        if (error) throw new TodoListValidationError(error.message);

        return (await todoListModel.save()).toJSON();
    }

    update = async (newTodoList: TodoList) => {
        const todoListData = {
            title: newTodoList.getTitle(),
            tasks: newTodoList.getTasks(),
            user: newTodoList.getUserId()
        };

        await TodoListModel.updateOne(
            { _id: newTodoList.getId() },
            todoListData
        );

        return { _id: newTodoList.getId(), ...todoListData };
    }

    delete = async (id: String) => {
        await TodoListModel.deleteOne(
            { _id: id }
        );
    }

    async getTodoListById(id: String): Promise<TodoList> {
        
        const todolistFromDB: TodoListDocument | null = await TodoListModel.findById(id);
        
        if (!todolistFromDB) throw new TodoListNotFoundError();
        
        return new TodoListBuilder()
        .setId(todolistFromDB._id)
        .setTitle(todolistFromDB.title)
        .setTasks(todolistFromDB.tasks)
        .setUserId(todolistFromDB.user)
        .build();
    }

    async isTodoListOwner(todoList: TodoList, userId: String): Promise<boolean> {
        if (todoList.getUserId().valueOf() !== userId.valueOf()) throw new TodoListNotOwnerError();
        return true;
    }
}

const todoListService = new TodoListService();

export default todoListService;