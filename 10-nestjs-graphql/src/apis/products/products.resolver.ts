import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { ProductsService } from './products.service';

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
