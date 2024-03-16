import UserValidationError from "./UserValidationError";

export default class UserAlreadyExistsError extends UserValidationError {
    constructor() {
        super('There is already an user registered with this email!.');
    }
}