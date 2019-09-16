import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private readonly mailerService: MailerService,
    ) {}

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string} > {
        const username = await this.userRepository.signIn(authCredentialsDto);

        const payload = {username};
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        this
        .mailerService
        .sendMail({
            to: 'demo.nestjs97@gmail.com', // sender address
            from: 'hoangducchien97@gmail.com', // list of receivers
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
        })
        // tslint:disable-next-line:no-empty
        .then(() => {})
        .catch((error) => {
            // tslint:disable-next-line:no-console
            console.log('err', error);
        });
        return this.userRepository.signUp(authCredentialsDto);
    }
}
