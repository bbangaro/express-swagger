import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { kakaoStrategy } from 'passport-kakao'
// import { naverStrategy } from 'passport-naver'

/**
 * 부모 PassportStrategy로 넘어가서 검증로직 탐
 * 비밀번호 검증
 * 만료시간 검증
 */
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      // 직접 입력
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; // refreshToken=djfhlkadsfh
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: '나의리프레시비밀번호',
    });
  }

  /**
   * 내장 함수라 이름변경 X
   * PassportStrategy 라이브러리 자체 내장
   * return req.user에 담아져서 옴
   * @param payload
   * @return req.user = {}
   */
  validate(payload) {
    console.log(payload);

    return {
      id: payload.sub,
    };
  }
}
