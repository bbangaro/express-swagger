import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  /**
   * PartialType을 적용하면
   * CreateProductInput이 nullable로 들어오게 됨
   */
  // @Field(() => String, { nullable: true })
  // name?: string;
  // @Field(() => String, { nullable: true })
  // description?: string;
  // @Min(0)
  // @Field(() => Int, { nullable: true })
  // price?: number;
}
/*
  PickType(CreateProductInput, ['name', 'price']) // 뽑기
  OmitType(CreateProductInput, ['description']) // 제외
  PartialType(CreateProductInput) // ? nullable
*/
