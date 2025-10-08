import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const env = process.env.NODE_ENV || 'development';

  console.log(`🌱 Seeding database for environment: ${env}`);

  if (env === 'development') {
    await seedDevData();
  } else if (env === 'production') {
    await seedProdData();
  }

  console.log('✅ Seeding completed');
}

async function seedDevData() {
  // Create test products with stock
  const products = [
    {
      id: 'dev-product-1',
      name: 'Gaming Laptop',
      description: 'High-performance gaming laptop',
      price: 1299.99,
    },
    {
      id: 'dev-product-2',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      price: 49.99,
    },
    {
      id: 'dev-product-3',
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard',
      price: 129.99,
    },
    {
      id: 'dev-product-4',
      name: '4K Monitor',
      description: '27-inch 4K display',
      price: 399.99,
    },
    {
      id: 'dev-product-5',
      name: 'USB-C Hub',
      description: '7-in-1 USB-C adapter',
      price: 59.99,
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { id: productData.id },
      update: {},
      create: productData,
    });

    // Add stock for each product
    await prisma.stock.upsert({
      where: { id: `${productData.id}-stock` },
      update: { quantity: Math.floor(Math.random() * 100) + 20 },
      create: {
        id: `${productData.id}-stock`,
        productId: product.id,
        quantity: Math.floor(Math.random() * 100) + 20, // Random quantity 20-120
      },
    });
  }

  // Create test users
  await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      id: 'dev-user-admin',
      email: 'admin@test.com',
      password: '$2a$10$samplehashedpassword', // In real app, hash properly
      name: 'Admin User',
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      id: 'dev-user-regular',
      email: 'user@test.com',
      password: '$2a$10$samplehashedpassword',
      name: 'Test User',
    },
  });

  console.log('  ✓ Dev products, stock, and users created');
}

async function seedProdData() {
  // In production, only seed essential reference data
  // For example: default categories, system users, etc.
  console.log('  ℹ No production seed data configured');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

