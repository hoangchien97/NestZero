import { Controller, Body, Post, ValidationPipe, UsePipes, Header } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/signin')
    @Header('content-type', 'application/json')
    @UsePipes(new ValidationPipe())
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/signup')
    @Header('content-type', 'application/json')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        // console.log(authCredentialsDto); // { username: 'admin', password: '123456' }
        return this.authService.signUp(authCredentialsDto);
    }
}
