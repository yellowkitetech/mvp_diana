
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, FileCheck, FileClock, Paintbrush } from 'lucide-react';
import { Agency, Process } from '@/lib/types';
import MetricCard from './MetricCard';
import CampaignChart from './charts/CampaignChart';
import SupplierChart from './charts/SupplierChart';
import ServiceTypeChart from './charts/ServiceTypeChart';
import SubtypeServiceChart from './charts/SubtypeServiceChart';

interface AdminDashboardProps {
  selectedAgency: Agency | null;
  selectedProcess: Process | null;
  onAgencySelect: (agency: Agency) => void;
  onProcessSelect: (process: Process) => void;
}

const AdminDashboard = ({
  selectedAgency,
  selectedProcess,
  onAgencySelect,
  onProcessSelect,
}: AdminDashboardProps) => {
  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Espelhos em Elaboração"
          value="6"
          description="pendentes de conclusão"
          icon={FileSpreadsheet}
        />
        <MetricCard
          title="PIs Faltando Aprovação"
          value="8"
          description="aguardando aprovação"
          icon={FileCheck}
        />
        <MetricCard
          title="PPs Faltando Aprovação"
          value="5"
          description="aguardando análise"
          icon={FileClock}
        />
        <MetricCard
          title="Criação Faltando Aprovação"
          value="7"
          description="peças criativas"
          icon={Paintbrush}
        />
      </div>

      <Tabs defaultValue="dashboard" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2 bg-diana-lightGray p-1">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CampaignChart />
            <SupplierChart />
            <ServiceTypeChart />
            <SubtypeServiceChart />
          </div>
        </TabsContent>
        
        <TabsContent value="financeiro" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <MetricCard
                title="Orçamento Total"
                value="R$ 3.500.000"
                description="exercício atual"
                className="bg-diana-lightBlue/5"
              />
              <MetricCard
                title="Executado"
                value="R$ 2.100.000"
                description="60% do total"
                className="bg-diana-lightBlue/5"
              />
            </div>
            <div className="space-y-4">
              <MetricCard
                title="Disponível"
                value="R$ 1.400.000"
                description="40% do total"
                className="bg-diana-lightBlue/5"
              />
              <MetricCard
                title="Maior Campanha"
                value="R$ 630.000"
                description="Festival Cultural"
                className="bg-diana-lightBlue/5"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
