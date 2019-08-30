
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "./../task-status.enum";
import { ApiModelProperty } from "@nestjs/swagger";

export class GetTaskFilterDTO{
    @ApiModelProperty({
        enum: [
            'OPEN',
            'IN_PROCESS',
            'DONE'
        ]
    })
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROCESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
