
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EspelhoFormData } from '../utils/espelhoFormSchema';
import { mockEmpenhos } from '../utils/mockData/empenhos';
import { mockCampaigns } from '../utils/mockData/campaigns';

interface EmpenhoSelectorProps {
  form: UseFormReturn<EspelhoFormData>;
  selectedCampaignId: string;
}

export const EmpenhoSelector: React.FC<EmpenhoSelectorProps> = ({ 
  form, 
  selectedCampaignId 
}) => {
  const [filteredEmpenhos, setFilteredEmpenhos] = useState(mockEmpenhos);

  // Effect to filter empenhos based on selected campaign
  useEffect(() => {
    if (selectedCampaignId) {
      const campaignTitle = mockCampaigns.find(c => c.id === selectedCampaignId)?.title || '';
      
      // Filter empenhos related to the selected campaign
      const relatedEmpenhos = mockEmpenhos.filter(empenho => 
        empenho.campanha.includes(campaignTitle)
      );
      
      setFilteredEmpenhos(relatedEmpenhos.length > 0 ? relatedEmpenhos : mockEmpenhos);
    } else {
      setFilteredEmpenhos(mockEmpenhos);
    }
  }, [selectedCampaignId]);

  return (
    <FormField
      control={form.control}
      name="numeroEmpenho"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Número do Empenho</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || ''}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um empenho (opcional)" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="_none">Não informar</SelectItem>
              {filteredEmpenhos.map(empenho => (
                <SelectItem key={empenho.id} value={empenho.numero}>
                  {empenho.numero} - {empenho.campanha}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Número do empenho relacionado (opcional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
