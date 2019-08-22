import { Controller, Get, Post, Body } from '@nestjs/common';
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

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task{
        // console.log(title + `&` + description);
        return this.tasksService.createTask(createTaskDTO);
    }
}
