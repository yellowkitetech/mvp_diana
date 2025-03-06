
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InvoiceWithMeta } from '@/lib/types/invoice';

interface InvoiceBasicInfoProps {
  invoice: InvoiceWithMeta;
  isEditing: boolean;
  onChangeField: (field: keyof InvoiceWithMeta, value: any) => void;
}

const InvoiceBasicInfo = ({ invoice, isEditing, onChangeField }: InvoiceBasicInfoProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informações da Fatura</h3>
      
      <div className="space-y-2">
        <Label htmlFor="number">Número da Fatura</Label>
        {isEditing ? (
          <Input 
            id="number"
            value={invoice.number}
            onChange={(e) => onChangeField('number', e.target.value)}
          />
        ) : (
          <p className="text-sm font-medium">{invoice.number}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="supplier">Fornecedor</Label>
        {isEditing ? (
          <Input 
            id="supplier"
            value={invoice.supplierName}
            onChange={(e) => onChangeField('supplierName', e.target.value)}
          />
        ) : (
          <p className="text-sm font-medium">{invoice.supplierName}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="campaign">Campanha</Label>
        {isEditing ? (
          <Input 
            id="campaign"
            value={invoice.campaignName}
            onChange={(e) => onChangeField('campaignName', e.target.value)}
          />
        ) : (
          <p className="text-sm font-medium">{invoice.campaignName}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="totalValue">Valor Total</Label>
        {isEditing ? (
          <Input 
            id="totalValue"
            type="number"
            value={invoice.totalValue}
            onChange={(e) => onChangeField('totalValue', Number(e.target.value))}
          />
        ) : (
          <p className="text-sm font-medium">{formatCurrency(invoice.totalValue)}</p>
        )}
      </div>
    </div>
  );
};

export default InvoiceBasicInfo;
