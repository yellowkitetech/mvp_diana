
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

type InvoiceStatus = 'pending' | 'verified' | 'paid' | 'cancelled';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

const InvoiceStatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Pendente</Badge>;
    case 'verified':
      return <Badge variant="secondary"><CheckCircle className="h-3 w-3 mr-1" /> Verificada</Badge>;
    case 'paid':
      return <Badge className="bg-green-500"><DollarSign className="h-3 w-3 mr-1" /> Paga</Badge>;
    case 'cancelled':
      return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Cancelada</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

export default InvoiceStatusBadge;
