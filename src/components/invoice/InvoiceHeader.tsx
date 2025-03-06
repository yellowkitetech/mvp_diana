
import { Button } from '@/components/ui/button';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import InvoiceFilterPanel from './InvoiceFilters';
import { InvoiceFilters } from '@/lib/types/invoice';

interface InvoiceHeaderProps {
  filters: InvoiceFilters;
  onFilterChange: (filters: InvoiceFilters) => void;
  suppliers: string[];
  campaigns: string[];
  onNewInvoice: () => void;
}

const InvoiceHeader = ({
  filters,
  onFilterChange,
  suppliers,
  campaigns,
  onNewInvoice
}: InvoiceHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle>Faturas</CardTitle>
        <CardDescription>Gerencie faturas, notas fiscais e pagamentos</CardDescription>
      </div>
      <div className="flex space-x-2">
        <InvoiceFilterPanel
          filters={filters}
          onFilterChange={onFilterChange}
          suppliers={suppliers}
          campaigns={campaigns}
        />
        
        <Button onClick={onNewInvoice}>
          <Plus className="mr-2 h-4 w-4" /> Nova Fatura
        </Button>
      </div>
    </div>
  );
};

export default InvoiceHeader;
