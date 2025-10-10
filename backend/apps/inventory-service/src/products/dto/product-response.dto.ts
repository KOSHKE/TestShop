import { Stock } from '../../../../../libs/generated/inventory-prisma';

export class ProductResponseDto {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  totalStock: number;
  stockDetails: Stock[];

  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
}

