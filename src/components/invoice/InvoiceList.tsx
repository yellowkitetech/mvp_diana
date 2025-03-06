
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import InvoiceBulkActions from './InvoiceBulkActions';
import InvoiceTable from './InvoiceTable';
import InvoiceHeader from './InvoiceHeader';
import { InvoiceFilters, InvoiceWithMeta } from '@/lib/types/invoice';

interface InvoiceListProps {
  invoices: InvoiceWithMeta[];
  selectedItems: string[];
  filters: InvoiceFilters;
  onFilterChange: (filters: InvoiceFilters) => void;
  suppliers: string[];
  campaigns: string[];
  onSelectItem: (id: string, isChecked: boolean) => void;
  onSelectAll: (isChecked: boolean) => void;
  onViewInvoice: (invoice: InvoiceWithMeta) => void;
  onNewInvoice: () => void;
  onClearSelection: () => void;
  onBulkStatusChange: (status: 'pending' | 'verified' | 'paid' | 'cancelled') => void;
  onEditInvoice?: (invoice: InvoiceWithMeta) => void;
}

const InvoiceList = ({
  invoices,
  selectedItems,
  filters,
  onFilterChange,
  suppliers,
  campaigns,
  onSelectItem,
  onSelectAll,
  onViewInvoice,
  onNewInvoice,
  onClearSelection,
  onBulkStatusChange,
  onEditInvoice
}: InvoiceListProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <InvoiceHeader
          filters={filters}
          onFilterChange={onFilterChange}
          suppliers={suppliers}
          campaigns={campaigns}
          onNewInvoice={onNewInvoice}
        />
      </CardHeader>
      <CardContent>
        {/* Bulk Actions */}
        <InvoiceBulkActions 
          selectedItems={selectedItems}
          onClearSelection={onClearSelection}
          onBulkStatusChange={onBulkStatusChange}
        />
        
        {/* Invoice Table */}
        <InvoiceTable 
          invoices={invoices}
          selectedItems={selectedItems}
          onSelectItem={onSelectItem}
          onSelectAll={onSelectAll}
          onViewInvoice={onViewInvoice}
          onEditInvoice={onEditInvoice}
        />
      </CardContent>
    </Card>
  );
};

export default InvoiceList;
