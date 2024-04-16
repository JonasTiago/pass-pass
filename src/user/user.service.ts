import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository:UserRepository,
  ){}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findByEmail(createUserDto.email);
    if(userExist) throw new ConflictException("Email já cadastrado!")

    return this.userRepository.create(createUserDto)
  }

  async findAll(): Promise<User[]>{
    return this.userRepository.findAll()
  }

  async findOne(id: string) {
    return this.userRepository.findById(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    this.userRepository.delete(id)
  }
}
