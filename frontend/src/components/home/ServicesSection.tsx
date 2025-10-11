import { SERVICES } from '@/constants/services';
import { ServiceCard } from './ServiceCard';
import { Card, iconBadge } from '@/components/ui';

/**
 * ServicesSection Component
 * Displays all available services and their endpoints
 * This is the main navigation hub for accessing different parts of the system
 */
export function ServicesSection() {
  return (
    <div className="mb-16 relative group">
      {/* Subtle Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-slate-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
      
      <Card variant="glass" padding="lg" className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-slate-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-xl">🚀</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Services & Endpoints
          </h2>
        </div>
        <div className="grid gap-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>
      </Card>
    </div>
  );
}

