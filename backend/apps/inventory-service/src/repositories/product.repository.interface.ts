import type { Product, Stock } from '../../../../../libs/generated/inventory-prisma';

export interface ProductWithStock extends Product {
  stock: Stock[];
}

export interface IProductRepository {
  findAllWithStock(): Promise<ProductWithStock[]>;
  findById(id: string): Promise<ProductWithStock | null>;
}

export const PRODUCT_REPOSITORY = Symbol('IProductRepository');

