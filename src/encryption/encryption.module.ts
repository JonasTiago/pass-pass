import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [CryptService, BcryptService],
  exports: [BcryptService]
})
export class EncryptionModule {}
