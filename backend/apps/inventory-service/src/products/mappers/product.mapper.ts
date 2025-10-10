import { Injectable } from '@nestjs/common';
import { ProductWithStock } from '../repositories/product.repository.interface';
import { ProductResponseDto } from '../dto/product-response.dto';

@Injectable()
export class ProductMapper {
  toResponseDto(product: ProductWithStock): ProductResponseDto {
    return new ProductResponseDto({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      totalStock: product.stock.reduce((sum, s) => sum + s.quantity, 0),
      stockDetails: product.stock,
    });
  }

  toResponseDtoList(products: ProductWithStock[]): ProductResponseDto[] {
    return products.map((product) => this.toResponseDto(product));
  }
}

