import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';
@Entity()
export class Youtube extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    thumb: string;

    @Column()
    viewCount: number;
}
