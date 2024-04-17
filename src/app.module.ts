import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EncryptionModule } from './encryption/encryption.module';
import { CredentialModule } from './credential/credential.module';

import { User } from './user/entities/user.entity';
import { Credential } from './credential/entities/credential.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mongodb',
    host: 'localhost',
    database: 'pass-pass',
    entities: [User, Credential],
    synchronize: true,
  }),
  UserModule, AuthModule, EncryptionModule, CredentialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
