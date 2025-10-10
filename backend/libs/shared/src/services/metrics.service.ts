import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

/**
 * Metrics service for Prometheus/Grafana integration
 * Tracks HTTP requests, errors, and response times
 */
@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('http_requests_total')
    private readonly requestCounter: Counter<string>,
    @InjectMetric('http_errors_total')
    private readonly errorCounter: Counter<string>,
    @InjectMetric('http_request_duration_seconds')
    private readonly requestDurationHistogram: Histogram<string>,
  ) {}

  /**
   * Increment error counter
   */
  incrementErrorCounter(data: {
    method: string;
    path: string;
    statusCode: number;
    service: string;
  }): void {
    this.errorCounter.inc({
      method: data.method,
      path: data.path,
      status_code: data.statusCode.toString(),
      service: data.service,
    });
  }

  /**
   * Record request duration
   */
  recordRequestDuration(data: {
    method: string;
    path: string;
    duration: number;
    service: string;
  }): void {
    this.requestDurationHistogram.observe(
      {
        method: data.method,
        path: data.path,
        service: data.service,
      },
      data.duration / 1000, // convert to seconds
    );
  }

  /**
   * Increment request counter
   */
  incrementRequestCounter(data: {
    method: string;
    path: string;
    statusCode: number;
    service: string;
  }): void {
    this.requestCounter.inc({
      method: data.method,
      path: data.path,
      status_code: data.statusCode.toString(),
      service: data.service,
    });
  }
}

