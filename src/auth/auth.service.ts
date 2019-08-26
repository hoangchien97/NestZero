import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ){}

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.signIn(authCredentialsDto);
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        return this.userRepository.signUp(authCredentialsDto);
    }
}
