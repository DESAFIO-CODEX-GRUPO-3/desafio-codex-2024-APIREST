import { Request, Response } from "express";
import { UserBuilder } from "../Entities/User";
import UserService from "../Services/UserService";
import UserValidationError from "../Exception/UserValidationError";
import UserAlreadyExistsError from "../Exception/UserAlreadyExistsError";


/** A controller responsible for all user business rules
 * 
 * @author dhouglasbn
 */
export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    createUser = async (request: Request, response: Response): Promise<Response> => {
        try {
            const { fullName, gender, age, email, password } = request.body;

            const user = new UserBuilder()
                .setFullName(fullName)
                .setGender(gender)
                .setAge(age)
                .setEmail(email)
                .setPassword(password)
                .build();

            if (
                await this.userService.userAlreadyExists(user.getEmail())
                ) throw new UserAlreadyExistsError();
            
            const userJSON = await this.userService.createUser(user);
            
            return response.status(201).json(userJSON);
        } catch (error) {
            return error instanceof UserValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }
}