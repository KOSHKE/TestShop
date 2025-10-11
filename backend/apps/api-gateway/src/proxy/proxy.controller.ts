import {
  All,
  Controller,
  Req,
  Res,
  Param,
  Body,
  Headers,
} from '@nestjs/common';
import { ProxyService } from './proxy.service';
import type { Request, Response } from 'express';

@Controller('api')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All(':service/*')
  async handle(
    @Param('service') service: 'users' | 'products',
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    const path = req.params[0];
    const method = req.method.toLowerCase();

    try {
      const data = await this.proxyService.forwardRequest(
        service,
        path,
        method,
        body,
        headers,
      );

      return res.json(data);
    } catch (err: any) {
      return res
        .status(err.getStatus ? err.getStatus() : 502)
        .json(err.response || { message: 'Proxy error' });
    }
  }
}
