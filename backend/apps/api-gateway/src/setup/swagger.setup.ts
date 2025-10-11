import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerService } from '../swagger/swagger.service';

export async function setupSwagger(app: INestApplication): Promise<void> {
  const swaggerService = app.get(SwaggerService);
  
  // Load aggregated documentation from microservices
  const aggregatedDocument = await swaggerService.aggregateSwaggerDocs();

  SwaggerModule.setup('api', app, aggregatedDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}

