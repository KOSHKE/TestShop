import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserService } from './user-service.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { USER_REPOSITORY } from './repositories/user.repository.interface';
import { PrismaUserRepository } from './repositories/prisma-user.repository';

@Module({
  imports: [],
  controllers: [UserServiceController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserServiceModule {}
