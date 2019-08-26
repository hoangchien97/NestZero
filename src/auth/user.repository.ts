import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto){
        const {username, password} = authCredentialsDto;

        let user = await this.findOne({where: {username}}); // this.UserRepository.find()
        if(user){
            throw new HttpException(`User ${username} already exists `, HttpStatus.BAD_REQUEST);
        }
        user = await this.create(authCredentialsDto);
        await this.save(user);
        return user;
    }
}
//  => sang auth.module.ts => imports: [TypeOrmModule.forFeature([UserRepository])]