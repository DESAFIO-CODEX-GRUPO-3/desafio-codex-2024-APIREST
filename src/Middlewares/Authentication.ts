import { NextFunction, Request, Response } from "express";
import userService from "../Services/UserService";
import { User } from "../Entities/User";
import UserValidationError from "../Exception/User/UserValidationError";
import UserPasswordIsIncorrectError from "../Exception/User/UserPasswordIsIncorrectError";
import jwt from "jsonwebtoken";
import { JWTSECRET } from "../constants/tokenSecret";
import UserJWTIsInvalidError from "../Exception/User/UserJWTIsInvalidError";
import { OurRequest } from "../types/RequestTypes";
import tokenBlackListService from "../Services/TokenBlackListService";


export async function validateUser(request: Request, response: Response, next: NextFunction) {
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

export async function validateJWT(request: OurRequest, response: Response, next: NextFunction) {
    try {
        const token = String(request.headers['x-access-token']);
        const tokenFromBlackList = await tokenBlackListService
        .findTokenInBlackList(token);

        if (tokenFromBlackList) {
            throw new UserJWTIsInvalidError();
        }
        
        jwt.verify(token, JWTSECRET, (error, decoded: any) => {
            if (error) throw new UserJWTIsInvalidError();

            if (decoded && decoded.email) {
                request.email = decoded.email;
            }
            
            request.authenticated = true;
            next();
        });
    } catch (error) {
        return error instanceof UserValidationError ?
            response.status(400).json({ error: error.message }) :
            response.status(500).json({ error });
    }
}