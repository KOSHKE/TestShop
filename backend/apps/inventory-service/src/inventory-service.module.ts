import { Module } from '@nestjs/common';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryService } from './inventory-service.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.interface';
import { PrismaProductRepository } from './repositories/prisma-product.repository';
import { ProductMapper } from './mappers/product.mapper';

@Module({
  imports: [],
  controllers: [InventoryServiceController],
  providers: [
    InventoryService,
    PrismaService,
    ProductMapper,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
  ],
})
export class InventoryServiceModule {}
