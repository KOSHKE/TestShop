import { BaseApiClient } from '../base-client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
}

/**
 * Auth Service
 * Handles authentication API calls
 */
export class AuthService extends BaseApiClient {
  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth/login', data);
  }

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth/register', data);
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await this.post<void>('/auth/logout', {});
  }
}

