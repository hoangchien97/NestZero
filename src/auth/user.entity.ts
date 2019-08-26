import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;
}