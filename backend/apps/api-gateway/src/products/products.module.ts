import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProxyService } from '../proxy.service';

@Module({
  controllers: [ProductsController],
  providers: [ProxyService],
})
export class ProductsModule {}

