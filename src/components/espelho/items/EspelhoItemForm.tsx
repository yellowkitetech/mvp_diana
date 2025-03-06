
import React from 'react';
import { Form } from '@/components/ui/form';
import { EspelhoItem } from '../types';
import { useEspelhoItemForm } from './hooks/useEspelhoItemForm';
import { FornecedorSelector } from './components/FornecedorSelector';
import { ServicoTypeSelector } from './components/ServicoTypeSelector';
import { ServicoSubtypeSelector } from './components/ServicoSubtypeSelector';
import { DescricaoField } from './components/DescricaoField';
import { ValorFields } from './components/ValorFields';
import { FormActions } from './components/FormActions';

interface EspelhoItemFormProps {
  onAddItem: (item: EspelhoItem) => void;
  onCancel: () => void;
  campaignId?: string;
}

export const EspelhoItemForm: React.FC<EspelhoItemFormProps> = ({ 
  onAddItem, 
  onCancel, 
  campaignId 
}) => {
  const {
    form,
    filteredFornecedores,
    selectedFornecedor,
    onSubmit,
    filterSubtypes,
    onCancel: handleCancel
  } = useEspelhoItemForm({
    onAddItem,
    onCancel,
    campaignId
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => onSubmit(data))} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FornecedorSelector 
            form={form} 
            fornecedores={filteredFornecedores} 
          />

          <ServicoTypeSelector 
            form={form} 
            selectedFornecedor={selectedFornecedor} 
          />

          <ServicoSubtypeSelector 
            form={form} 
            selectedFornecedor={selectedFornecedor}
            filterSubtypes={filterSubtypes}
          />

          <DescricaoField form={form} />
          
          <ValorFields form={form} />
        </div>

        <FormActions onCancel={handleCancel} />
      </form>
    </Form>
  );
};
