import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';

/**
 * UsersController
 * Handles user management endpoints
 * Note: Authentication endpoints (register, login) are in AuthController
 * All endpoints require JWT authentication
 */
@ApiTags('users')
@Controller('users')
@ApiBearerAuth() // Swagger: Require JWT token
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved',
    type: UserEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getProfile(@CurrentUser() user: { id: string; email: string }): Promise<UserEntity> {
    const fullUser = await this.usersService.findByEmail(user.email);
    
    // Return without password
    return new UserEntity({
      id: fullUser.id,
      email: fullUser.email,
      name: fullUser.name,
      createdAt: fullUser.createdAt,
    });
  }

  // TODO: Add more endpoints
  // PATCH /users/me - Update current user profile
  // GET /users/:id - Get user by ID (admin only)
}

