import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Lecture } from "src/lecture/lecture.entity";

@Entity()
@Unique(['userId'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column({ select: false })
    password: string;

    @Column()
	about: string;

    @Column()
	email: string;

    @Column({default: 'https://baeum.s3.ap-northeast-2.amazonaws.com/baeumFiles/profile/PngItem_1468479.png'})
	profileImageURL: string;

    @Column({default: 0})
	admin: boolean;

    @OneToMany(type => Lecture, lecture => lecture.user)
    lecture: Lecture[]

}