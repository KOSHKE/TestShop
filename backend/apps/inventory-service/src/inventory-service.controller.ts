import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventoryServiceService } from './inventory-service.service';

@ApiTags('products')
@Controller('products')
export class InventoryServiceController {
  constructor(
    private readonly inventoryServiceService: InventoryServiceService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with stock information' })
  @ApiResponse({
    status: 200,
    description: 'Returns all products with their stock details',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'dev-product-1' },
          name: { type: 'string', example: 'Gaming Laptop' },
          description: {
            type: 'string',
            example: 'High-performance gaming laptop',
          },
          price: { type: 'number', example: 1299.99 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          totalStock: { type: 'number', example: 85 },
          stockDetails: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                productId: { type: 'string' },
                quantity: { type: 'number' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
  })
  async getAllProducts() {
    return this.inventoryServiceService.getAllProducts();
  }
}
