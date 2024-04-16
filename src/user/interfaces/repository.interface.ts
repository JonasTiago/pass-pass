import { User } from "../entities/user.entity";

export interface IUserRepository {
    create(data): Promise<User>;
    save(user: User): Promise<User>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<User>;
    findAll(skip: number, take: number): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
}