import { Injectable } from '@nestjs/common';
import { ICredentialRepository } from '../interfaces/repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Credential } from '../entities/credential.entity';
import { CreateCredentialDto } from '../dto/create-credential.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CredentialRepository implements ICredentialRepository {
    constructor(
        @InjectRepository(Credential)
        private readonly repository: MongoRepository<Credential>,
    ){}
    
    async create(data:CreateCredentialDto, id:ObjectId): Promise<Credential> {
        return this.repository.save({...data, user: new ObjectId(id) });
    }
    
    save(credential: Credential): Promise<Credential> {
        throw new Error('Method not implemented.');
    }

    async delete(id: string): Promise<void> {
        this.repository.delete(id)
    }

    async findById(id: string): Promise<Credential> {
        return this.repository.findOneBy(id);
    }

    async findAll(skip?: number, take?: number): Promise<Credential[]> {
        return this.repository.find();
    }

    async findByUser(userID:ObjectId){
        return this.repository.find({
            where:{
                user:userID
            }
        })
    }
}
