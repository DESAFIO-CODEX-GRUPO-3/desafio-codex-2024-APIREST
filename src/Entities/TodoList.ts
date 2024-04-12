import { Task } from "./Task";


class TodoList {
    private id: String;
    private title: String;
    private tasks: Task[];
    private userId: String;

    constructor(builder: TodoListBuilder) {
        this.id = builder.id;
        this.title = builder.title;
        this.tasks = builder.tasks;
        this.userId = builder.userId;
    }

    public getId(): String { return this.id; }
    public getTitle(): String { return this.title; }
    public getTasks(): Task[] { return this.tasks; }
    public getUserId(): String { return this.userId; }

    public setTitle(title: String): void { this.title = title; }
}

class TodoListBuilder {
    id: String;
    title: String;
    tasks: Task[];
    userId: String;

    constructor() {
        this.id = "";
        this.title = "";
        this.tasks = [];
        this.userId = "";
    }

    public setId(id: String): TodoListBuilder {
        this.id = id;
        return this;
    }

    public setTitle(title: String): TodoListBuilder {
        this.title = title;
        return this;
    }

    public setTasks(tasks: Task[]): TodoListBuilder {
        this.tasks = tasks;
        return this;
    }

    public setUserId(userId: String): TodoListBuilder {
        this.userId = userId;
        return this;
    }

    public build(): TodoList { return new TodoList(this); }
}

export { TodoListBuilder, TodoList };