import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthLoginDto } from './dtos/auth.login.dto';
import { UserModule } from 'src/user/user.module';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports:[JwtModule.register({
    secret:"tokenHash"
  }), UserModule, EncryptionModule],
  providers: [AuthService, AuthLoginDto],
  controllers: [AuthController]
})
export class AuthModule {}
