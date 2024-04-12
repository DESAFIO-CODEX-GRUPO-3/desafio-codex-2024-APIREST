import { Document } from "mongodb";
import { Task } from "../Entities/Task";

export interface TodoListDocument extends Document {
    _id: String;
    title: String;
    tasks: Task[];
    user: String;
  }