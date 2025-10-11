import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/shared';
import type { IUserRepository } from './repositories/user.repository.interface';
import { USER_REPOSITORY } from './repositories/user.repository.interface';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Register a new user
   */
  async registerUser(dto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const user = await this.userRepository.create(
      dto.email,
      hashedPassword,
      dto.name,
    );

    // Don't return password in response
    return new UserEntity({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    });
  }

  /**
   * Find user by email (for authentication)
   * Returns user with password for validation
   */
  async findByEmail(email: string): Promise<any> {
    return this.userRepository.findByEmail(email);
  }
}

