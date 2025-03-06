
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { EspelhoItem } from '../types';
import { 
  espelhoFormSchema, 
  EspelhoFormData, 
  getDefaultFormValues,
  calculateTotalValue 
} from '../utils/espelhoFormSchema';

export const useEspelhoForm = (onComplete: () => void) => {
  const { toast } = useToast();
  const [items, setItems] = useState<EspelhoItem[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const form = useForm<EspelhoFormData>({
    resolver: zodResolver(espelhoFormSchema),
    defaultValues: getDefaultFormValues(),
  });

  const handleAddItem = (item: EspelhoItem) => {
    const newItems = [...items, item];
    setItems(newItems);
    form.setValue('items', newItems);
    
    // Calculate and update totals for the form
    const totals = calculateTotalValue(newItems);
    toast({
      title: "Item adicionado",
      description: `Valor total: R$ ${totals.liquido.toLocaleString('pt-BR')}`,
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    form.setValue('items', newItems);
    
    // Calculate and update totals for the form
    const totals = calculateTotalValue(newItems);
    toast({
      title: "Item removido",
      description: `Novo valor total: R$ ${totals.liquido.toLocaleString('pt-BR')}`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const pdfFiles = fileList.filter(file => file.type === 'application/pdf');
      
      if (pdfFiles.length !== fileList.length) {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie apenas arquivos PDF.",
          variant: "destructive"
        });
        return;
      }
      
      const newFiles = [...files, ...pdfFiles];
      setFiles(newFiles);
      // We're not setting form values for files anymore as it's not in the schema
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    // We're not setting form values for files anymore as it's not in the schema
  };

  const onSubmit = (data: EspelhoFormData, action: 'saveTemplate' | 'send') => {
    if (items.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um item ao espelho",
        variant: "destructive"
      });
      return;
    }

    // In a real application, you'd send the data to the API here
    console.log("Form data:", data);
    console.log("Action:", action);
    console.log("Files:", files); // We still have access to files even though it's not in the form schema
    
    if (action === 'saveTemplate') {
      toast({
        title: "Modelo salvo",
        description: "O modelo foi salvo com sucesso"
      });
    } else {
      toast({
        title: "Espelho enviado",
        description: "O espelho foi enviado para aprovação"
      });
    }
    
    // Close the dialog and reset the form
    onComplete();
    form.reset();
    setItems([]);
    setFiles([]);
  };

  const handleCancel = () => {
    onComplete();
    form.reset();
    setItems([]);
    setFiles([]);
  };

  return {
    form,
    items,
    setItems,
    files,
    setFiles,
    isAddingItem,
    setIsAddingItem,
    handleAddItem,
    handleRemoveItem,
    handleFileChange,
    handleRemoveFile,
    onSubmit,
    handleCancel
  };
};
