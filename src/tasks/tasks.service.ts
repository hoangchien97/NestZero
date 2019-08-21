import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = [{name: "Chien"}];

    getAllTasks(){
        return this.tasks;
    }
}
