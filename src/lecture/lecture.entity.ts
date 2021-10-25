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
    thumbnail: string;

    @Column()
    author: string;

    @Column()
    price: number;

    @Column({ default: true })
    viewStatus: boolean;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.lecture)
    user: User

    static createOne(title:string, user: User) {
        const lecture = new Lecture();
        lecture.title = title;
        lecture.description = '테스트 객체';
        lecture.thumbnail = 'https://nextstep-storage.s3.ap-northeast-2.amazonaws.com/af98e7e689b8411cb51aef899b8be1a2';
        lecture.author = '테스트';
        lecture.price = 100;
        lecture.viewStatus = true;
        lecture.userId = user.id;
        lecture.user = user;

        return lecture;
    }

    /**
     * 객체마다 자신이 가진 옵션이 다르다.
     * 지금 이 객체는 viewState라는 옵션 하나만 가지고 있지만
     * 나중에 다른 객체는 '공개'를 하기 위해 설정을 바꿀 부분이 많을 수도 있다.
     * 혹은 설정이 하나더라도 옵션 이름이 다를 수도 있다.
     * 하지만 결국 원하는 것은 '공개하기'이니까, Service는 그저 '공개 해주셈' 하면 된다.
     * => service에서 주입받는 entity는 공통적으로 publish라는 함수를 구현해야함.
     */
    publish() {
        this.viewStatus = true;
    }
}