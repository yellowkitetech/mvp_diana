
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, X, Download, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ItemsTable } from './ItemsTable';
import { Espelho } from './types';
import { formatDate } from './utils/formatters';

interface ViewEspelhoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  espelho: Espelho | null;
  onApprove: (id: string) => void;
  onReject: (espelho: Espelho) => void;
}

export const ViewEspelhoDialog: React.FC<ViewEspelhoDialogProps> = ({
  isOpen,
  onClose,
  espelho,
  onApprove,
  onReject
}) => {
  if (!espelho) return null;

  // Create a formatter function for dates that accepts string
  const formatDisplayDate = (dateString: string) => {
    try {
      return formatDate(new Date(dateString));
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Espelho {espelho.numero}</span>
            <StatusBadge status={espelho.status} />
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Campanha</h3>
            <p className="mt-1">{espelho.campanha}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Data de Atualização</h3>
            <p className="mt-1">{formatDisplayDate(espelho.dataAtualizacao)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Processo SEI</h3>
            <p className="mt-1">{espelho.seiProcesso || 'Não informado'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Número de Empenho</h3>
            <p className="mt-1">{espelho.numeroEmpenho || 'Não informado'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Valor Líquido</h3>
            <p className="mt-1 font-semibold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(espelho.valorLiquido)}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Valor Bruto</h3>
            <p className="mt-1 font-semibold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(espelho.valorBruto)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-medium mb-2">Itens</h3>
          <ItemsTable items={espelho.items} onRemoveItem={() => {}} />
        </div>

        {espelho.observacao && (
          <div className="mt-6">
            <h3 className="text-base font-medium mb-2">Observação</h3>
            <div className="p-3 border rounded-md bg-muted/30">
              <p className="whitespace-pre-wrap">{espelho.observacao}</p>
            </div>
          </div>
        )}

        {espelho.anexos && espelho.anexos.length > 0 && (
          <div className="mt-6">
            <h3 className="text-base font-medium mb-2">Anexos</h3>
            <div className="flex flex-wrap gap-2">
              {espelho.anexos.map((anexo, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => window.open(`#`, '_blank')}
                >
                  <FileText className="h-4 w-4" />
                  {anexo}
                  <Download className="h-4 w-4 ml-1" />
                </Button>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          {espelho.status === 'pending' && (
            <>
              <Button variant="outline" className="gap-2" onClick={() => onReject(espelho)}>
                <X className="h-4 w-4" /> Reprovar
              </Button>
              <Button className="gap-2" onClick={() => onApprove(espelho.id)}>
                <Check className="h-4 w-4" /> Aprovar
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
