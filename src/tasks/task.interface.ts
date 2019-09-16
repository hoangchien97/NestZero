import { Task } from './task.entity';

export interface TaskData {
    id: number;
    title: string;
    description: string;
    status: string;
    userId: number;
}

export interface TasksAll {
    tasks: Task[];
    count: number;
}
