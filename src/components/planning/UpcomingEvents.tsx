
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface UpcomingEventsProps {
  events: any[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Eventos</CardTitle>
        <CardDescription>Eventos agendados para os próximos 30 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-muted-foreground">Campanha: {event.campaign}</p>
              <p className="text-sm text-muted-foreground">Período: {event.startDate} a {event.endDate}</p>
              <p className="text-sm text-muted-foreground">Orçamento: {formatCurrency(event.budget)}</p>
              <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
