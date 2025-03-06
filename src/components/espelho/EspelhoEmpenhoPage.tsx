
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useEspelhoEmpenho } from './useEspelhoEmpenho';
import { PageHeader } from './PageHeader';
import { SelectedItemsBar } from './SelectedItemsBar';
import { EspelhoTabs } from './tabs/EspelhoTabs';
import { EspelhoDialogs } from './dialogs/EspelhoDialogs';
import { EspelhoEmpenhoPageProps } from './types';

export const EspelhoEmpenhoPage: React.FC<EspelhoEmpenhoPageProps> = () => {
  const espelhoEmpenhoState = useEspelhoEmpenho();
  
  return (
    <Layout title="Espelho e Empenho" description="Gerenciamento de espelhos e empenhos de campanhas publicitárias">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <PageHeader 
            searchTerm={espelhoEmpenhoState.searchTerm}
            setSearchTerm={espelhoEmpenhoState.setSearchTerm}
            setIsFilterDialogOpen={espelhoEmpenhoState.setIsFilterDialogOpen}
          />
        </CardHeader>
        <CardContent>
          <SelectedItemsBar 
            count={espelhoEmpenhoState.getSelectedItemCount()}
            onClear={() => espelhoEmpenhoState.setSelectedItems([])}
            onBulkAction={() => espelhoEmpenhoState.setIsBulkActionDialogOpen(true)}
          />
          
          <EspelhoTabs espelhoEmpenhoState={espelhoEmpenhoState} />
        </CardContent>
      </Card>
      
      <EspelhoDialogs espelhoEmpenhoState={espelhoEmpenhoState} />
    </Layout>
  );
};
