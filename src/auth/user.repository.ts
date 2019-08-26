import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    // login
    async signIn(authCredentialsDto: AuthCredentialsDto){
        const {username, password} = authCredentialsDto;

        let user = await this.findOne({where: {username}});
        // console.log(user);
        if(!user || !(await user.comparePass(password))){
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user;
    }
    // register
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        const {username, password} = authCredentialsDto;

        let user = await this.findOne({where: {username}}); // this.UserRepository.find()
        if(user){
            throw new HttpException(`User ${username} already exists `, HttpStatus.BAD_REQUEST);
        }
        user = await this.create(authCredentialsDto);
        // console.log(user);
        
        await this.save(user);
        return user;
    }
}
//  => sang auth.module.ts => imports: [TypeOrmModule.forFeature([UserRepository])]