import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { UsersController } from './users.controller';
import { ProductsController } from './products.controller';
import { ProxyService } from './proxy.service';
import { SwaggerAggregatorService } from './swagger-aggregator.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 100, // 100 requests per ttl
      },
    ]),
  ],
  controllers: [UsersController, ProductsController],
  providers: [
    ProxyService,
    SwaggerAggregatorService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [SwaggerAggregatorService],
})
export class ApiGatewayModule {}
