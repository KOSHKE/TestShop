import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from './repositories/user.repository.interface';

describe('UsersController', () => {
  let usersController: UsersController;

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
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('register', () => {
    it('should register a new user without returning password', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const result = await usersController.register(dto);
      
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email', 'test@example.com');
      expect(result).toHaveProperty('name', 'Test User');
      expect(result).toHaveProperty('createdAt');
      expect(result).not.toHaveProperty('password');
    });
  });
});

