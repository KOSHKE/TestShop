import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '@app/shared';
import { ProxyService } from '../proxy/proxy.service';

/**
 * AuthController (API Gateway)
 * Proxies authentication requests to User Service
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  async register(@Body() dto: CreateUserDto) {
    return this.proxyService.forwardRequest('users', 'auth/register', 'POST', dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() dto: { email: string; password: string }) {
    return this.proxyService.forwardRequest('users', 'auth/login', 'POST', dto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  async logout() {
    return this.proxyService.forwardRequest('users', 'auth/logout', 'POST', {});
  }
}

