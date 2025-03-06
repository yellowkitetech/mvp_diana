
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { FileText, FileSpreadsheet, ArrowUpDown, Edit } from 'lucide-react';
import InvoiceStatusBadge from './InvoiceStatusBadge';
import { formatDate } from '@/lib/utils';
import { InvoiceWithMeta } from '@/lib/types/invoice';

interface InvoiceTableProps {
  invoices: InvoiceWithMeta[];
  selectedItems: string[];
  onSelectItem: (id: string, isChecked: boolean) => void;
  onSelectAll: (isChecked: boolean) => void;
  onViewInvoice: (invoice: InvoiceWithMeta) => void;
  onEditInvoice?: (invoice: InvoiceWithMeta) => void;
}

const InvoiceTable = ({ 
  invoices, 
  selectedItems, 
  onSelectItem, 
  onSelectAll,
  onViewInvoice,
  onEditInvoice
}: InvoiceTableProps) => {
  const allSelected = invoices.length > 0 && selectedItems.length === invoices.length;
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox 
                checked={allSelected}
                onCheckedChange={onSelectAll}
                aria-label="Selecionar tudo"
              />
            </TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Campanha</TableHead>
            <TableHead>Processo SEI</TableHead>
            <TableHead>Empenho</TableHead>
            <TableHead>
              <div className="flex items-center">
                Emissão
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end">
                Valor
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow 
                key={invoice.id} 
                className="cursor-pointer hover:bg-muted"
                onClick={() => onViewInvoice(invoice)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedItems.includes(invoice.id)}
                    onCheckedChange={(checked) => onSelectItem(invoice.id, checked === true)}
                    aria-label={`Selecionar fatura ${invoice.number}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>{invoice.supplierName}</TableCell>
                <TableCell>{invoice.campaignName || '-'}</TableCell>
                <TableCell>{invoice.seiNumber || '-'}</TableCell>
                <TableCell>{invoice.commitmentNumber || '-'}</TableCell>
                <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                <TableCell className="text-right font-medium">
                  {invoice.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell><InvoiceStatusBadge status={invoice.status} /></TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewInvoice(invoice);
                      }}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Visualizar</span>
                    </Button>
                    {onEditInvoice && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditInvoice(invoice);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <FileSpreadsheet className="h-4 w-4" />
                      <span className="sr-only">Exportar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-8">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FileText className="h-8 w-8 mb-2" />
                  <h3 className="text-lg font-medium">Nenhuma fatura encontrada</h3>
                  <p>Tente ajustar os filtros ou criar uma nova fatura</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
