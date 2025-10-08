import { Injectable } from '@nestjs/common';
import type { User } from '../../../../generated/prisma';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, hashedPassword: string, name?: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}

