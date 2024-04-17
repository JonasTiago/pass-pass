import { Exclude } from "class-transformer";
import { User } from "src/user/entities/user.entity";
import { ObjectId, Column, CreateDateColumn, ObjectIdColumn, UpdateDateColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class Credential {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    title: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => User, (user) => user.credential)
    user: User

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
}
