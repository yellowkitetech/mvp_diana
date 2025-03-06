
import { FileText } from 'lucide-react';

const EmptyInvoiceState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
      <FileText className="h-8 w-8 mb-2" />
      <h3 className="text-lg font-medium">Nenhuma fatura encontrada</h3>
      <p>Tente ajustar os filtros ou criar uma nova fatura</p>
    </div>
  );
};

export default EmptyInvoiceState;
