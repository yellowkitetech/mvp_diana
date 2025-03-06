
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import InvoiceStatusBadge from '../InvoiceStatusBadge';
import { InvoiceWithMeta } from '@/lib/types/invoice';

interface InvoiceDetailHeaderProps {
  invoice: InvoiceWithMeta;
  onClose: () => void;
}

const InvoiceDetailHeader = ({ invoice, onClose }: InvoiceDetailHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Detalhes da Fatura</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{invoice.number}</p>
      </div>
      <div className="flex items-center space-x-2">
        <InvoiceStatusBadge status={invoice.status} />
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default InvoiceDetailHeader;
