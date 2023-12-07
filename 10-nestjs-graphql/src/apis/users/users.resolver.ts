import { Args, Int, Query, Mutation, Resolver, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  /**
   *
   * PassportStrategy에서 설정한 name과 일치하면 해당 검증을 탄 후
   * 아래 conteext에서 받아올 수 있음
   */
  // @UseGuards(AuthGuard('access')) // rest-api 인가방법
  @UseGuards(GqlAuthAccessGuard) // graphql 인가방법
  @Query(() => String)
  fetchUser(@Context() context: IContext): string {
    console.log('fetchUser', context.req.user);
    return '인가 성공';
  }

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
