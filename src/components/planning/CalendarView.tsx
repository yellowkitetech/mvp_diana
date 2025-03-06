
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Calendar as CalendarIcon, List } from 'lucide-react';
import EventForm from '@/components/planning/EventForm';
import { formatCurrency } from '@/lib/utils';

interface CalendarViewProps {
  events: any[];
  showEventForm: boolean;
  setShowEventForm: (show: boolean) => void;
  handleAddEvent: (newEvent: any) => void;
}

const CalendarView = ({ 
  events, 
  showEventForm, 
  setShowEventForm, 
  handleAddEvent 
}: CalendarViewProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activePlanningTab, setActivePlanningTab] = useState<string>('calendar');

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Cronograma</CardTitle>
          <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <EventForm onSubmit={handleAddEvent} onCancel={() => setShowEventForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>Visualize e gerencie os eventos planejados</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar" value={activePlanningTab} onValueChange={setActivePlanningTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="calendar">
              <CalendarIcon className="h-4 w-4 mr-2" /> Calendário
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" /> Lista
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">Campanha: {event.campaign}</p>
                    <p className="text-sm text-muted-foreground">Orçamento: {formatCurrency(event.budget)}</p>
                    <p className="text-sm text-muted-foreground">Período: {event.startDate} a {event.endDate}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.status === 'Em andamento' ? 'bg-blue-100 text-blue-800' : 
                      event.status === 'Planejado' ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
