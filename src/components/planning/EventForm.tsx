
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface EventFormProps {
  onSubmit: (eventData: any) => void;
  onCancel: () => void;
}

const EventForm = ({ onSubmit, onCancel }: EventFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [campaign, setCampaign] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !campaign || !budget || !startDate || !endDate) {
      toast({
        title: "Formulário incompleto",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      toast({
        title: "Orçamento inválido",
        description: "O valor do orçamento deve ser maior que zero.",
        variant: "destructive"
      });
      return;
    }

    if (endDate && startDate && endDate < startDate) {
      toast({
        title: "Datas inválidas",
        description: "A data de término deve ser posterior à data de início.",
        variant: "destructive"
      });
      return;
    }

    const newEvent = {
      title,
      campaign,
      budget: budgetValue,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      description,
      date: format(startDate, 'yyyy-MM-dd')
    };

    onSubmit(newEvent);
    
    toast({
      title: "Evento adicionado",
      description: "O evento foi adicionado com sucesso ao calendário."
    });
  };

  return (
    <Card className="border-none shadow-none">
      <form onSubmit={handleSubmit}>
        <CardHeader className="px-0 pt-0">
          <CardTitle>Novo Evento</CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nome do Evento*</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o nome do evento"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="campaign">Campanha*</Label>
            <Input
              id="campaign"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="Associar a uma campanha"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget">Orçamento (R$)*</Label>
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min="0"
              step="0.01"
              placeholder="0,00"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Data de Término*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes do evento"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="px-0 flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar Evento</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EventForm;
