import { Request } from "express";
import jwt from "jsonwebtoken";

export interface OurRequest extends Request {
    email?: string;
    authenticated?: boolean;
}

export interface OurJWTPayload extends jwt.JwtPayload {
    exp: number;
}