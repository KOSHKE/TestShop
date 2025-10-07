import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserServiceService {
  private prisma = new PrismaClient();

  async registerUser(dto: CreateUserDto) {
    const { email, password, name } = dto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  }
}
