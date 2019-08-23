import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDTO: GetTaskFilterDTO): Task[] {
        const {status, search} = filterDTO;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search)
            )
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const task =  this.tasks.find(task => task.id === id);
        if(!task){
            throw new NotFoundException(`Task with ID  ${id} not found`);
        }
        return task;
    }

    createTask(createTaskDTO : CreateTaskDTO): Task {
        const {title, description} = createTaskDTO;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id: string): void{
        const foundTask = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== foundTask.id);
    }
}
