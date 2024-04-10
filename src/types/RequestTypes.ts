import { Request } from "express";

export interface OurRequest extends Request {
    email?: string;
    authenticated?: boolean;
}