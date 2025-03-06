
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
import { translateServiceSubtype } from '../../utils/serviceTranslations';

interface ServiceSubtypeSelectProps {
  form: UseFormReturn<ItemFormValues>;
  availableServiceSubtypes: string[];
  disabled: boolean;
}

export const ServiceSubtypeSelect: React.FC<ServiceSubtypeSelectProps> = ({ 
  form, 
  availableServiceSubtypes, 
  disabled 
}) => {
  return (
    <FormField
      control={form.control}
      name="subtipoServico"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Subtipo de Serviço <span className="text-red-500">*</span></FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o subtipo" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableServiceSubtypes.map((subtype) => (
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
