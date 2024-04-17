import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
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
            const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);
            const user = await this.userRepository.findByEmail(data.email);
            request.user = user;
        }catch(err){
            console.log(err);
            return false
        }

        return true
     }
}