
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, CheckSquare, Bell, Building } from 'lucide-react';
import ProcessList from '../ProcessList';
import CommunicationList from '../CommunicationList';
import { Agency, Process } from '@/lib/types';
import MetricCard from './MetricCard';
import CampaignChart from './charts/CampaignChart';
import SupplierChart from './charts/SupplierChart';
import ServiceTypeChart from './charts/ServiceTypeChart';
import SubtypeServiceChart from './charts/SubtypeServiceChart';

interface AnalystDashboardProps {
  selectedAgency: Agency | null;
  selectedProcess: Process | null;
  onAgencySelect: (agency: Agency) => void;
  onProcessSelect: (process: Process) => void;
  showNewCommunicationForm: boolean;
  setShowNewCommunicationForm: (show: boolean) => void;
}

const AnalystDashboard = ({
  selectedAgency,
  selectedProcess,
  onAgencySelect,
  onProcessSelect,
  showNewCommunicationForm,
  setShowNewCommunicationForm,
}: AnalystDashboardProps) => {
  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Espelhos em Elaboração"
          value="5"
          description="aguardando conclusão"
          icon={FileSpreadsheet}
        />
        <MetricCard
          title="PIs Faltando Aprovação"
          value="5"
          description="aguardando aprovação"
          icon={CheckSquare}
        />
        <MetricCard
          title="PPs Faltando Aprovação"
          value="4"
          description="aguardando ação"
          icon={Bell}
        />
        <MetricCard
          title="Empenhos Recentes"
          value="8"
          description="últimos 30 dias"
          icon={Building}
        />
      </div>

      <Tabs defaultValue="dashboard" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2 bg-diana-lightGray p-1">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="comunicacoes">Comunicações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CampaignChart />
            <SupplierChart />
            <ServiceTypeChart />
            <SubtypeServiceChart />
          </div>
        </TabsContent>
        
        <TabsContent value="comunicacoes" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProcessList 
              onSelect={onProcessSelect} 
              selectedAgencyId={selectedAgency?.id}
            />
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
      </Tabs>
    </div>
  );
};

export default AnalystDashboard;
