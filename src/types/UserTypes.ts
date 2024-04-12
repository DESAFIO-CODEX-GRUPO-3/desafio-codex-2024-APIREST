import { Document } from "mongodb";

export interface UserDocument extends Document {
    _id: string;
    fullName: string;
    gender: string;
    age: number;
    email: string;
    password: string;
  }