import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";

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
    viewStatus: boolean;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.lecture)
    user: User
}