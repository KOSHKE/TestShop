import type { Service } from '@/constants/services';
import { Card, Badge, Button, gradientGlow, cardTitle } from '@/components/ui';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const gradients = [
  'from-blue-600 to-indigo-600',
  'from-slate-600 to-blue-600',
  'from-slate-600 to-gray-600',
  'from-emerald-600 to-teal-600',
  'from-indigo-600 to-blue-600',
];

const badgeColors = ['blue', 'purple', 'orange', 'green', 'indigo'] as const;

/**
 * ServiceCard Component
 * Displays a single service with its endpoint, port, and description
 * Includes clickable links to the service and Swagger docs (if available)
 */
export function ServiceCard({ service, index }: ServiceCardProps) {
  const gradient = gradients[index % gradients.length];
  const badgeColor = badgeColors[index % badgeColors.length];

  return (
    <div className="group relative">
      <div className={gradientGlow(gradient)} />
      
      <Card variant="gradient" padding="md" hover="lift" className="relative">
        <div className="flex items-center gap-3 mb-3">
          <h3 className={cardTitle}>{service.name}</h3>
          <Badge color={badgeColor}>:{service.port}</Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            icon="🔗"
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {service.url}
          </Button>
          {service.swagger && (
            <Button
              variant="gradient"
              icon="📚"
              href={service.swagger}
              target="_blank"
              rel="noopener noreferrer"
            >
              Swagger Docs
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

