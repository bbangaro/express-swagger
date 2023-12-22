import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductSaleslocationService } from '../productSaleslocation/productSaleslocation.service';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { ProductsTagsService } from '../productTags/productsTags.service';
import { ProductTags } from '../productTags/entities/productTag.entity';
import { ProductSubscriber } from './entities/product.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTags,
    ]),
  ],
  providers: [
    ProductSubscriber,
    ProductsResolver, //
    ProductsService,
    ProductSaleslocationService,
    ProductsTagsService,
  ],
})
export class ProductsModule {}
