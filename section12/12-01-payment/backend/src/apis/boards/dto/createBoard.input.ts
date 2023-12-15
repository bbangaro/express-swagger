import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  user: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
