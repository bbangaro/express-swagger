import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.resolver';
import { CreateProductInput } from './dto/create-product.input';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Mutation()
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    console.log('create', createProductInput);
    return this.productsService.create({ createProductInput });
  }
}
