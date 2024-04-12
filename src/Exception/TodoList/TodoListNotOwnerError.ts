import TodoListValidationError from "./TodoListValidationError";

export default class TodoListNotOwnerError extends TodoListValidationError {
    constructor() {
        super('User doesnt own this todolist.');
    }
}