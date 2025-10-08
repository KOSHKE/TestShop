import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceController } from './user-service.controller';
import { UserService } from './user-service.service';

describe('UserServiceController', () => {
  let userServiceController: UserServiceController;
  let userService: UserService;

  beforeEach(async () => {
    const mockUserService = {
      registerUser: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserServiceController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userServiceController = app.get<UserServiceController>(UserServiceController);
    userService = app.get<UserService>(UserService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const result = await userServiceController.register(dto);
      
      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: expect.any(Date),
      });
      expect(userService.registerUser).toHaveBeenCalledWith(dto);
    });
  });
});
