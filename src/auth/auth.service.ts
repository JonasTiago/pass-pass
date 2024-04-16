import { ConflictException, Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthCreateDto } from './dtos/auth.create.dto';
import { AuthLoginDto } from './dtos/auth.login.dto';
import { BcryptService } from 'src/encryption/bcrypt.service';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class AuthService {

    private EXPIRATION = "7 days"
    private ISSUER = "Driven"
    private AUDIENCE = "users"

    constructor(
            private readonly userRepository: UserRepository,
            private readonly bcryptService: BcryptService,
            private readonly jwtService: JwtService
    ){}

    async login(user: AuthLoginDto){
        const userExist = await this.userRepository.findByEmail(user.email);
       
        if(!userExist){
            throw new NotFoundException("");
        }

        const valid = this.bcryptService.compare( userExist.password, user.password)
        if(!valid) throw new UnauthorizedException("Email or password incorrect!")

        const token = this.createToken(userExist)

        return {
            token
        }

    }

    private createToken(user: User){
        return  this.jwtService.sign({
            name:user.username,
            email: user.email,
        }, {
            expiresIn: this.EXPIRATION,
            audience: this.AUDIENCE,
            issuer: this.ISSUER
        })
    }

    checkToken(token: string){
        try{
            const data = this.jwtService.verify(token, {
                audience: this.AUDIENCE,
                issuer: this.ISSUER
            })
            return data;
        }catch(err){
            console.log(err);
            throw new BadRequestException(err)
        }
    }

    async register(user:AuthCreateDto){
        const userExist = await this.userRepository.findByEmail(user.email)
        if(userExist) throw new ConflictException("Email já cadastrado!")

        return this.userRepository.create(user);
    }
}
