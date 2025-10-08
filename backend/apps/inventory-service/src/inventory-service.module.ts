import { Module } from '@nestjs/common';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryService } from './inventory-service.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [InventoryServiceController],
  providers: [InventoryService, PrismaService],
})
export class InventoryServiceModule {}
