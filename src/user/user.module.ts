import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptionModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
