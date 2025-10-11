import type { Technology } from '@/constants/tech-stack';
import { Card, gradientGlow, sectionTitle, cardTitle, gradients } from '@/components/ui';

interface TechSectionProps {
  title: string;
  items: Technology[];
}

type SectionKey = keyof typeof gradients;

/**
 * TechSection Component
 * Displays a section of technologies with their descriptions
 * Used to showcase the tech stack organized by category
 */
export function TechSection({ title, items }: TechSectionProps) {
  const key = title.toLowerCase() as SectionKey;
  const gradient = gradients[key] || gradients.frontend;

  return (
    <div className="group">
      <h2 className="inline-flex items-center gap-2 mb-6">
        <span className={sectionTitle(gradient)}>{title}</span>
        <span className="text-sm font-normal text-gray-400">({items.length})</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((tech, index) => (
          <div
            key={tech.name}
            className="group/card relative"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className={gradientGlow(gradient)} />
            
            <Card variant="default" padding="md" hover="lift" className="backdrop-blur-sm">
              <h3 className={cardTitle}>{tech.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {tech.description}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

