import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserService } from './user-service.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserServiceController],
  providers: [UserService, PrismaService],
})
export class UserServiceModule {}
