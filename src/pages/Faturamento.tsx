import { useState } from 'react';
import Layout from '@/components/Layout';
import { useToast } from '@/components/ui/use-toast';
import InvoiceDetail from '@/components/invoice/InvoiceDetail';
import InvoiceForm from '@/components/invoice/InvoiceForm';
import InvoiceList from '@/components/invoice/InvoiceList';
import { InvoiceFilters, InvoiceWithMeta } from '@/lib/types/invoice';
import { getStatusName } from '@/lib/utils/invoice-utils';

// Mock data for invoices
const mockInvoices: InvoiceWithMeta[] = [
  {
    id: '1',
    campaignRequestId: 'cr1',
    number: 'FT-2023-001',
    supplierId: 's1',
    supplierName: 'Gráfica XYZ',
    campaignId: 'c1',
    campaignName: 'Campanha de Vacinação',
    issueDate: '2023-06-10',
    dueDate: '2023-07-10',
    totalValue: 35000,
    status: 'paid',
    attachments: [],
    createdAt: '2023-06-10',
    updatedAt: '2023-06-10',
    seiNumber: '12345.678910/2023-01',
    commitmentNumber: 'NE2023001234'
  },
  {
    id: '2',
    campaignRequestId: 'cr2',
    number: 'FT-2023-002',
    supplierId: 's2',
    supplierName: 'Jornal A Tarde',
    campaignId: 'c2',
    campaignName: 'Programa Educacional',
    issueDate: '2023-07-05',
    dueDate: '2023-08-05',
    totalValue: 18000,
    status: 'pending',
    attachments: [],
    createdAt: '2023-07-05',
    updatedAt: '2023-07-05',
    seiNumber: '12345.678910/2023-02',
    commitmentNumber: 'NE2023001235'
  },
  {
    id: '3',
    campaignRequestId: 'cr3',
    number: 'FT-2023-003',
    supplierId: 's3',
    supplierName: 'Produtora ABC',
    campaignId: 'c3',
    campaignName: 'Festival Cultural',
    issueDate: '2023-07-20',
    dueDate: '2023-08-20',
    totalValue: 60000,
    status: 'verified',
    attachments: [],
    createdAt: '2023-07-20',
    updatedAt: '2023-07-20',
    seiNumber: '12345.678910/2023-03',
    commitmentNumber: 'NE2023001236'
  },
  {
    id: '4',
    campaignRequestId: 'cr4',
    number: 'FT-2023-004',
    supplierId: 's1',
    supplierName: 'Gráfica XYZ',
    campaignId: 'c4',
    campaignName: 'Campanha de Trânsito',
    issueDate: '2023-08-10',
    dueDate: '2023-09-10',
    totalValue: 22000,
    status: 'cancelled',
    attachments: [],
    createdAt: '2023-08-10',
    updatedAt: '2023-08-10',
    seiNumber: '12345.678910/2023-04',
    commitmentNumber: 'NE2023001237'
  },
  {
    id: '5',
    campaignRequestId: 'cr5',
    number: 'FT-2023-005',
    supplierId: 's4',
    supplierName: 'Rádio FM',
    campaignId: 'c1',
    campaignName: 'Campanha de Vacinação',
    issueDate: '2023-08-15',
    dueDate: '2023-09-15',
    totalValue: 12000,
    status: 'pending',
    attachments: [],
    createdAt: '2023-08-15',
    updatedAt: '2023-08-15',
    seiNumber: '12345.678910/2023-05',
    commitmentNumber: 'NE2023001238'
  }
];

