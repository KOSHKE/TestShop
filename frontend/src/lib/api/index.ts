import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';

export const api = {
  products: new ProductsService(),
  users: new UsersService(),
};

export * from './types';

