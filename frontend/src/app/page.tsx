import { TECH_STACK } from '@/constants/tech-stack';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TechSection } from '@/components/shared/TechSection';

/**
 * Home Page
 * Landing page displaying all services, endpoints, and technology stack
 */
export default function Home() {
  return (
    <div className="relative">
      {/* Gradient Background - subtle and professional */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-slate-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                ⚡ Microservices Architecture
              </span>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
            TestShop
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modern E-Commerce Platform with{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Enterprise-Ready
            </span>{' '}
            Infrastructure
          </p>
        </div>

        {/* Services & Endpoints */}
        <ServicesSection />

        {/* Technology Stack */}
        <div className="grid gap-12">
          <TechSection title="Frontend" items={TECH_STACK.frontend} />
          <TechSection title="Backend" items={TECH_STACK.backend} />
          <TechSection title="Database" items={TECH_STACK.database} />
          <TechSection title="Infrastructure" items={TECH_STACK.infrastructure} />
        </div>
      </div>
    </div>
  );
}
