export default class UserValidationError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }
}