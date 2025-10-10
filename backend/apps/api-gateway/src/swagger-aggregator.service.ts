import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerAggregatorService {
  private readonly services: Array<{ name: string; url: string }>;

  constructor(private readonly configService: ConfigService) {
    this.services = [
      {
        name: 'user-service',
        url: this.configService.getOrThrow<string>('services.userService'),
      },
      {
        name: 'inventory-service',
        url: this.configService.getOrThrow<string>('services.inventoryService'),
      },
    ];
  }

  async aggregateSwaggerDocs(): Promise<any> {
    const aggregatedDoc: any = {
      openapi: '3.0.0',
      info: {
        title: 'API Gateway',
        description: 'Unified API documentation for all microservices',
        version: '1.0',
      },
      servers: [
        {
          url: 'http://localhost:4000',
          description: 'API Gateway',
        },
      ],
      paths: {},
      components: {
        schemas: {},
        securitySchemes: {
          bearer: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      tags: [],
    };

    for (const service of this.services) {
      try {
        const response = await fetch(`${service.url}/api-json`);

        if (!response.ok) {
          continue;
        }

        const serviceDoc = await response.json();

        if (serviceDoc.paths) {
          Object.assign(aggregatedDoc.paths, serviceDoc.paths);
        }

        if (serviceDoc.components?.schemas) {
          Object.assign(
            aggregatedDoc.components.schemas,
            serviceDoc.components.schemas,
          );
        }

        if (serviceDoc.tags) {
          aggregatedDoc.tags.push(...serviceDoc.tags);
        }
      } catch (error) {
        // Silently skip unavailable services
        continue;
      }
    }

    return aggregatedDoc;
  }
}

