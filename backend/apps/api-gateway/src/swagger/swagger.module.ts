import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwaggerController } from './swagger.controller';
import { SwaggerService } from './swagger.service';

@Module({
  imports: [HttpModule],
  controllers: [SwaggerController],
  providers: [SwaggerService],
  exports: [SwaggerService],
})
export class SwaggerModule {}

