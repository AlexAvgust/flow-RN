import { Task } from "./TaskType";
import { User } from "./userType";

export type Schedule = {
    _id: string;
    date: string;
    user: User;
    tasks: Task[];
}