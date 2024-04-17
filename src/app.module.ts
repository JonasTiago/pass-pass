import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mongodb',
    host: 'localhost',
    database: 'pass-pass',
    entities: [User],
    synchronize: true,
  }),
  UserModule, AuthModule, EncryptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
