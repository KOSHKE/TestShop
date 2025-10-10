import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ProxyService } from '../proxy.service';

@Module({
  controllers: [UsersController],
  providers: [ProxyService],
})
export class UsersModule {}

