import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  // fetchProduct(@Args('productId') productId: string, //
  // ): Promise<Product> {
  //    return this.productsService.findOne({ productId });
  // }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    console.log('create', createProductInput);
    return this.productsService.create({ createProductInput });
  }

  // nest는 resolver에서 await을 해줌
  updateProduct() {
    this.productsService.update();
  }
}
