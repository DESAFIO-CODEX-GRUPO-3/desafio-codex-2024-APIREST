import { Task, TaskBuilder } from "../Entities/Task";
import { TodoList, TodoListBuilder } from "../Entities/TodoList";
import TodoListNotOwnerError from "../Exception/TodoList/TodoListNotOwnerError";
import TodoListValidationError from "../Exception/TodoList/TodoListValidationError";
import TodoListNotFoundError from "../Exception/TodoList/TodoListNotFoundError";
import { TaskModel } from "../Models/TaskModel";
import { TodoListModel } from "../Models/TodoListModel";
import { TodoListDocument, TodoListObject } from "../types/TodoListTypes";
import TaskNotFoundError from "../Exception/Task/TaskNotFoundError";
import { TaskDocument } from "../types/TaskTypes";


class TaskService {
    create = async (task: Task, todoList: TodoList) => {
        const taskModel = new TaskModel({
            title: task.getTitle(),
            day: task.getDay(),
            finished: task.isFinished(),
            todoList: todoList.getId().valueOf()
        });

        const error = taskModel.validateSync();

        if (error) throw new TodoListValidationError(error.message);

        const taskJSON = (await taskModel.save()).toJSON();
        
        await TodoListModel.findByIdAndUpdate(
            todoList.getId().valueOf(),
            { $push: { tasks: taskJSON._id } },
            { new: true }
        );
        return taskJSON;
    }

    update = async (newTask: Task) => {
        const taskData = {
            title: newTask.getTitle(),
            day: newTask.getDay(),
            finished: newTask.isFinished()
        };

        const updatedTask = await TaskModel.updateOne(
            { _id: newTask.getId() },
            taskData,
            { new: true }
        );

        if (!updatedTask) throw new TaskNotFoundError();

        return updatedTask;
    }

    finishUnfinish = async (newTask: Task, finishValue: boolean) => {
        const updatedTask = await TaskModel.updateOne(
            { _id: newTask.getId() },
            { finished: finishValue },
            { new: true }
        );

        if (!updatedTask) throw new TaskNotFoundError();

        return updatedTask;
    }

    delete = async (id: String) => {
        const deleted = await TaskModel.findByIdAndDelete(id);

        if (!deleted) throw new TaskNotFoundError();

        await TodoListModel.findOneAndUpdate(
            { tasks: id }, 
            { $pull: { tasks: id } },
            { new: true }
        );
    }

    async getTaskList(todoListId: String): Promise<TaskDocument[] | null> {
        
        const todoList: TodoListDocument[] | null = await TodoListModel.findOne(todoListId);
        
        if (!todoList) throw new TodoListNotFoundError();

        const tasks: TaskDocument[] | null = await TaskModel.find({todoList: todoListId})
        
        return tasks;
    }

    async getTaskById(id: String): Promise<Task> {
        const taskFromDB: TaskDocument | null = await TaskModel.findById(id.valueOf());
        
        if (!taskFromDB) throw new TaskNotFoundError();
        
        return new TaskBuilder()
        .setId(taskFromDB._id)
        .setTitle(taskFromDB.title)
        .setDay(taskFromDB.day)
        .setFinished(taskFromDB.finished)
        .build();
    }
}

const taskService = new TaskService();

export default taskService;