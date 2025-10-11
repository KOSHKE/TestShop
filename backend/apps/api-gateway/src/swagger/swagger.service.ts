import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SwaggerService {
  private readonly services: Array<{ name: string; url: string }>;
  private cachedDocs: any = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL_MS = 60000; // 60 seconds

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
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
    // Check cache
    const now = Date.now();
    if (this.cachedDocs && now - this.cacheTimestamp < this.CACHE_TTL_MS) {
      return this.cachedDocs;
    }

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
        const response = await lastValueFrom(
          this.httpService.get(`${service.url}/api-json`, {
            timeout: 5000,
          }),
        );

        const serviceDoc = response.data;

        // Add service paths with prefix to avoid collisions
        if (serviceDoc.paths) {
          for (const [path, def] of Object.entries(serviceDoc.paths)) {
            const prefixedPath = `/${service.name}${path}`;
            aggregatedDoc.paths[prefixedPath] = def;
          }
        }

        // Merge schemas
        if (serviceDoc.components?.schemas) {
          Object.assign(
            aggregatedDoc.components.schemas,
            serviceDoc.components.schemas,
          );
        }

        // Merge tags
        if (serviceDoc.tags) {
          aggregatedDoc.tags.push(...serviceDoc.tags);
        }
      } catch (error: any) {
        // Silently skip unavailable services
        continue;
      }
    }

    // Update cache
    this.cachedDocs = aggregatedDoc;
    this.cacheTimestamp = now;

    return aggregatedDoc;
  }
}

