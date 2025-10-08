import { NestFactory } from '@nestjs/core';
import { InventoryServiceModule } from './inventory-service.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(InventoryServiceModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Inventory Service API')
    .setDescription('API for product inventory and stock management')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Expose Swagger JSON for Gateway aggregation
  app.getHttpAdapter().get('/api-json', (req, res) => {
    res.json(document);
  });

  const port = process.env.PORT;
  if (!port) {
    throw new Error('PORT environment variable is required');
  }

  await app.listen(Number(port));

  console.log(`🚀 Inventory Service is running on http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api`);
}
bootstrap();
