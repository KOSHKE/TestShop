import { Injectable } from '@nestjs/common';

@Injectable()
export class ProxyService {
  private readonly services = {
    users: process.env.USER_SERVICE_URL || 'http://user-service:5000',
    products: process.env.INVENTORY_SERVICE_URL || 'http://inventory-service:5001',
  };

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

