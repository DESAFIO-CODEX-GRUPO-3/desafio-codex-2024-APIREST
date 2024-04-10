import { NextFunction, Request, Response } from "express";
import userService from "../Services/UserService";
import { User } from "../Entities/User";
import UserValidationError from "../Exception/UserValidationError";
import UserPasswordIsIncorrectError from "../Exception/UserPasswordIsIncorrect";


export default async function validateUser(request: Request, response: Response, next: NextFunction) {
    try {
        const { email, password } = request.body;

        const user: User = await userService.getUserByEmail(email);

        if (!user || user.getPassword() !== password) {
            throw new UserPasswordIsIncorrectError();
        }
        next();
    } catch (error) {
        return error instanceof UserValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
    }
}