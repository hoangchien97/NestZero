import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(
        // @Body() body
        @Body('title') title: string,
        @Body('description') description: string
    ): Task{
        // console.log(title + `&` + description);
        return this.tasksService.createTask(title,description);
    }
}