const FaturamentoPage = () => {
  const { toast } = useToast();
  
  // Filter states
  const [filters, setFilters] = useState<InvoiceFilters>({
    searchTerm: '',
    status: 'all',
    supplier: 'all',
    campaign: 'all',
    minValue: '',
    maxValue: ''
  });
  
  // Selection states
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Detail view state
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceWithMeta | null>(null);
  
  // Form state for creating/editing
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceWithMeta | undefined>(undefined);
  
  // Filter invoices based on the current filters
  const filteredInvoices = mockInvoices.filter(invoice => {
    // Text search filter
    if (filters.searchTerm && 
        !invoice.number.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !invoice.supplierName.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !invoice.campaignName.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && invoice.status !== filters.status) return false;
    
    // Supplier filter
    if (filters.supplier !== 'all' && invoice.supplierName !== filters.supplier) return false;
    
    // Campaign filter
    if (filters.campaign !== 'all' && invoice.campaignName !== filters.campaign) return false;
    
    // Value range filters
    if (filters.minValue && invoice.totalValue < parseInt(filters.minValue)) return false;
    if (filters.maxValue && invoice.totalValue > parseInt(filters.maxValue)) return false;
    
    return true;
  });
  
  // Get unique suppliers and campaigns for filter dropdowns
  const suppliers = [...new Set(mockInvoices.map(invoice => invoice.supplierName))];
  const campaigns = [...new Set(mockInvoices.map(invoice => invoice.campaignName))];
  
  // Handler for selecting/deselecting all invoices
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems(filteredInvoices.map(invoice => invoice.id));
    } else {
      setSelectedItems([]);
    }
  };
  
  // Handler for selecting/deselecting a single invoice
  const handleSelectItem = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };
  
  // Handler for bulk status change
  const handleBulkStatusChange = (newStatus: 'pending' | 'verified' | 'paid' | 'cancelled') => {
    if (selectedItems.length === 0) {
      toast({
        title: "Nenhum item selecionado",
        description: "Selecione pelo menos um item para realizar esta ação.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would update the invoices in the database
    toast({
      title: "Status atualizado em massa",
      description: `${selectedItems.length} fatura(s) atualizada(s) para "${getStatusName(newStatus)}".`,
    });
    
    setSelectedItems([]);
  };
  
  // Handler for saving invoice changes
  const handleSaveInvoice = (updatedInvoice: InvoiceWithMeta) => {
    // In a real app, this would update the invoice in the database
    toast({
      title: "Fatura atualizada",
      description: `A fatura ${updatedInvoice.number} foi atualizada com sucesso.`,
    });
    
    // Close the detail view
    setSelectedInvoice(null);
  };
  
  // Handler for creating a new invoice
  const handleCreateInvoice = (newInvoice: InvoiceWithMeta) => {
    // In a real app, this would save to the database
    toast({
      title: "Fatura criada",
      description: `A fatura ${newInvoice.number} foi criada com sucesso.`,
    });
    
    // Close the form
    setShowForm(false);
    setEditingInvoice(undefined);
  };
  
  // Handler for opening the form to edit an invoice
  const handleEditInvoice = (invoice: InvoiceWithMeta) => {
    setEditingInvoice(invoice);
    setShowForm(true);
    setSelectedInvoice(null);
  };
  
  // If a form is open, show it
  if (showForm) {
    return (
      <Layout title="Faturamento" description="Gerenciamento de faturas e pagamentos">
        <InvoiceForm
          invoice={editingInvoice}
          onSubmit={handleCreateInvoice}
          onCancel={() => {
            setShowForm(false);
            setEditingInvoice(undefined);
          }}
          suppliers={mockInvoices.map(invoice => ({ id: invoice.supplierId, name: invoice.supplierName }))}
          campaigns={mockInvoices.map(invoice => ({ id: invoice.campaignId || '', name: invoice.campaignName }))}
        />
      </Layout>
    );
  }
  
  // If an invoice is selected, show its details
  if (selectedInvoice) {
    return (
      <Layout title="Faturamento" description="Gerenciamento de faturas e pagamentos">
        <InvoiceDetail 
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onSave={handleSaveInvoice}
        />
      </Layout>
    );
  }
  
  return (
    <Layout title="Faturamento" description="Gerenciamento de faturas e pagamentos">
      <InvoiceList
        invoices={filteredInvoices}
        selectedItems={selectedItems}
        filters={filters}
        onFilterChange={setFilters}
        suppliers={suppliers}
        campaigns={campaigns}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        onViewInvoice={setSelectedInvoice}
        onNewInvoice={() => setShowForm(true)}
        onClearSelection={() => setSelectedItems([])}
        onBulkStatusChange={handleBulkStatusChange}
        onEditInvoice={handleEditInvoice}
      />
    </Layout>
  );
};

export default FaturamentoPage;
