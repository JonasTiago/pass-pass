import { ObjectId } from "typeorm";
import { CreateCredentialDto } from "../dto/create-credential.dto";
import { Credential } from "../entities/credential.entity";

export interface ICredentialRepository {
    create(data: CreateCredentialDto, id:ObjectId): Promise<Credential>;
    save(data: Credential): Promise<Credential>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Credential>;
    findAll(userID:ObjectId): Promise<Credential[]>;
}