import { Module } from '@nestjs/common';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryServiceService } from './inventory-service.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [InventoryServiceController],
  providers: [InventoryServiceService, PrismaService],
})
export class InventoryServiceModule {}
