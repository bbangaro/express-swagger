import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}), // JWT모듈을 임포트 해줘야 사용할 수 있음
    UsersModule, // entity, servic 따로 말고 한번에 부르기
  ],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
