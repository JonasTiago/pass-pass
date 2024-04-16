import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements Crypt{

    private SALT = 10;

    hash(rawPassword: string){
        return bcrypt.hashSync(rawPassword, this.SALT)
    }

    compare(encryptedPassword: string, password: string){
        return  bcrypt.compareSync(password, encryptedPassword)
    }
}
