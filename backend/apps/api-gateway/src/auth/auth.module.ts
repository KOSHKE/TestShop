import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ProxyModule } from '../proxy/proxy.module';

/**
 * AuthModule (API Gateway)
 * Handles authentication routing
 */
@Module({
  imports: [ProxyModule],
  controllers: [AuthController],
})
export class AuthModule {}

