import { Controller, Post, Body } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('users')
export class UsersController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.proxyService.proxyRequest('users', 'users/register', 'POST', body);
  }
}

