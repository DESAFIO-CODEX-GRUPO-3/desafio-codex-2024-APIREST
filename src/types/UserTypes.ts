import { Document } from "mongodb";

export interface UserDocument extends Document {
    fullName: string;
    gender: string;
    age: number;
    email: string;
    password: string;
  }