import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialRepository } from './repositories/credential.repository';
import { Credential } from './entities/credential.entity';
import { ObjectId } from 'typeorm';

@Injectable()
export class CredentialService {

  constructor(
    private readonly repository: CredentialRepository
  ){}

  async create(createCredentialDto:CreateCredentialDto, id:ObjectId) {
    
    const userCredentials = await this.repository.findByUser(id)
    if(userCredentials.filter(credential => createCredentialDto.title === credential.title).length)
      throw new ConflictException("Title exist!")

    return this.repository.create(createCredentialDto, id)
  }

  async findAll(): Promise<Credential[]> {
    return this.repository.findAll();
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
