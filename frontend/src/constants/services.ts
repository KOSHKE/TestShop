/**
 * Configuration of all microservices and infrastructure components
 * Single source of truth for service endpoints
 */

export interface Service {
  name: string;
  port: string;
  url: string;
  swagger?: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    name: 'API Gateway',
    port: '4000',
    url: 'http://localhost:4000',
    swagger: 'http://localhost:4000/api',
    description: 'Unified entry point for all microservices',
  },
  {
    name: 'User Service',
    port: '5000',
    url: 'http://localhost:5000',
    description: 'User management and authentication',
  },
  {
    name: 'Inventory Service',
    port: '5001',
    url: 'http://localhost:5001',
    description: 'Product catalog and stock management',
  },
  {
    name: 'Prometheus',
    port: '9090',
    url: 'http://localhost:9090',
    description: 'Metrics collection and monitoring',
  },
  {
    name: 'Grafana',
    port: '3001',
    url: 'http://localhost:3001',
    description: 'Metrics visualization dashboards',
  },
];

