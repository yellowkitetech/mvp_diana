
import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Mock ABAP items for the example
export const mockAbapItems = [
  { id: 'abap1', name: 'Banner 300x250', value: 5000.00 },
  { id: 'abap2', name: 'Spot de Rádio 30s', value: 12000.00 },
  { id: 'abap3', name: 'VT para TV 45s', value: 30000.00 },
  { id: 'abap4', name: 'Anúncio impresso', value: 8000.00 },
  { id: 'abap5', name: 'Layout de Website', value: 15000.00 },
];

export interface CreativeFormData {
  title: string;
  campaignId: string;
  seiNumber?: string;
  commitmentNumber?: string;
  abapItemId: string;
  itemValue: number;
  discountedValue: number;
  observations?: string;
  file?: File;
}

export const useCreativeForm = (onSubmit: (data: CreativeFormData) => void, onClose: () => void) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [campaign, setCampaign] = useState('');
  const [seiNumber, setSeiNumber] = useState('');
  const [commitmentNumber, setCommitmentNumber] = useState('');
  const [abapItem, setAbapItem] = useState('');
  const [itemValue, setItemValue] = useState(0);
  const [discountedValue, setDiscountedValue] = useState(0);
  const [observations, setObservations] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Handle ABAP item selection
  const handleAbapItemChange = (id: string) => {
    setAbapItem(id);
    const selectedItem = mockAbapItems.find(item => item.id === id);
    if (selectedItem) {
      setItemValue(selectedItem.value);
      setDiscountedValue(selectedItem.value * 0.5); // 50% discount
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!title || !campaign || !abapItem) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha os campos obrigatórios: título, campanha e item ABAP.",
        variant: "destructive"
      });
      return;
    }
    
    // Prepare form data
    const formData: CreativeFormData = {
      title,
      campaignId: campaign,
      seiNumber: seiNumber !== 'none' ? seiNumber : undefined,
      commitmentNumber: commitmentNumber !== 'none' ? commitmentNumber : undefined,
      abapItemId: abapItem,
      itemValue,
      discountedValue,
      observations: observations || undefined,
      file: file || undefined
    };
    
    onSubmit(formData);
  };
  
  return {
    title,
    setTitle,
    campaign,
    setCampaign,
    seiNumber,
    setSeiNumber,
    commitmentNumber,
    setCommitmentNumber,
    abapItem,
    setAbapItem,
    itemValue,
    discountedValue,
    observations,
    setObservations,
    file,
    handleAbapItemChange,
    formatCurrency,
    handleSubmit,
    fileInputRef,
    fileError,
    setFileError
  };
};
