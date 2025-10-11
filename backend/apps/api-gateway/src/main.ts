import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ApiGatewayModule } from './api-gateway.module';
import { setupCors } from './setup/cors.setup';
import { setupValidation } from './setup/validation.setup';
import { setupSwagger } from './setup/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  setupCors(app);
  setupValidation(app);
  await setupSwagger(app);

  const port = configService.getOrThrow<number>('port');
  await app.listen(port);

  console.log(`🚀 API Gateway is running on http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api`);
}

bootstrap();
