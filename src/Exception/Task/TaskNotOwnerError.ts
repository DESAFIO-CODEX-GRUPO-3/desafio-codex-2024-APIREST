import TodoListValidationError from "./TaskValidationError";

export default class TaskNotOwnerError extends TodoListValidationError {
    constructor() {
        super('User doesnt own this task.');
    }
}