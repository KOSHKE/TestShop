import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule], // Will need ProductsService to validate products
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}

