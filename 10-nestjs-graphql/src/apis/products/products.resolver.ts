import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Query(() => [Product])
  fetchProducs(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    console.log('create', createProductInput);
    return this.productsService.create({ createProductInput });
  }

  // nest는 resolver에서 await을 해줌
  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update({ productId, updateProductInput });
  }
}
