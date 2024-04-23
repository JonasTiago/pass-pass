import { ConflictException, NotFoundException, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialRepository } from './repositories/credential.repository';
import { Credential } from './entities/credential.entity';
import { ObjectId } from 'typeorm';
import Cryptr from 'cryptr';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CredentialService {
  private cryptr:Cryptr;

  constructor(
    private readonly repository: CredentialRepository,
    ){
      this.cryptr = new Cryptr('chave-secreta-aqui')
  }

  async create(createCredentialDto:CreateCredentialDto, id:ObjectId) {
    const titleUsed = await this.repository.findByUser(id, createCredentialDto.title)
    if(titleUsed.length) throw new ConflictException("Titulo já cadastrado.")

    const passwordHASH = this.cryptr.encrypt(createCredentialDto.password)

    return this.repository.create({...createCredentialDto, password:passwordHASH}, id)
  }

  async findAll(id:ObjectId): Promise<Credential[]> {
    const credentials = await this.repository.findAll(id)

    const allCredential = credentials.map(credential => ({
      ...credential,
      password: this.cryptr.decrypt(credential.password),
    }))

    return allCredential;
  }

  async findOne(id: string, userId:ObjectId):Promise<Credential> {
    return this.repository.findById(id, userId);
  }

  async remove(id: string, userId:ObjectId) {
    const credentialVerify = await this.repository.findById(id, userId);
    if(!credentialVerify) throw new NotFoundException();

    return this.repository.delete(credentialVerify.id)
  }
}
