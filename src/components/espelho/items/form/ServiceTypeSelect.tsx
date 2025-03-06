
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../EspelhoItemSchema';
import { translateServiceType } from '../../utils/serviceTranslations';

interface ServiceTypeSelectProps {
  form: UseFormReturn<ItemFormValues>;
  availableServiceTypes: string[];
  onServiceTypeChange: (value: string) => void;
  disabled: boolean;
}

export const ServiceTypeSelect: React.FC<ServiceTypeSelectProps> = ({ 
  form, 
  availableServiceTypes, 
  onServiceTypeChange,
  disabled
}) => {
  return (
    <FormField
      control={form.control}
      name="tipoServico"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo de Serviço <span className="text-red-500">*</span></FormLabel>
          <Select
            value={field.value}
            onValueChange={onServiceTypeChange}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableServiceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {translateServiceType(type)}
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
