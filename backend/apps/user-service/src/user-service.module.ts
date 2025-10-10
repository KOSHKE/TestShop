import { Module } from '@nestjs/common';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { 
  PrometheusMetricsModule,
  GlobalExceptionFilter,
  MetricsInterceptor,
} from '@app/shared';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';

@Module({
  imports: [
    // Global Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/user-service/.env',
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
        limit: 50, // 50 requests per ttl (internal service)
      },
    ]),
    // Prometheus Metrics
    PrometheusMetricsModule,
    // Feature Modules
    UsersModule,
    AuthModule,
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
export class UserServiceModule {}
