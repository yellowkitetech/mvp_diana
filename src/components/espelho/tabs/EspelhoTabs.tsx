
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, CheckCircle } from 'lucide-react';
import { EspelhoTabContent } from './EspelhoTabContent';
import { EmpenhoTabContent } from './EmpenhoTabContent';

interface EspelhoTabsProps {
  espelhoEmpenhoState: any; // Using any for brevity, should be properly typed
}

export const EspelhoTabs: React.FC<EspelhoTabsProps> = ({ espelhoEmpenhoState }) => {
  return (
    <Tabs defaultValue="espelhos" onValueChange={espelhoEmpenhoState.handleTabChange}>
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="espelhos">
          <FileText className="h-4 w-4 mr-2" /> Espelhos
        </TabsTrigger>
        <TabsTrigger value="empenhos">
          <CheckCircle className="h-4 w-4 mr-2" /> Empenhos
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="espelhos">
        <EspelhoTabContent espelhoEmpenhoState={espelhoEmpenhoState} />
      </TabsContent>
      
      <TabsContent value="empenhos">
        <EmpenhoTabContent espelhoEmpenhoState={espelhoEmpenhoState} />
      </TabsContent>
    </Tabs>
  );
};
