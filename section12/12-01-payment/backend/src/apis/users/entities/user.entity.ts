import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  // 비밀번호는 브라우저에 전달하지 않음
  // @Field(() => String)
  @Column()
  password: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field(() => String)
  email: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;
}
