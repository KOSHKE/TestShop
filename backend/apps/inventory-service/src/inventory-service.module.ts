import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryService } from './inventory-service.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.interface';
import { PrismaProductRepository } from './repositories/prisma-product.repository';
import { ProductMapper } from './mappers/product.mapper';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 50, // 50 requests per ttl (internal service)
      },
    ]),
  ],
  controllers: [InventoryServiceController],
  providers: [
    InventoryService,
    PrismaService,
    ProductMapper,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class InventoryServiceModule {}
