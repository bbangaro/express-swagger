import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    UsersResolver, //
    UsersService,
  ],

  // 이렇게 하면 UsersService가 UsersModule안에 담겨서 내보낼 수 있음
  exports: [UsersService],
})
export class UsersModule {}
