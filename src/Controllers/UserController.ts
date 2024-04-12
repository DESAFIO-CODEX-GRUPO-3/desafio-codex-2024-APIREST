import { Request, Response } from "express";
import { User, UserBuilder } from "../Entities/User";
import UserValidationError from "../Exception/User/UserValidationError";
import userService from "../Services/UserService";
import jwt from "jsonwebtoken";
import { JWTSECRET, minutes } from "../constants/tokenSecret";
import tokenBlackListService from "../Services/TokenBlackListService";
import UserPasswordIsIncorrectError from "../Exception/User/UserPasswordIsIncorrectError";


/** A controller for users
 * Responsible for intermediate the visualization and model layers.
 * 
 * @author dhouglasbn
 */
export default class UserController {
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
            
            const userJSON = await userService.createUser(user);
            
            return response.status(201).json(userJSON);
        } catch (error) {
            return error instanceof UserValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    login = async (request: Request, response: Response): Promise<Response> => {
        try {
            const { email, password } = request.body;
            const user: User = await userService.getUserByEmail(email);

            if (password !== user.getPassword()) throw new UserPasswordIsIncorrectError();

            const token = jwt.sign({
                fullName: user.getFullName(),
                gender: user.getGender(),
                age: user.getAge(),
                email: user.getEmail(),
                password: user.getPassword()
            }, JWTSECRET, { expiresIn: 20 * minutes });

            return response.status(200).json({auth: true, token});
        } catch (error) {
            return error instanceof UserValidationError ?
                response.status(400).json({ error: error.message }) :
                response.status(500).json({ error });
        }
    }

    logout = async (request: Request, response: Response): Promise<Response> => {
        const token = String(request.headers['x-access-token']);
        tokenBlackListService.saveTokenInBlackList(token);
        return response.status(200).end();
    }
}