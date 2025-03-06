
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ListFilter } from 'lucide-react';
import { Fornecedor } from '../../types';
import { UseFormReturn } from 'react-hook-form';
import { EspelhoItemFormValues } from '../EspelhoItemSchema';
import { translateServiceSubtype } from '../../utils/serviceTranslations';
import { getServiceSubtypeMap } from '../../utils/serviceTranslations';

interface ServicoSubtypeSelectorProps {
  form: UseFormReturn<EspelhoItemFormValues>;
  selectedFornecedor: Fornecedor | null;
  filterSubtypes: (selectedType: string, allSubtypes: string[]) => string[];
}

export const ServicoSubtypeSelector: React.FC<ServicoSubtypeSelectorProps> = ({ 
  form, 
  selectedFornecedor,
  filterSubtypes 
}) => {
  if (!selectedFornecedor || !form.watch('tipoServico')) return null;

  const tipoServico = form.watch('tipoServico');
  
  // Get available subtypes for this service type from the service translations utility
  const serviceSubtypeMap = getServiceSubtypeMap();
  const availableSubtypes = serviceSubtypeMap[tipoServico] || [];
  
  // Filter subtypes based on what this supplier can provide
  const supplierSubtypes = selectedFornecedor.serviceSubtypes.filter(subtype => 
    availableSubtypes.includes(subtype)
  );

  if (supplierSubtypes.length === 0) return null;

  return (
    <FormField
      control={form.control}
      name="subtipoServico"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <ListFilter className="h-4 w-4" /> Subtipo de Serviço
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o subtipo de serviço" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {supplierSubtypes.map(subtype => (
                <SelectItem key={subtype} value={subtype}>
                  {translateServiceSubtype(subtype)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
