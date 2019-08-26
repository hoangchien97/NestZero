import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

}
//  => sang auth.module.ts => imports: [TypeOrmModule.forFeature([UserRepository])]