import UserValidationError from "./UserValidationError";

export default class UserPasswordIsIncorrectError extends UserValidationError {
    constructor() {
        super('User email and password does not match.');
    }
}