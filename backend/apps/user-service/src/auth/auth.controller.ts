import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CreateUserDto } from '@app/shared';
import { Public } from './decorators/public.decorator';

/**
 * AuthController
 * Handles authentication endpoints: login, register, logout
 * All endpoints are public (no JWT required)
 */
@ApiTags('auth')
@Controller('auth')
@Public() // Mark all auth endpoints as public
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponseDto,
  })
  async register(@Body() dto: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user (client-side token removal)' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  async logout() {
    // JWT logout is handled client-side by removing the token
    // Optionally implement token blacklist for extra security
    return { message: 'Logout successful' };
  }
}

