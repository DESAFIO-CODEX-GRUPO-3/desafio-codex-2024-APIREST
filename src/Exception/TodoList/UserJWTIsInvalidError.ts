import TodoListValidationError from "./TodoListValidationError";

export default class TodoListNotFoundError extends TodoListValidationError {
    constructor() {
        super('TodoList doesnt exists.');
    }
}