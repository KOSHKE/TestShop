import { BaseApiClient } from '../base-client';
import type { User, RegisterUserDto, LoginUserDto } from '../types';

export class UsersService extends BaseApiClient {
  async register(data: RegisterUserDto): Promise<User> {
    return this.post<User>('/users/register', data);
  }

  async login(data: LoginUserDto): Promise<{ token: string; user: User }> {
    return this.post<{ token: string; user: User }>('/users/login', data);
  }

  async getCurrentUser(): Promise<User> {
    return this.get<User>('/users/me');
  }
}

