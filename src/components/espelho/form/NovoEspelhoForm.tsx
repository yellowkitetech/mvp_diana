
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEspelhoForm } from '../hooks/useEspelhoForm';
import { Form } from '@/components/ui/form';
import { HeaderFields } from './HeaderFields';
import { ItemsSection } from './ItemsSection';
import { EspelhoObservation } from './EspelhoObservation';
import { EspelhoFormActions } from './EspelhoFormActions';
import { useToast } from '@/components/ui/use-toast';

export const NovoEspelhoForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    form, 
    items, 
    files, 
    isAddingItem,
    setIsAddingItem,
    handleAddItem, 
    handleRemoveItem, 
    handleFileChange, 
    handleRemoveFile, 
    onSubmit, 
    handleCancel 
  } = useEspelhoForm(() => navigate('/espelho-empenho'));

  // State for interlinked fields
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  
  // Enable validation mode when the form is submitted
  useEffect(() => {
    const subscription = form.formState.submitCount > 0 
      ? form.trigger()
      : undefined;
    return () => {};
  }, [form.formState.submitCount, form.trigger]);

  const handleSubmit = form.handleSubmit(
    (data) => onSubmit(data, 'send'),
    (errors) => {
      console.error('Form validation errors:', errors);
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios corretamente.",
        variant: "destructive"
      });
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <HeaderFields 
          form={form} 
          selectedCampaignId={selectedCampaignId} 
          setSelectedCampaignId={setSelectedCampaignId}
        />

        <ItemsSection
          items={items}
          isAddingItem={isAddingItem}
          setIsAddingItem={setIsAddingItem}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          selectedCampaignId={selectedCampaignId}
        />

        <EspelhoObservation form={form} />

        <EspelhoFormActions onCancel={handleCancel} form={form} />
      </form>
    </Form>
  );
};
