import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { UserServiceModule } from './user-service.module';
import { setupValidation } from './setup/validation.setup';
import { setupSwagger } from './setup/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  const configService = app.get(ConfigService);

  setupValidation(app);
  setupSwagger(app);

  const port = configService.getOrThrow<number>('port');
  await app.listen(port);

  console.log(`🚀 User Service is running on http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();
