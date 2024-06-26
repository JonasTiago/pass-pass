import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/encryption/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository:UserRepository,
    private readonly bcryptService: BcryptService
  ){}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findByEmail(createUserDto.email);
    if(userExist) throw new ConflictException("Email já cadastrado!")

    const passwordHASH = this.bcryptService.hash(createUserDto.password)

    return this.userRepository.create({...createUserDto, password:passwordHASH})  
  }

  async findAll(): Promise<User[]>{
    return this.userRepository.findAll()
  }

  async findOne(id: string):Promise<User> {
    return this.userRepository.findById(id)
  }

  async remove(id: string) {
    this.userRepository.delete(id)
  }
}
