import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('API for user registration and authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);

  // Expose Swagger JSON for Gateway aggregation
  app.getHttpAdapter().get('/api-json', (req, res) => {
    res.json(document);
  });
}

