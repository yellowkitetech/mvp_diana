
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BudgetSummaryCards from './BudgetSummaryCards';
import MonthlyDistributionTab from './MonthlyDistributionTab';
import ServiceTypeDistributionTab from './ServiceTypeDistributionTab';
import SupplierDistributionTab from './SupplierDistributionTab';
import CampaignDistributionTab from './CampaignDistributionTab';

const BudgetSummary = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  
  return (
    <div className="space-y-6">
      <BudgetSummaryCards />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monthly">Por Mês</TabsTrigger>
          <TabsTrigger value="serviceType">Por Tipo de Serviço</TabsTrigger>
          <TabsTrigger value="supplier">Por Fornecedor</TabsTrigger>
          <TabsTrigger value="campaign">Por Campanha</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="pt-4">
          <MonthlyDistributionTab />
        </TabsContent>
        
        <TabsContent value="serviceType" className="pt-4">
          <ServiceTypeDistributionTab />
        </TabsContent>
        
        <TabsContent value="supplier" className="pt-4">
          <SupplierDistributionTab />
        </TabsContent>
        
        <TabsContent value="campaign" className="pt-4">
          <CampaignDistributionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetSummary;
