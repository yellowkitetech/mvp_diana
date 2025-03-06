
import { Button } from '@/components/ui/button';
import { FileText, Trash } from 'lucide-react';

const InvoiceAttachments = ({ invoiceNumber }: { invoiceNumber: string }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Anexos</h3>
      
      <div className="flex items-center p-2 border rounded-md">
        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
        <span className="text-sm">Nota_Fiscal_{invoiceNumber}.pdf</span>
        <Button variant="ghost" size="sm" className="ml-auto">
          <Trash className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </div>
      
      <Button variant="outline" className="w-full">+ Adicionar Anexo</Button>
    </div>
  );
};

export default InvoiceAttachments;
