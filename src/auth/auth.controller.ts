import { Controller, Body, Post, ValidationPipe, UsePipes, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/signin')
    @UsePipes(new ValidationPipe())
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}>{
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        // console.log(authCredentialsDto); // { username: 'admin', password: '123456' }
        return this.authService.signUp(authCredentialsDto);
    }
}
