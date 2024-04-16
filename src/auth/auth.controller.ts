import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateDto } from './dtos/auth.create.dto';
import { AuthLoginDto } from './dtos/auth.login.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from 'src/decorators/users.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService ){}
    
    @Post("login")
    async login(@Body() body: AuthLoginDto){
        return this.authService.login(body)
    }

    @Post("register")
    async register(@Body() body: AuthCreateDto){
        this.authService.register(body) 
    }

    @UseGuards(AuthGuard)
    @Get("me")
    async me(@User() user){
        return {
            "me": user
        }
    }
}
