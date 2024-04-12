import UserValidationError from "./UserValidationError";

export default class UserNotFoundError extends UserValidationError {
    constructor() {
        super('User does not exists.');
    }
}