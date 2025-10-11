import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProxyService } from '../proxy/proxy.service';

/**
 * UsersController (API Gateway)
 * Proxies user management requests to User Service
 * Note: Authentication endpoints (register, login) are in AuthController
 */
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly proxyService: ProxyService) {}

  // TODO: Add user management endpoints (profile, update, etc.)
  // GET /users/me - Get current user profile
  // PATCH /users/me - Update current user profile
  // GET /users/:id - Get user by ID (admin only)
}

