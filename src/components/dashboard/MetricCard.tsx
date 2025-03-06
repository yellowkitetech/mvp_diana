
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

const MetricCard = ({ title, value, description, icon: Icon, className = '' }: MetricCardProps) => {
  return (
    <Card className={`card-hover border border-diana-gray bg-white ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center text-diana-darkBlue">
          {Icon && <Icon className="h-4 w-4 mr-2 text-diana-blue" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-diana-blue">{value}</div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
