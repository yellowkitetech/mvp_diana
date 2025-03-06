
import { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, LineChart, FileText, BarChart4 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import BudgetPlanningForm from '@/components/budget/BudgetPlanningForm';
import CalendarView from '@/components/planning/CalendarView';
import UpcomingEvents from '@/components/planning/UpcomingEvents';
import BudgetSummary from '@/components/planning/budget-summary';
import CampaignManager from '@/components/campaign/CampaignManager';

interface PlanningTabsProps {
  events: any[];
  showEventForm: boolean;
  setShowEventForm: (show: boolean) => void;
  showBudgetForm: boolean;
  setShowBudgetForm: (show: boolean) => void;
  handleAddEvent: (newEvent: any) => void;
}

const PlanningTabs = ({
  events,
  showEventForm,
  setShowEventForm,
  showBudgetForm,
  setShowBudgetForm,
  handleAddEvent
}: PlanningTabsProps) => {
  return (
    <Tabs defaultValue="calendar">
      <TabsList className="mb-6">
        <TabsTrigger value="calendar">
          <CalendarIcon className="h-4 w-4 mr-2" /> Calendário de Campanhas
        </TabsTrigger>
        <TabsTrigger value="budget">
          <BarChart4 className="h-4 w-4 mr-2" /> Planejamento Orçamentário
        </TabsTrigger>
        <TabsTrigger value="campaigns">
          <FileText className="h-4 w-4 mr-2" /> Campanhas
        </TabsTrigger>
        <TabsTrigger value="reports">
          <LineChart className="h-4 w-4 mr-2" /> Relatórios
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="calendar">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <CalendarView 
              events={events} 
              showEventForm={showEventForm} 
              setShowEventForm={setShowEventForm} 
              handleAddEvent={handleAddEvent} 
            />
          </div>
          
          <div>
            <UpcomingEvents events={events} />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="budget">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Planejamento Orçamentário</CardTitle>
                <CardDescription>Gerencie o orçamento previsto por fornecedor e tipo de mídia</CardDescription>
              </div>
              <Dialog open={showBudgetForm} onOpenChange={setShowBudgetForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Novo Planejamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl">
                  <BudgetPlanningForm onSave={() => setShowBudgetForm(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <BudgetSummary />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="campaigns">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gerenciamento de Campanhas</CardTitle>
                <CardDescription>Cadastre e gerencie campanhas, secretarias e agências vinculadas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CampaignManager />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Relatórios de Planejamento</CardTitle>
            <CardDescription>Visualize relatórios e análises dos planejamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <LineChart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Relatórios em desenvolvimento</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                Os relatórios detalhados de planejamento estão sendo desenvolvidos e estarão disponíveis em breve.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PlanningTabs;
