import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from './../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROCESS,
        TaskStatus.DONE
    ]
    transform(value: any) {
        console.log('value:',value);
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status` );
        }
        return value;
    }

    private isStatusValid(status: any){
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
    
}