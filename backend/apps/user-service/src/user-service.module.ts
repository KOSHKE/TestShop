import { Module } from '@nestjs/common';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { GlobalExceptionFilter, MetricsService, UserPrismaService } from '@app/shared';
import { UserServiceController } from './user-service.controller';
import { UserService } from './user-service.service';
import { USER_REPOSITORY } from './repositories/user.repository.interface';
import { PrismaUserRepository } from './repositories/prisma-user.repository';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 50, // 50 requests per ttl (internal service)
      },
    ]),
  ],
  controllers: [UserServiceController],
  providers: [
    UserService,
    UserPrismaService,
    MetricsService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class UserServiceModule {}
