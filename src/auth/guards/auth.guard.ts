import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor( 
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository
    ){}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        try{
            const token:string = (authorization ?? "").split(" ")[1]
            if(!token?.length) throw new UnauthorizedException("User unauthorized!")

            const data = this.authService.checkToken(token);

            const user = await this.userRepository.findByEmail(data.email);
            request.user = user;
        }catch(err){
            throw new UnauthorizedException("User unauthorized.");
        }

        return true
     }
}