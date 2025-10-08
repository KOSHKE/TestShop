import { BaseApiClient } from '../base-client';
import type { Product } from '../types';

export class ProductsService extends BaseApiClient {
  async getAll(): Promise<Product[]> {
    return this.get<Product[]>('/products');
  }

  async getById(id: string): Promise<Product> {
    return this.get<Product>(`/products/${id}`);
  }
}

