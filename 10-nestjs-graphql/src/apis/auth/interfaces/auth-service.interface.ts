import { User } from 'src/apis/users/entities/user.entity';
import { IContext } from 'src/common/interfaces/context';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessTokenLogin {
  user: User;
}
