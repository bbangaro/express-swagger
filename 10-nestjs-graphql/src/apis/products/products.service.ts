import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    console.log(createProductInput);
    const result = this.productsRepository.save({
      ...createProductInput,
    });

    return result;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // this.productsRepository.create // DB 접속과 관련 없음. 등록을 위한 빈 객체 생성
    // this.productsRepository.insert // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update // 결과를 객체로 못 돌려 받는 수정 방법
    // this.productsRepository.save(id ? 등록 : 조회) => response(obj)

    const product = await this.findOne({ productId });

    this.checkSoldout({ product });

    // try {
    //   const result = this.productsRepository.save({
    //     ...product, // 수정 후, 수정되지 않은 결과값까지 객체로 돌려받고 싶을 때
    //     ...updateProductInput,
    //   });

    //   return result;
    // } catch (err) {
    //   console.log(err);
    // }
    const result = this.productsRepository.save({
      ...product, // 수정 후, 수정되지 않은 결과값까지 객체로 돌려받고 싶을 때
      ...updateProductInput,
    });

    return result;
  }

  /**
   * 검증 로직
   * */
  checkSoldout({ product }: IProductsServiceCheckSoldout) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
