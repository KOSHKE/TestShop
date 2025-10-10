import type { User } from '../../../../../libs/generated/user-prisma';

export interface IUserRepository {
  create(email: string, hashedPassword: string, name?: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');

