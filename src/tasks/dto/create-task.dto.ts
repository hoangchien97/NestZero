import {IsNotEmpty} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTaskDTO{
    @ApiModelProperty()
    @IsNotEmpty()
    title: string;
    @ApiModelProperty()
    @IsNotEmpty()
    description: string;
}