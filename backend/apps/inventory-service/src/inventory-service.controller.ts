import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InventoryService } from './inventory-service.service';

@ApiTags('products')
@Controller('products')
export class InventoryServiceController {
  constructor(
    private readonly inventoryService: InventoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with stock information' })
  async getAllProducts() {
    return this.inventoryService.getAllProducts();
  }
}
