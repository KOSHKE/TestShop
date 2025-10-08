import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceController } from './user-service.controller';
import { UserService } from './user-service.service';
import { USER_REPOSITORY } from './repositories/user.repository.interface';

describe('UserServiceController', () => {
  let userServiceController: UserServiceController;

  beforeEach(async () => {
    const mockUserRepository = {
      create: jest.fn().mockResolvedValue({
        id: 'user-uuid-1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed_password',
        createdAt: new Date(),
      }),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserServiceController],
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userServiceController = app.get<UserServiceController>(UserServiceController);
  });

  describe('register', () => {
    it('should register a new user without returning password', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const result = await userServiceController.register(dto);
      
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email', 'test@example.com');
      expect(result).toHaveProperty('name', 'Test User');
      expect(result).toHaveProperty('createdAt');
      expect(result).not.toHaveProperty('password');
    });
  });
});
