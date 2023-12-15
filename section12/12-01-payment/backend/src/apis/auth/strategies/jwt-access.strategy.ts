import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { kakaoStrategy } from 'passport-kakao'
// import { naverStrategy } from 'passport-naver'

/**
 * 부모 PassportStrategy로 넘어가서 검증로직 탐
 * 비밀번호 검증
 * 만료시간 검증
 */
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // 직접 입력
      //   jwtFromRequest: (req) => {
      //     const token = req.headers.Authorization; // Bearer dddfdfdf
      //     const accessToken = token.toLowerCase().replace('bearer', '').replace(' ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
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

    // payload: 토큰에 넣어뒀던 데이터
    // key값은 상관없음
    return {
      id: payload.sub,
    };
  }
}
