
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { BudgetAllocation, Campaign, Supplier } from '@/lib/types';

interface AllocationsTableProps {
  allocations: BudgetAllocation[];
  suppliers: Supplier[];
  campaigns: Campaign[];
  onRemoveAllocation: (id: string) => void;
  totalAllocated: number;
}

const AllocationsTable = ({
  allocations,
  suppliers,
  campaigns,
  onRemoveAllocation,
  totalAllocated
}: AllocationsTableProps) => {
  const serviceTypes = [
    { value: 'criacao', label: 'Criação' },
    { value: 'veiculacao', label: 'Veiculação' },
    { value: 'producao', label: 'Produção' }
  ];

  const getSupplierName = (id: string) => {
    const supplier = suppliers.find(s => s.id === id);
    return supplier ? supplier.name : 'Fornecedor não encontrado';
  };
  
  const getCampaignTitle = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    return campaign ? campaign.title : 'Campanha não encontrada';
  };

  if (allocations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center border rounded-md bg-muted/30">
        <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Nenhuma alocação adicionada</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Adicione alocações de orçamento para fornecedores e campanhas.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo de Serviço</TableHead>
          <TableHead>Fornecedor</TableHead>
          <TableHead>Campanha</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allocations.map((allocation) => (
          <TableRow key={allocation.id}>
            <TableCell>
              {serviceTypes.find(t => t.value === allocation.serviceType)?.label || allocation.serviceType}
            </TableCell>
            <TableCell>{getSupplierName(allocation.supplierId)}</TableCell>
            <TableCell>
              {allocation.campaignId 
                ? getCampaignTitle(allocation.campaignId) 
                : <span className="text-muted-foreground">Nenhuma</span>}
            </TableCell>
            <TableCell className="text-right font-medium">
              {formatCurrency(allocation.amount)}
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRemoveAllocation(allocation.id)}
              >
                Remover
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={3} className="text-right font-medium">
            Total
          </TableCell>
          <TableCell className="text-right font-bold">
            {formatCurrency(totalAllocated)}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AllocationsTable;
