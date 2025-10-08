import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InventoryServiceService } from './inventory-service.service';

@ApiTags('products')
@Controller('products')
export class InventoryServiceController {
  constructor(
    private readonly inventoryServiceService: InventoryServiceService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with stock information' })
  async getAllProducts() {
    return this.inventoryServiceService.getAllProducts();
  }
}
