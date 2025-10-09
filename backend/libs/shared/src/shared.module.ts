import { Module } from '@nestjs/common';
import { MetricsService } from './services';

@Module({
  providers: [MetricsService],
  exports: [MetricsService],
})
export class SharedModule {}
