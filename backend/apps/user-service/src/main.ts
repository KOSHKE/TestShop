import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('API for user registration and management')
    .setVersion('1.0')
    .addTag('users')
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

  console.log(`🚀 User Service is running on http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api`);
}
bootstrap();
