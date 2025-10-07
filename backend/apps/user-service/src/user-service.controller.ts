import { Body, Controller, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post('register') 
  async register(@Body() dto: CreateUserDto) {
    return this.userServiceService.registerUser(dto);
  }
}
