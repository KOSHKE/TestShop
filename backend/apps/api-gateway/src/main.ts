import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerAggregatorService } from './swagger-aggregator.service';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT;
  if (!port) {
    throw new Error('PORT environment variable is required');
  }

  const swaggerAggregator = app.get(SwaggerAggregatorService);
  let aggregatedDocument = await swaggerAggregator.aggregateSwaggerDocs();

  app.getHttpAdapter().get('/api-json', async (req, res) => {
    try {
      aggregatedDocument = await swaggerAggregator.aggregateSwaggerDocs();
      res.json(aggregatedDocument);
    } catch (error) {
      if (aggregatedDocument) {
        res.json(aggregatedDocument);
      } else {
        res.status(500).json({
          error: 'Failed to load API documentation',
          message: error.message,
        });
      }
    }
  });

  SwaggerModule.setup('api', app, aggregatedDocument);

  await app.listen(Number(port));

  console.log(`🚀 API Gateway is running on http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api`);
}
bootstrap();
