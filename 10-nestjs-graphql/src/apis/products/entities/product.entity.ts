import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductTags } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * grapql용 타입정의
 * @ObjectType()
 * @Field(() => String)
 */

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  // 반대편 테이블쪽의 설정정보가 같이 입력돼야 함
  @JoinTable()
  @ManyToMany(() => ProductTags, (productTags) => productTags.products)
  @Field(() => [ProductTags])
  productTags: ProductTags[];
}
