import { Injectable } from '@nestjs/common';
import { InventoryPrismaService } from '@app/shared';
import { IProductRepository, ProductWithStock } from './product.repository.interface';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: InventoryPrismaService) {}

  async findAllWithStock(): Promise<ProductWithStock[]> {
    return this.prisma.product.findMany({
      include: {
        stock: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }) as Promise<ProductWithStock[]>;
  }

  async findById(id: string): Promise<ProductWithStock | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        stock: true,
      },
    }) as Promise<ProductWithStock | null>;
  }
}

