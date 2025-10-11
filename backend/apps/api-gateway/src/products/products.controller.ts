import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProxyService } from '../proxy/proxy.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with stock information' })
  async getAllProducts() {
    return this.proxyService.forwardRequest('products', 'products', 'GET');
  }
}

