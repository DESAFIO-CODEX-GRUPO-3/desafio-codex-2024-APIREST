

class Task {
    private id: String;
    private title: String;
    private day: Date;
    private finished: boolean;

    constructor(builder: TaskBuilder) {
        this.id = builder.id;
        this.title = builder.title;
        this.day = builder.day;
        this.finished = builder.finished;
    }

    public getId(): String { return this.id; }
    public getTitle(): String { return this.title; }
    public getDay(): Date { return this.day; }
    public isFinished(): boolean { return this.finished; }

    public setTitle(title: String) {
        this.title = title;
    }

    public setDay(day: Date) {
        this.day = day;
    }

    public setFinished(finished: boolean) {
        this.finished = finished;
    }
}

class TaskBuilder {
    id: String;
    title: String;
    day: Date;
    finished: boolean;

    constructor() {
        this.id = "";
        this.title = "";
        this.day = new Date();
        this.finished = false;
    }

    public setId(id: String): TaskBuilder {
        this.id = id;
        return this;
    }

    public setTitle(title: String): TaskBuilder {
        this.title = title;
        return this;
    }

    public setDay(day: Date): TaskBuilder {
        this.day = day;
        return this;
    }

    public setFinished(finished: boolean): TaskBuilder {
        this.finished = finished;
        return this;
    }

    public build(): Task { return new Task(this); }
}

export { TaskBuilder, Task };