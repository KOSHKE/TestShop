import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { MetricsService } from '../services/metrics.service';

/**
 * Metrics Interceptor for tracking API requests
 * Measures request duration and counts by method, path, and status code
 */
@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse<Response>();
          const duration = Date.now() - startTime;

          // Record request metrics
          this.metricsService.recordRequestDuration({
            method: request.method,
            path: request.url,
            duration,
            service: process.env.SERVICE_NAME || 'unknown',
          });

          this.metricsService.incrementRequestCounter({
            method: request.method,
            path: request.url,
            statusCode: response.statusCode,
            service: process.env.SERVICE_NAME || 'unknown',
          });
        },
        error: () => {
          // Errors are handled by GlobalExceptionFilter
          // No logging here to avoid cluttering logs
        },
      }),
    );
  }
}

