import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceGetAccessTokenLogin,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, //
  ) {}

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });

    // 이메일 확인
    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    // 인증
    const isAuth = await bcrypt.compare(password, user.password);

    // 비밀번호 확인
    if (!isAuth)
      throw new UnprocessableEntityException('암호가 일치하지 않습니다.');

    // 로그인 성공 (JWT 생성)
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessTokenLogin): string {
    return this.jwtService.sign(
      { sub: user.id }, // 내가 넣고싶은 데이터
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }
}
