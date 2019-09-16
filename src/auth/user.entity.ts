import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from './../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Task, task => task.user, { eager: true }) // task.user <=> user: User trong file task.entity
    tasks: Task[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePass(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }
}
