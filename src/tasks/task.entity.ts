import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BeforeUpdate,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from './../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        // tslint:disable-next-line:new-parens
        this.updatedAt = new Date;
    }

    // userId
    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User;

    @Column()
    userId: number;
}
