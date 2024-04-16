import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptService implements Crypt{
    hash(rawPassword: string): string {
        throw new Error('Method not implemented.');
    }
    compare(encryptedPassword: string, password: string): boolean {
        throw new Error('Method not implemented.');
    }
    
}
