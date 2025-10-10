import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerAggregatorService } from './swagger-aggregator.service';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  app.enableCors();

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

  const port = configService.getOrThrow<number>('port');

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

  await app.listen(port);

  console.log(`🚀 API Gateway is running on http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api`);
}
bootstrap();
