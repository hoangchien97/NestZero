import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from 'src/dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    GetTaskById(@Param('id') id:string){
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task{
        // console.log(title + `&` + description);
        return this.tasksService.createTask(createTaskDTO);
    }
}
