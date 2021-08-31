import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(['userId'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
	about: string;

    @Column()
	email: string;

    @Column()
	photoURL: string;

    @Column({default: 0})
	admin: boolean;

}