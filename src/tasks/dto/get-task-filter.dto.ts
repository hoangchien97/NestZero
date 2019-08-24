
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "./../task-status.enum";

export class GetTaskFilterDTO{
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROCESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
