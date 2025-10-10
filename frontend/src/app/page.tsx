export default function Home() {
  const techStack = {
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
      { name: 'Prometheus', description: 'Metrics collection - localhost:9090' },
      { name: 'Grafana', description: 'Monitoring dashboards - localhost:3001' },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TestShop
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Modern E-Commerce Platform with Microservices Architecture
        </p>
      </div>

      <div className="grid gap-12">
        <TechSection title="Frontend" items={techStack.frontend} />
        <TechSection title="Backend" items={techStack.backend} />
        <TechSection title="Database" items={techStack.database} />
        <TechSection title="Infrastructure" items={techStack.infrastructure} />
      </div>

      <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Architecture</h2>
        <div className="font-mono text-sm text-gray-700 dark:text-gray-300">
          <p>Frontend (Next.js) → API Gateway (4000)</p>
          <p className="ml-8">├── User Service (5000)</p>
          <p className="ml-8">└── Inventory Service (5001)</p>
          <p className="ml-16">└── PostgreSQL Database (5432)</p>
          <p className="mt-4">Monitoring Stack:</p>
          <p className="ml-4">├── Prometheus (9090) ← scrapes metrics from all services</p>
          <p className="ml-4">└── Grafana (3001) ← visualizes metrics from Prometheus</p>
        </div>
      </div>
    </div>
  );
}

function TechSection({
  title,
  items,
}: {
  title: string;
  items: { name: string; description: string }[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((tech) => (
          <div
            key={tech.name}
            className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <h3 className="font-semibold text-lg mb-2">{tech.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tech.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
