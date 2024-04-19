import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialRepository } from './repositories/credential.repository';
import { Credential } from './entities/credential.entity';
import { ObjectId } from 'typeorm';
import Cryptr from 'cryptr';

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
    console.log(titleUsed)

    //const titleUsed = userCredentials.filter(credential => createCredentialDto.title === credential.title).length
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

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
