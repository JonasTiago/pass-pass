import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from './entities/credential.entity';
import { CredentialRepository } from './repositories/credential.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Credential]), AuthModule, UserModule],
  controllers: [CredentialController],
  providers: [CredentialService,CredentialRepository],
})
export class CredentialModule {}
