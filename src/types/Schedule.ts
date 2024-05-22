import { Task } from "./TaskType";

export type Schedule = {
    _id: string;
    date: string;
    user: string;
    tasks: Task[];
}