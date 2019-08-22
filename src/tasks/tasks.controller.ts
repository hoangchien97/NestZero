import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './../dto/create-task.dto';
import { GetTaskFilterDTO } from './../dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDTO: GetTaskFilterDTO) {
        if(Object.keys(filterDTO).length){
            return this.tasksService.getTasksWithFilters(filterDTO);
        }else{
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string){
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task{
        // console.log(title + `&` + description);
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,@Body('status') status: TaskStatus): Task{
        return this.tasksService.updateTaskStatus(id,status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void{
        this.tasksService.deleteTask(id);
    }
}
