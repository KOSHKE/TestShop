import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { 
  PrometheusMetricsModule,
  GlobalExceptionFilter,
  MetricsInterceptor,
} from '@app/shared';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProxyModule } from './proxy/proxy.module';
import { SwaggerModule } from './swagger/swagger.module';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';

@Module({
  imports: [
    // Global Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api-gateway/.env',
      load: [configuration],
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    // Global Rate Limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 100, // 100 requests per ttl
      },
    ]),
    // Prometheus Metrics
    PrometheusMetricsModule,
    // Business Modules
    AuthModule,
    UsersModule,
    ProductsModule,
    // Infrastructure Modules
    ProxyModule,
    SwaggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class ApiGatewayModule {}
