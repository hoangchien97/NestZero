import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository
    ){}

    async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO);
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if(!task){
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }

    async createTask(createTaskDTO : CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    // updateTaskStatus(id: string, status: TaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    async deleteTask(id: number): Promise<DeleteResult> {
        const task = await this.taskRepository.delete(id);
        // console.log(task);
        
        if(task.affected === 0){
            throw new NotFoundException(`Task with ${id} not found`);
        }
        return task;
    }
}
