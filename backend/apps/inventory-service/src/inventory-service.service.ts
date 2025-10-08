import { Inject, Injectable } from '@nestjs/common';
import type { IProductRepository } from './repositories/product.repository.interface';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.interface';
import { ProductMapper } from './mappers/product.mapper';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    private readonly productMapper: ProductMapper,
  ) {}

  async getAllProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.findAllWithStock();
    return this.productMapper.toResponseDtoList(products);
  }
}
