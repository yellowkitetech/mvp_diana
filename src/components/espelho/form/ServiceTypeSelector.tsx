
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Fornecedor } from '../types';
import { getServiceTypeLabel, getServiceSubtypeLabel } from '../utils/espelhoData';
import { UseFormReturn } from 'react-hook-form';

interface ServiceTypeSelectorProps {
  form: UseFormReturn<any>;
  selectedFornecedor: Fornecedor | null;
}

export const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({ 
  form, 
  selectedFornecedor 
}) => {
  // Get available tipos for selected fornecedor
  const availableTipos = selectedFornecedor?.serviceTypes || [];
  
  // Get available subtipos for selected tipo
  const selectedTipo = form.watch('tipoServico');
  const availableSubtipos = selectedFornecedor?.serviceSubtypes.filter(subtype => {
    // Logic to filter subtipos by tipo
    if (selectedTipo === 'criacao') {
      return ['agencia'].includes(subtype);
    }
    if (selectedTipo === 'veiculacao') {
      return ['radio', 'televisao', 'site', 'midia-digital', 'outdoor', 'outbus', 'placa'].includes(subtype);
    }
    if (selectedTipo === 'producao') {
      return ['camisa', 'panfleto', 'video', 'spot-radio'].includes(subtype);
    }
    return true;
  }) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="tipoServico"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Serviço</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={!selectedFornecedor}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableTipos.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {getServiceTypeLabel(tipo)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subtipoServico"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtipo de Serviço</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={!form.watch('tipoServico')}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o subtipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableSubtipos.map((subtipo) => (
                  <SelectItem key={subtipo} value={subtipo}>
                    {getServiceSubtypeLabel(subtipo)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
