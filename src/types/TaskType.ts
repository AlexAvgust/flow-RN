export type Task = {
    _id: string;
    name: string;
    taskDuration: number;
    priority: number;
    description: string;
    isRepeating: boolean;
    tags?: string[];
}