import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductTags } from './entities/productTag.entity';
import {
  IProductsTagsServiceBulkInsert,
  IProductsTagsServiceFindByNames,
} from './interfaces/productsTags-service.interface';

@Injectable()
export class ProductsTagsService {
  constructor(
    @InjectRepository(ProductTags)
    private readonly productsTagsRepository: Repository<ProductTags>,
  ) {}

  findByNames({ tagNames }: IProductsTagsServiceFindByNames) {
    return this.productsTagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: IProductsTagsServiceBulkInsert) {
    return this.productsTagsRepository.insert(names);
  }
}
