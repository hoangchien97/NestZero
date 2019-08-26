import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,10);
    }

    async comparePass(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }
}