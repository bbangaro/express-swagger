import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export const GqlAuthGuard = (name) => {
  return class GqlAuthGuard extends AuthGuard(name) {
    /**
     * 기존 context를 gql이 사용할 수 있도록 변경해주는 로직
     * AuthGuard 내장함수에서 정해져있는 이름
     * 꼭 getRueqest로 오버라이딩 해야 함
     */
    getRequest(context: ExecutionContext) {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    }
  };
};
