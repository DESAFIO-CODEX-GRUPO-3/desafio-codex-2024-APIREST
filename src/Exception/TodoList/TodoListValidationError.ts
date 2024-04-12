export default class TodoListValidationError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }
}