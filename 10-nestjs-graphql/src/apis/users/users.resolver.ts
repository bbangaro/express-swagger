import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('name') name: string,
    @Args('password') password: string,
    // 소수점 안들어가게 하기 위해 graphql에서 Int설정
    @Args({ name: 'age', type: () => Int }) age: number,
    @Args('email') email: string,
  ): Promise<User> {
    return this.usersService.create({ name, password, age, email });
  }
}
