import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service'; 
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO) {
    //     if(Object.keys(filterDTO).length){
    //         return this.tasksService.getTasksWithFilters(filterDTO);
    //     }else{
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: string): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDTO: CreateTaskDTO): Task{
    //     // console.log(title + `&` + description);
    //     return this.tasksService.createTask(createTaskDTO);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ): Task{
    //     return this.tasksService.updateTaskStatus(id,status);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void{
    //     this.tasksService.deleteTask(id);
    // }
}
