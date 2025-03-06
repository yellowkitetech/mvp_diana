
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { InvoiceWithMeta } from '@/lib/types/invoice';
import { useToast } from '@/components/ui/use-toast';
import InvoiceDetailHeader from './detail/InvoiceDetailHeader';
import InvoiceBasicInfo from './detail/InvoiceBasicInfo';
import InvoiceDatesProcess from './detail/InvoiceDatesProcess';
import InvoiceAttachments from './detail/InvoiceAttachments';
import InvoiceDetailFooter from './detail/InvoiceDetailFooter';

interface InvoiceDetailProps {
  invoice: InvoiceWithMeta;
  onClose: () => void;
  onSave: (invoice: InvoiceWithMeta) => void;
}

const InvoiceDetail = ({ invoice, onClose, onSave }: InvoiceDetailProps) => {
  const { toast } = useToast();
  const [editedInvoice, setEditedInvoice] = useState<InvoiceWithMeta>({ ...invoice });
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (field: keyof InvoiceWithMeta, value: any) => {
    setEditedInvoice(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    // In a real app, this would save to the database
    onSave(editedInvoice);
    setIsEditing(false);
    
    toast({
      title: "Fatura atualizada",
      description: "As alterações foram salvas com sucesso."
    });
  };
  
  const handleCancel = () => {
    if (isEditing) {
      setEditedInvoice({ ...invoice });
      setIsEditing(false);
    } else {
      onClose();
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <InvoiceDetailHeader invoice={editedInvoice} onClose={onClose} />
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <InvoiceBasicInfo 
            invoice={editedInvoice} 
            isEditing={isEditing} 
            onChangeField={handleChange} 
          />
          
          {/* Datas e Status */}
          <InvoiceDatesProcess 
            invoice={editedInvoice} 
            isEditing={isEditing} 
            onChangeField={handleChange} 
          />
        </div>
        
        <Separator />
        
        {/* Anexos */}
        <InvoiceAttachments invoiceNumber={editedInvoice.number} />
      </CardContent>
      
      <InvoiceDetailFooter 
        isEditing={isEditing}
        onCancel={handleCancel}
        onSave={handleSave}
        onEdit={() => setIsEditing(true)}
      />
    </Card>
  );
};

export default InvoiceDetail;
