import { Test, TestingModule } from '@nestjs/testing';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryService } from './inventory-service.service';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.interface';
import { ProductMapper } from './mappers/product.mapper';

describe('InventoryServiceController', () => {
  let inventoryServiceController: InventoryServiceController;

  beforeEach(async () => {
    const mockProductRepository = {
      findAllWithStock: jest.fn().mockResolvedValue([
        {
          id: 'product-uuid-1',
          name: 'Test Product',
          description: 'Test Description',
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          stock: [
            { 
              id: 'stock-uuid-1', 
              productId: 'product-uuid-1', 
              quantity: 10, 
              updatedAt: new Date() 
            },
          ],
        },
      ]),
      findById: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [InventoryServiceController],
      providers: [
        InventoryService,
        ProductMapper,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    inventoryServiceController = app.get<InventoryServiceController>(InventoryServiceController);
  });

  describe('getAllProducts', () => {
    it('should return an array of products with inventory', async () => {
      const result = await inventoryServiceController.getAllProducts();
      
      expect(result).toEqual([
        {
          id: 'product-uuid-1',
          name: 'Test Product',
          description: 'Test Description',
          price: 100,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          totalStock: 10,
          stockDetails: expect.any(Array),
        },
      ]);
    });
  });
});
