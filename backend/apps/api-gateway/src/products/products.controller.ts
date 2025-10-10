import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProxyService } from '../proxy.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with stock information' })
  async getAllProducts() {
    return this.proxyService.proxyRequest('products', 'products', 'GET');
  }
}

