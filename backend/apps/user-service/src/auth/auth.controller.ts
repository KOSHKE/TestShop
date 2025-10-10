import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user (TODO)' })
  async login(@Body() dto: any) {
    // TODO: Implement login logic
    return { message: 'Login endpoint - Coming soon!' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user (TODO)' })
  async logout() {
    // TODO: Implement logout logic
    return { message: 'Logout endpoint - Coming soon!' };
  }
}

