import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, Put, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service'; 
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from './../auth/user.entity';
import { GetUser } from './../auth/get-user.decorator';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');

    constructor(private tasksService: TasksService){}
    @Get()
    getTasks(
        @Query(ValidationPipe) filterDTO: GetTaskFilterDTO,
        @GetUser() user: User
    ): Promise<Task[]> {
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters : ${JSON.stringify(filterDTO)}`);
        return this.tasksService.getTasks(filterDTO, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    // @ApiCreatedResponse({ description: 'The record has been successfully created.', type: Task })

    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO, user);
    }

    @Put('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task>{
        return this.tasksService.updateTaskStatus( id, status, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<DeleteResult> {
        return this.tasksService.deleteTask(id, user);
    }
}
