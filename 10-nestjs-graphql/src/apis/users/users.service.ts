import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import {
  IUsersServiceCreate,
  IUsersServiceFindIneByEmail,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  async findOneByEmail({ email }: IUsersServiceFindIneByEmail): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create({
    name,
    password,
    age,
    email,
  }: IUsersServiceCreate): Promise<User> {
    // 이메일 중복체크
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    // ! hashService를 만들어서 사용하는게 좋음
    const hashedPassword = await bcrypt.hash(password, 10); // (비밀번호, 반복횟수)

    const result = await this.userRepository.save({
      name,
      password: hashedPassword,
      age,
      email,
    });
    return result;
  }
}
