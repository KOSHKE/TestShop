import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { SwaggerService } from './swagger.service';

@ApiExcludeController()
@Controller('api-json')
export class SwaggerController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @Get()
  async getAggregatedDocs() {
    return this.swaggerService.aggregateSwaggerDocs();
  }
}

