import { Controller, Body, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        // console.log(authCredentialsDto); // { username: 'admin', password: '123456' }
        return this.authService.signUp(authCredentialsDto);
    }
}
