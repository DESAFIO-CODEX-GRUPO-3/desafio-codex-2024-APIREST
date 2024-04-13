import { Document } from "mongodb";
import { Task } from "../Entities/Task";

export interface TaskDocument extends Document {
    _id: String;
    title: String;
    day: Date;
    finished: boolean;
  }