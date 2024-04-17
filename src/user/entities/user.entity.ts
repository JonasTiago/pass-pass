import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Credential } from 'src/credential/entities/credential.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;
  
  @Column()
  username: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @OneToMany(() => Credential, credential => credential.user)
  credential: Credential[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}