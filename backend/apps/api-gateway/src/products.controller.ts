import { Controller, Get } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  async getAllProducts() {
    return this.proxyService.proxyRequest('products', 'products', 'GET');
  }
}

