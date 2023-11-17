import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

<<<<<<< HEAD
  // fetchProduct(@Args('productId') productId: string, //
  // ): Promise<Product> {
  //    return this.productsService.findOne({ productId });
  // }
=======
  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }
>>>>>>> 182532b7d50a65b9b74d573c0b83fe1945590d12

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
