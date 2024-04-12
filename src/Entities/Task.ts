

class Task {
    private title: String;
    private day: Date;
    private finished: boolean;

    constructor(builder: TaskBuilder) {
        this.title = builder.title;
        this.day = builder.day;
        this.finished = builder.finished;
    }

    public getTitle(): String { return this.title; }
    public getDay(): Date { return this.day; }
    public isFinished(): boolean { return this.finished; }
}

class TaskBuilder {
    title: String;
    day: Date;
    finished: boolean;

    constructor() {
        this.title = "";
        this.day = new Date();
        this.finished = false;
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