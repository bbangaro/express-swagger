import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user,
  }: // }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
  IPointsTransactionsServiceCreate) {
    // 트랜잭션
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. PointTransaction Table 거래기록 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        // DB(X) 등록을 위한 빈 객체
        impUid,
        amount,
        user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      // await this.pointsTransactionsRepository.save(pointTransaction);
      // 위에서 pointTransactionRepository빈 객체를 명시해줘서 테이블명 생략 가능
      await queryRunner.manager.save(pointTransaction); // queryRunner에 임시저장

      // 2. 유저 돈 조회
      // const userResult = await this.usersRepository.findOne({
      //   where: { id: user.id },
      // });
      const userResult = await queryRunner.manager.findOne(User, {
        where: { id: user.id },
      }); // queryRunner에 임시저장

      // 3. 유저 돈 업데이트
      // await this.usersRepository.update({ id: user.id }, { point: userResult.point + amount });
      const updatedUser = this.usersRepository.create({
        ...userResult,
        point: userResult.point + amount,
      });

      await queryRunner.manager.save(updatedUser); // queryRunner에 임시저장

      await queryRunner.commitTransaction();

      // 4. 최종
      return pointTransaction;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
