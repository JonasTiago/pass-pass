import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/repository.interface';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: MongoRepository<User>,
    ){}
    
    async create(data: any): Promise<User> {
        return this.repository.save(data);
    }
    
    save(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    async delete(id: string): Promise<void> {
        this.repository.delete(id)
    }

    async findById(id: string): Promise<User> {
        return this.repository.findOneBy(id);
    }

    async findAll(skip?: number, take?: number): Promise<User[]> {
        return this.repository.find();
    }

    async findByEmail(email: string): Promise<User> {
        return this.repository.findOneBy({email})
    }
}
