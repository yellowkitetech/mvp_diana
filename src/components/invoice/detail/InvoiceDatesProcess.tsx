
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { InvoiceWithMeta } from '@/lib/types/invoice';
import InvoiceStatusBadge from '../InvoiceStatusBadge';

interface InvoiceDatesProcessProps {
  invoice: InvoiceWithMeta;
  isEditing: boolean;
  onChangeField: (field: keyof InvoiceWithMeta, value: any) => void;
}

const InvoiceDatesProcess = ({ invoice, isEditing, onChangeField }: InvoiceDatesProcessProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Datas e Processo</h3>
      
      <div className="space-y-2">
        <Label htmlFor="issueDate">Data de Emissão</Label>
        {isEditing ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoice.issueDate ? format(new Date(invoice.issueDate), 'PPP', { locale: ptBR }) : "Selecione uma data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={invoice.issueDate ? new Date(invoice.issueDate) : undefined}
                onSelect={(date) => onChangeField('issueDate', date ? format(date, 'yyyy-MM-dd') : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : (
          <p className="text-sm font-medium">
            {invoice.issueDate ? format(new Date(invoice.issueDate), 'PPP', { locale: ptBR }) : "-"}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dueDate">Data de Vencimento</Label>
        {isEditing ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoice.dueDate ? format(new Date(invoice.dueDate), 'PPP', { locale: ptBR }) : "Selecione uma data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={invoice.dueDate ? new Date(invoice.dueDate) : undefined}
                onSelect={(date) => onChangeField('dueDate', date ? format(date, 'yyyy-MM-dd') : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : (
          <p className="text-sm font-medium">
            {invoice.dueDate ? format(new Date(invoice.dueDate), 'PPP', { locale: ptBR }) : "-"}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="seiNumber">Número do Processo SEI</Label>
        {isEditing ? (
          <Input 
            id="seiNumber"
            value={invoice.seiNumber || ''}
            onChange={(e) => onChangeField('seiNumber', e.target.value)}
          />
        ) : (
          <p className="text-sm font-medium">{invoice.seiNumber || "-"}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="commitmentNumber">Número do Empenho</Label>
        {isEditing ? (
          <Input 
            id="commitmentNumber"
            value={invoice.commitmentNumber || ''}
            onChange={(e) => onChangeField('commitmentNumber', e.target.value)}
          />
        ) : (
          <p className="text-sm font-medium">{invoice.commitmentNumber || "-"}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        {isEditing ? (
          <Select 
            value={invoice.status} 
            onValueChange={(value) => onChangeField('status', value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="verified">Verificada</SelectItem>
              <SelectItem value="paid">Paga</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="pt-1">
            <InvoiceStatusBadge status={invoice.status} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceDatesProcess;
