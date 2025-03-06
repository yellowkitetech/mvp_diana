
import { Supplier } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

export const SupplierTable = ({ 
  suppliers, 
  onEdit, 
  onDelete 
}: SupplierTableProps) => {
  const formatServiceTypes = (types: string[]) => {
    const typeLabels: Record<string, string> = {
      criacao: 'Criação',
      veiculacao: 'Veiculação',
      producao: 'Produção'
    };
    
    return types.map(type => typeLabels[type] || type).join(', ');
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome / Razão Social</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Tipo de Serviço</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{supplier.name}</p>
                  <p className="text-sm text-muted-foreground">{supplier.companyName}</p>
                </div>
              </TableCell>
              <TableCell>{supplier.cnpj}</TableCell>
              <TableCell>{formatServiceTypes(supplier.serviceTypes)}</TableCell>
              <TableCell>
                <div>
                  <p className="text-sm">{supplier.email}</p>
                  <p className="text-sm">{supplier.whatsapp}</p>
                </div>
              </TableCell>
              <TableCell>
                {supplier.active ? (
                  <Badge className="bg-green-500">Ativo</Badge>
                ) : (
                  <Badge variant="secondary">Inativo</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(supplier)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(supplier.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
