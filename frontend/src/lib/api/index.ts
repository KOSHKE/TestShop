import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

export const api = {
  auth: new AuthService(),
  products: new ProductsService(),
  users: new UsersService(),
};

export * from './types';

