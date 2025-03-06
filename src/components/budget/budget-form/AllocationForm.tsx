
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Campaign, ServiceType, Supplier } from '@/lib/types';

interface AllocationFormProps {
  currentAllocation: {
    supplierId: string;
    serviceType: ServiceType;
    amount: string;
    campaignId: string;
  };
  setCurrentAllocation: (allocation: any) => void;
  suppliers: Supplier[];
  campaigns: Campaign[];
  onAddAllocation: () => void;
}

const AllocationForm = ({
  currentAllocation,
  setCurrentAllocation,
  suppliers,
  campaigns,
  onAddAllocation
}: AllocationFormProps) => {
  const serviceTypes = [
    { value: 'criacao', label: 'Criação' },
    { value: 'veiculacao', label: 'Veiculação' },
    { value: 'producao', label: 'Produção' }
  ];

  const getSuppliersByServiceType = (type: ServiceType) => {
    return suppliers.filter(supplier => 
      supplier.serviceTypes.includes(type) && supplier.active
    );
  };

  return (
    <Card className="p-4 border border-dashed">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="serviceType">Tipo de Serviço</Label>
          <Select 
            value={currentAllocation.serviceType} 
            onValueChange={(value) => setCurrentAllocation({
              ...currentAllocation,
              serviceType: value as ServiceType,
              supplierId: '' // Reset supplier when type changes
            })}
          >
            <SelectTrigger id="serviceType">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="supplier">Fornecedor</Label>
          <Select 
            value={currentAllocation.supplierId} 
            onValueChange={(value) => setCurrentAllocation({
              ...currentAllocation,
              supplierId: value
            })}
            disabled={!currentAllocation.serviceType}
          >
            <SelectTrigger id="supplier">
              <SelectValue placeholder="Selecione o fornecedor" />
            </SelectTrigger>
            <SelectContent>
              {currentAllocation.serviceType && getSuppliersByServiceType(currentAllocation.serviceType).map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Valor (R$)</Label>
          <Input
            id="amount"
            type="number"
            value={currentAllocation.amount}
            onChange={(e) => setCurrentAllocation({
              ...currentAllocation,
              amount: e.target.value
            })}
            min="0"
            step="0.01"
            placeholder="0,00"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="campaign">Campanha (opcional)</Label>
          <Select 
            value={currentAllocation.campaignId} 
            onValueChange={(value) => setCurrentAllocation({
              ...currentAllocation,
              campaignId: value
            })}
          >
            <SelectTrigger id="campaign">
              <SelectValue placeholder="Selecione a campanha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Nenhuma campanha</SelectItem>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={onAddAllocation}>
          <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Alocação
        </Button>
      </div>
    </Card>
  );
};

export default AllocationForm;
