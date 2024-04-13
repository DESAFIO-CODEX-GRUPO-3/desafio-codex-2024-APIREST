import TodoListValidationError from "./TaskValidationError";

export default class TaskNotFoundError extends TodoListValidationError {
    constructor() {
        super('Task doesnt exists.');
    }
}