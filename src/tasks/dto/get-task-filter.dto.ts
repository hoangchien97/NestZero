import { TaskStatus } from "src/tasks/task.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetTaskFilterDTO{
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROCESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
