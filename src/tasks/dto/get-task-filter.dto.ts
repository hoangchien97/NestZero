import { TaskStatus } from "src/tasks/task.model";

export class GetTaskFilterDTO{
    status: TaskStatus;
    search: string;
}
