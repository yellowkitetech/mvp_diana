
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckSquare, Bell, Wallet, Receipt } from 'lucide-react';
import ProcessList from '../ProcessList';
import CommunicationList from '../CommunicationList';
import { Process } from '@/lib/types';
import MetricCard from './MetricCard';

interface AgencyDashboardProps {
  selectedProcess: Process | null;
  onProcessSelect: (process: Process) => void;
  showNewCommunicationForm: boolean;
  setShowNewCommunicationForm: (show: boolean) => void;
  userId?: string;
}

const AgencyDashboard = ({ 
  selectedProcess, 
  onProcessSelect,
  showNewCommunicationForm,
  setShowNewCommunicationForm,
  userId
}: AgencyDashboardProps) => {
  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="PIs Faltando Aprovação"
          value="3"
          description="aguardando aprovação"
          icon={CheckSquare}
        />
        <MetricCard
          title="PPs Faltando Aprovação"
          value="2"
          description="aguardando ação"
          icon={Bell}
        />
        <MetricCard
          title="Valor por Campanha"
          value="R$ 85.000"
          description="Vacinação 2023"
          icon={Wallet}
        />
        <MetricCard
          title="Criação Faltando Aprovação"
          value="4"
          description="peças pendentes"
          icon={Receipt}
        />
      </div>

      <Tabs defaultValue="processos" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-3 bg-diana-lightGray p-1">
          <TabsTrigger value="processos">Meus Processos</TabsTrigger>
          <TabsTrigger value="comunicacoes">Comunicações</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="processos" className="mt-4 space-y-4">
          <ProcessList onSelect={onProcessSelect} selectedAgencyId={userId} />
        </TabsContent>
        
        <TabsContent value="comunicacoes" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProcessList onSelect={onProcessSelect} selectedAgencyId={userId} />
            <CommunicationList selectedProcess={selectedProcess || undefined} />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowNewCommunicationForm(true)}
              className="px-4 py-2 bg-diana-blue text-white rounded-lg hover:bg-diana-darkBlue transition-colors"
            >
              Nova Comunicação
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="notificacoes" className="mt-4 space-y-4">
          <Card className="border border-diana-gray bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-diana-darkBlue">
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64 overflow-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-diana-lightBlue/10 p-2 rounded-full">
                    <CheckSquare className="h-4 w-4 text-diana-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">PI aprovada</div>
                    <div className="text-xs text-diana-darkGray">Campanha Nacional de Vacinação</div>
                    <div className="text-xs text-diana-darkGray mt-1">há 1 dia</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-diana-lightBlue/10 p-2 rounded-full">
                    <Bell className="h-4 w-4 text-diana-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Nova mensagem da SECOM</div>
                    <div className="text-xs text-diana-darkGray">Sobre: Campanha de Conscientização</div>
                    <div className="text-xs text-diana-darkGray mt-1">há 2 dias</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-diana-lightBlue/10 p-2 rounded-full">
                    <Receipt className="h-4 w-4 text-diana-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Pagamento confirmado</div>
                    <div className="text-xs text-diana-darkGray">Gráfica Rápida - R$ 7.500,00</div>
                    <div className="text-xs text-diana-darkGray mt-1">há 4 dias</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgencyDashboard;
