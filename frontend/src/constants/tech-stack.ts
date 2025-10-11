/**
 * Technology stack used in the project
 * Organized by application layer
 */

export interface Technology {
  name: string;
  description: string;
}

export interface TechStack {
  frontend: Technology[];
  backend: Technology[];
  database: Technology[];
  infrastructure: Technology[];
}

export const TECH_STACK: TechStack = {
  frontend: [
    { name: 'Next.js 15', description: 'React framework with App Router' },
    { name: 'React 19', description: 'UI library with latest features' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS 4', description: 'Utility-first CSS framework' },
  ],
  backend: [
    { name: 'NestJS', description: 'Progressive Node.js framework' },
    { name: 'API Gateway', description: 'Unified entry point for microservices' },
    { name: 'Microservices', description: 'User & Inventory services' },
    { name: 'Swagger', description: 'Auto-generated API documentation' },
    { name: 'Guards', description: 'Rate limiting & request throttling' },
    { name: 'Interceptors', description: 'Request metrics & monitoring' },
    { name: 'Exception Filters', description: 'Global error handling & metrics' },
  ],
  database: [
    { name: 'PostgreSQL 16', description: 'Relational database' },
    { name: 'Prisma', description: 'Next-generation ORM' },
  ],
  infrastructure: [
    { name: 'Docker', description: 'Containerization' },
    { name: 'Docker Compose', description: 'Multi-container orchestration' },
    { name: 'Prometheus', description: 'Metrics collection' },
    { name: 'Grafana', description: 'Monitoring dashboards' },
  ],
};

