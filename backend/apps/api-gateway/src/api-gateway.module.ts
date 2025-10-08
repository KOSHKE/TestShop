import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ProductsController } from './products.controller';
import { ProxyService } from './proxy.service';
import { SwaggerAggregatorService } from './swagger-aggregator.service';

@Module({
  imports: [],
  controllers: [UsersController, ProductsController],
  providers: [ProxyService, SwaggerAggregatorService],
  exports: [SwaggerAggregatorService],
})
export class ApiGatewayModule {}
