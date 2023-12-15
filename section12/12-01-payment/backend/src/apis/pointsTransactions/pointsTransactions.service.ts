import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({
    impUid,
    amount,
    user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    // 1. PointTransaction Table 거래기록 생성
    const pointTransaction = this.pointsTransactionsRepository.create({
      // DB(X) 등록을 위한 빈 객체
      impUid,
      amount,
      user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    await this.pointsTransactionsRepository.save(pointTransaction);

    // 2. 유저 돈 조회
    const userResult = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    // 3. 유저 돈 업데이트
    await this.usersRepository.update(
      { id: user.id },
      { point: userResult.point + amount },
    );

    return pointTransaction;
  }
}
