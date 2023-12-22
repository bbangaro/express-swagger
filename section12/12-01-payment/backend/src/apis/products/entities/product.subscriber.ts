// 구독

import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log('subscriber', event);

    const id = event.entity.id;
    const name = event.entity.name;
    const description = event.entity.description;
    const price = event.entity.price;
    const isSoldout = event.entity.isSoldout;

    console.log('subscriber entity', id, name, description, price, isSoldout);
  }

  // 트리거 사용하면 안되는 경우
  // 1. 트랜잭션으로 연결된 중요한 내용들..
  // 2. 메인 로직에 큰 영향을 주지 않는 로직들

  // 트리거 사용하기 좋은 경우
  // 1. 통계 계산하기, 로그 쌓아ㅗㄴㅎ기
}
