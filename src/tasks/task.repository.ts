import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";
import { User } from "./../auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
    async getTasks(
        filterDTO: GetTaskFilterDTO,
        user: User
    ): Promise<Task[]> {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if(status){
            query.andWhere('task.status = :status', { status });
        }
        if(search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }
        const tasks = await query.skip(5).take(10).getMany(); // skip : take <=> limit : offset
        return tasks;
    } 

    async createTask(createTaskDTO : CreateTaskDTO, user: User): Promise<Task> {
        const {title, description} = createTaskDTO;
        
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        // add user
        task.user = user;
        await task.save();

        delete task.user;

        return task;
    }
}