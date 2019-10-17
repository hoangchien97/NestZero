import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any > {
        const username = await this.userRepository.signIn(authCredentialsDto);
        // console.log(username);
        const payload = {username};
        const accessToken = this.jwtService.sign(payload);
        return {username, accessToken};
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.signUp(authCredentialsDto);
    }
}
