import { IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
    @ApiModelProperty()
    @IsOptional()
    title: string;
    @ApiModelProperty()
    @IsOptional()
    description: string;
}
