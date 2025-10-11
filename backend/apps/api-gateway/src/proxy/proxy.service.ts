import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly services: Record<string, string>;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.services = {
      users: this.configService.getOrThrow('USER_SERVICE_URL'),
      products: this.configService.getOrThrow('INVENTORY_SERVICE_URL'),
    };
  }

  async forwardRequest(
    service: keyof typeof this.services,
    path: string,
    method: string,
    body?: any,
    headers?: Record<string, string>,
  ) {
    const url = `${this.services[service]}/${path}`;
    this.logger.log(`Forwarding ${method.toUpperCase()} → ${url}`);

    try {
      const response = await lastValueFrom(
        this.httpService.request({
          url,
          method,
          data: body,
          headers,
          timeout: 5000,
        }),
      );

      return response.data;
    } catch (err: any) {
      this.logger.error(
        `Error proxying to ${service}: ${err.message}`,
        err.stack,
      );

      throw new HttpException(
        err.response?.data || 'Service unavailable',
        err.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
