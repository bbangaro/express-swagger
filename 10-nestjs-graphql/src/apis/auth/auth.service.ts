import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceGetAccessTokenLogin,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
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

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일 확인
    const user = await this.usersService.findOneByEmail({ email });
    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    // 2. 비밀번호 인증인증
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('암호가 일치하지 않습니다.');

    // 3. refreshToken(=JWT) 만들어서 브라우저 쿠키에 전달
    this.setRefreshToken({ context, user });

    // 4. accessToken(=JWT) 만들어서 브라우저에 전달
    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ context, user }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );

    // ! (개발환경) 백앤드에서 브라우저에 쿠키 저장
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // ! (배포환경) 백앤드에서 브라우저에 쿠키 저장
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`,
    // );
    // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
  }

  getAccessToken({ user }: IAuthServiceGetAccessTokenLogin): string {
    return this.jwtService.sign(
      { sub: user.id }, // 내가 넣고싶은 데이터
      { secret: '나의비밀번호', expiresIn: '1h' },
      // { secret: '나의비밀번호', expiresIn: '10s' },
    );
  }
}
