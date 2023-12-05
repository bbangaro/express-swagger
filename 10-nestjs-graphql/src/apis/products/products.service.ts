import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocationService } from './../productSaleslocation/productSaleslocation.service';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { ProductsTagsService } from '../productTags/productsTags.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productSaleslocationService: ProductSaleslocationService,
    private readonly productsTagsService: ProductsTagsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    console.log(createProductInput);
    // 1. 상품 하나만 등록할 때
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    // });

    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const productSalesResult = await this.productSaleslocationService.create({
      productSaleslocation,
    });

    // 3. 상품태그 등록
    const tagNames = productTags.map((el) => el.replace('#', ''));
    const prevTags = await this.productsTagsService.findByNames({ tagNames });

    let tempTags = [];
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => prevEl.name === el);
      if (!isExists) {
        tempTags.push({ name: el });
      }
    });

    const newTagsResult = await this.productsTagsService.bulkInsert({
      names: tempTags,
    }); // bulk-insert
    const tags = [...prevTags, ...newTagsResult.identifiers];

    const productsResult = this.productsRepository.save({
      ...product,
      productSaleslocation: productSalesResult,
      productCategory: {
        id: productCategoryId,
        // name까지 받고싶으면 productSaleslocation 처럼!
      },
      productTags: tags,
    });

    return productsResult;
  }

  /**
   * 참고: https://sjh9708.tistory.com/38
   */
  async update({
    productId,
    updateProductInput,
  }: // }: IProductsServiceUpdate): Promise<void> {
  IProductsServiceUpdate): Promise<Product> {
    // this.productsRepository.create // DB 접속과 관련 없음. 등록을 위한 빈 객체 생성
    // this.productsRepository.insert // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update // 결과를 객체로 못 돌려 받는 수정 방법
    // this.productsRepository.save(id ? 등록 : 조회) => response(obj)

    const { productSaleslocation, productCategoryId, productTags, ...product } =
      updateProductInput;

    const prevProductResult = await this.findOne({ productId });
    this.checkSoldout({ product: prevProductResult });

    // 2. 상품과 상품거래위치를 같이 등록하는 방법 (create와 동일)
    const productSalesResult = await this.productSaleslocationService.create({
      productSaleslocation,
    });

    // 3. 상품태그 등록 (create와 동일)
    const tagNames = productTags.map((el) => el.replace('#', ''));
    const prevTags = await this.productsTagsService.findByNames({ tagNames });

    let tempTags = [];
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => prevEl.name === el);
      if (!isExists) {
        tempTags.push({ name: el });
      }
    });

    const newTagsResult = await this.productsTagsService.bulkInsert({
      names: tempTags,
    }); // bulk-insert
    const tags = [...prevTags, ...newTagsResult.identifiers];

    const productsResult = this.productsRepository.save({
      ...prevProductResult, // 업데이트 로직에서 추가
      ...product,
      productSaleslocation: productSalesResult,
      productCategory: {
        id: productCategoryId,
      },
      productTags: tags,
    });

    return productsResult;
  }

  /**
   * 검증 로직
   * */
  checkSoldout({ product }: IProductsServiceCheckSoldout) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 진짜 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제 (isDeleted - boolean)
    // const result = this.productsRepository.update(
    //   { id: productId },
    //   { isDeleted: true },
    // );

    // 3. 소프트 삭제 (deletedAt - 날짜)
    // const result = this.productsRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );

    // 4. 소프트 리무브 (TypeORM 제공)
    // id로만 삭제 가능
    // 여러 ID 한번에 지우기 가능 softRemove([{ id: productId }, { id: productId2 }])
    // this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 딜리트 (TypeORM 제공)
    // 다른 컬럼으로 삭제 가능
    // 여러 ID 한번에 지우기 불가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
