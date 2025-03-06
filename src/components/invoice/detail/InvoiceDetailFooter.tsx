
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface InvoiceDetailFooterProps {
  isEditing: boolean;
  onCancel: () => void;
  onSave: () => void;
  onEdit: () => void;
}

const InvoiceDetailFooter = ({ isEditing, onCancel, onSave, onEdit }: InvoiceDetailFooterProps) => {
  return (
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={onCancel}>
        {isEditing ? "Cancelar" : "Fechar"}
      </Button>
      {isEditing ? (
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      ) : (
        <Button onClick={onEdit}>
          Editar
        </Button>
      )}
    </CardFooter>
  );
};

export default InvoiceDetailFooter;
