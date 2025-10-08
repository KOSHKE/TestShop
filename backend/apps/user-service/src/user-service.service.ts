import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import type { IUserRepository } from './repositories/user.repository.interface';
import { USER_REPOSITORY } from './repositories/user.repository.interface';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

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
}
