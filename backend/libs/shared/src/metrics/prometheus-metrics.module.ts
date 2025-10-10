import { Module, Global } from '@nestjs/common';
import { PrometheusModule, makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { MetricsService } from '../services/metrics.service';

/**
 * Shared Prometheus Metrics Module
 * Centralized configuration for all Prometheus metrics across services
 * 
 * This is a @Global module that provides:
 * - Prometheus metrics registration (Counter, Histogram)
 * - MetricsService for collecting metrics
 * 
 * Each service should register APP_INTERCEPTOR and APP_FILTER in their own module
 */
@Global()
@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [
    // HTTP Requests Counter
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path', 'status_code', 'service'],
    }),
    // HTTP Errors Counter
    makeCounterProvider({
      name: 'http_errors_total',
      help: 'Total number of HTTP errors',
      labelNames: ['method', 'path', 'status_code', 'service'],
    }),
    // HTTP Request Duration Histogram
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'path', 'service'],
      buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
    }),
    MetricsService,
  ],
  exports: [PrometheusModule, MetricsService],
})
export class PrometheusMetricsModule {}

