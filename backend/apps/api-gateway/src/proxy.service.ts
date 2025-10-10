import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
  private readonly services: {
    users: string;
    products: string;
  };

  constructor(private readonly configService: ConfigService) {
    this.services = {
      users: this.configService.getOrThrow<string>('services.userService'),
      products: this.configService.getOrThrow<string>('services.inventoryService'),
    };
  }

  async proxyRequest(
    serviceName: 'users' | 'products',
    path: string,
    method: string,
    body?: any,
    headers?: any,
  ) {
    const serviceUrl = this.services[serviceName];
    const url = `${serviceUrl}/${path}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Service ${serviceName} error: ${error}`);
    }

    return response.json();
  }
}

