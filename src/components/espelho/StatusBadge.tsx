
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, Edit } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'draft':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800"><Edit className="h-3 w-3 mr-1" /> Em Elaboração</Badge>;
    case 'pending':
      return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Pendente</Badge>;
    case 'approved':
      return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Aprovado</Badge>;
    case 'rejected':
      return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Reprovado</Badge>;
    case 'committed':
      return <Badge className="bg-blue-500"><CheckCircle className="h-3 w-3 mr-1" /> Empenhado</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};
