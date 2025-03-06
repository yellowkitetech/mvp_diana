
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import AgencyRequestForm from '@/components/agency/AgencyRequestForm';
import PlanningTabs from '@/components/planning/PlanningTabs';

const PlanejamentoPage = () => {
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showAgencyRequestForm, setShowAgencyRequestForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  
  // Eventos de exemplo
  const [events, setEvents] = useState([
    { id: 1, title: 'Campanha de Vacinação', date: '2023-09-15', status: 'Em andamento', campaign: 'Saúde Pública', budget: 50000, startDate: '2023-09-01', endDate: '2023-09-30', description: 'Campanha de vacinação contra a gripe' },
    { id: 2, title: 'Ação de Conscientização', date: '2023-09-20', status: 'Planejado', campaign: 'Meio Ambiente', budget: 35000, startDate: '2023-09-15', endDate: '2023-10-15', description: 'Conscientização sobre coleta seletiva' },
    { id: 3, title: 'Evento de Lançamento', date: '2023-09-25', status: 'Pendente aprovação', campaign: 'Cultura', budget: 75000, startDate: '2023-09-20', endDate: '2023-09-27', description: 'Lançamento do programa cultural' },
    { id: 4, title: 'Campanha Educativa', date: '2023-10-05', status: 'Planejado', campaign: 'Educação', budget: 60000, startDate: '2023-10-01', endDate: '2023-10-30', description: 'Campanha sobre a importância da educação' },
  ]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { id: events.length + 1, status: 'Planejado', ...newEvent }]);
    setShowEventForm(false);
  };

  return (
    <Layout title="Planejamento de Campanhas e Orçamento" description="Gerencie o cronograma e planejamento de campanhas publicitárias e orçamentos">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Planejamento</h1>
        <Dialog open={showAgencyRequestForm} onOpenChange={setShowAgencyRequestForm}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Send className="h-4 w-4" /> Enviar Solicitação para Agência
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <AgencyRequestForm onClose={() => setShowAgencyRequestForm(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <PlanningTabs 
        events={events}
        showEventForm={showEventForm}
        setShowEventForm={setShowEventForm}
        showBudgetForm={showBudgetForm}
        setShowBudgetForm={setShowBudgetForm}
        handleAddEvent={handleAddEvent}
      />
    </Layout>
  );
};

export default PlanejamentoPage;
