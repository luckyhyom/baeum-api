import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./lecture-status";

@Entity()
export class Lecture extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    videoURL: string;

    @Column()
    author: string;

    @Column()
    price: number;

    @Column()
    status: Status;
}