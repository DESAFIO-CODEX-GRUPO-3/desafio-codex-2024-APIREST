import UserValidationError from "./UserValidationError";

export default class UserJWTIsInvalidError extends UserValidationError {
    constructor() {
        super('User token is invalid.');
    }
}