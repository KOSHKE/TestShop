import { Test, TestingModule } from '@nestjs/testing';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryService } from './inventory-service.service';

describe('InventoryServiceController', () => {
  let inventoryServiceController: InventoryServiceController;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    const mockInventoryService = {
      getAllProducts: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Test Product',
          description: 'Test Description',
          price: 100,
          inventory: [{ id: 1, quantity: 10, location: 'A1' }],
        },
      ]),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [InventoryServiceController],
      providers: [
        {
          provide: InventoryService,
          useValue: mockInventoryService,
        },
      ],
    }).compile();

    inventoryServiceController = app.get<InventoryServiceController>(InventoryServiceController);
    inventoryService = app.get<InventoryService>(InventoryService);
  });

  describe('getAllProducts', () => {
    it('should return an array of products with inventory', async () => {
      const result = await inventoryServiceController.getAllProducts();
      
      expect(result).toEqual([
        {
          id: 1,
          name: 'Test Product',
          description: 'Test Description',
          price: 100,
          inventory: [{ id: 1, quantity: 10, location: 'A1' }],
        },
      ]);
      expect(inventoryService.getAllProducts).toHaveBeenCalled();
    });
  });
});
