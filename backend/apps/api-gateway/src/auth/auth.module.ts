import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ProxyService } from '../proxy.service';

/**
 * AuthModule (API Gateway)
 * Handles authentication routing
 */
@Module({
  controllers: [AuthController],
  providers: [ProxyService],
})
export class AuthModule {}

