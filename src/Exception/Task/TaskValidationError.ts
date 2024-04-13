export default class TaskValidationError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }
}