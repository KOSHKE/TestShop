import { Module } from '@nestjs/common';
import { InventoryPrismaService } from '@app/shared';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.interface';
import { PrismaProductRepository } from './repositories/prisma-product.repository';
import { ProductMapper } from './mappers/product.mapper';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    InventoryPrismaService,
    ProductMapper,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [ProductsService], // Export for future Stock module
})
export class ProductsModule {}

