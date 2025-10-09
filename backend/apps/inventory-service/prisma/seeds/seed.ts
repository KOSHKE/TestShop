import { PrismaClient } from '../../../../libs/generated/inventory-prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Inventory database...');

  // Create test products
  const product1 = await prisma.product.upsert({
    where: { id: 'product-1' },
    update: {},
    create: {
      id: 'product-1',
      name: 'Laptop',
      description: 'High-performance laptop',
      price: 1299.99,
      stock: {
        create: [
          { quantity: 50 },
        ],
      },
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id: 'product-2' },
    update: {},
    create: {
      id: 'product-2',
      name: 'Smartphone',
      description: 'Latest model smartphone',
      price: 899.99,
      stock: {
        create: [
          { quantity: 100 },
        ],
      },
    },
  });

  const product3 = await prisma.product.upsert({
    where: { id: 'product-3' },
    update: {},
    create: {
      id: 'product-3',
      name: 'Headphones',
      description: 'Wireless noise-canceling headphones',
      price: 299.99,
      stock: {
        create: [
          { quantity: 75 },
        ],
      },
    },
  });

  console.log('✅ Inventory database seeded successfully!');
  console.log(`Created products: ${product1.name}, ${product2.name}, ${product3.name}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Inventory database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

