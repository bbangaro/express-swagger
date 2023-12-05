import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductSaleslocationService } from '../productSaleslocation/productSaleslocation.service';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    ProductSaleslocationService,
  ],
})
export class ProductsModule {}
