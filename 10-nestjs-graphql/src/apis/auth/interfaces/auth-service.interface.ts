import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/common/interfaces/context';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessTokenLogin {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  context: IContext;
  user: User;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}
