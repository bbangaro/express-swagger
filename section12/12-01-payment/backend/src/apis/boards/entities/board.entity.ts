import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // mysql
@ObjectType() // graphql
export class Board {
  @PrimaryGeneratedColumn('increment') // mysql
  @Field(() => Int) // graphql
  id: number;

  @Column()
  @Field(() => String)
  user: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
