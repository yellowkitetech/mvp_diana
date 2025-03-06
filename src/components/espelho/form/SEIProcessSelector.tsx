
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
import { mockProcesses } from '../utils/mockData/processes';

interface SEIProcessSelectorProps {
  form: UseFormReturn<EspelhoFormData>;
  selectedCampaignId: string;
}

export const SEIProcessSelector: React.FC<SEIProcessSelectorProps> = ({ 
  form, 
  selectedCampaignId 
}) => {
  const [filteredProcesses, setFilteredProcesses] = useState(mockProcesses);

  // Effect to filter SEI processes based on selected campaign
  useEffect(() => {
    if (selectedCampaignId) {
      const campaignTitle = mockProcesses.find(
        c => c.id === selectedCampaignId
      )?.title || '';
      
      // Filter processes related to the selected campaign
      const relatedProcesses = mockProcesses.filter(process => 
        process.title.includes(campaignTitle) || 
        process.description.includes(campaignTitle)
      );
      
      setFilteredProcesses(relatedProcesses.length > 0 ? relatedProcesses : mockProcesses);
    } else {
      setFilteredProcesses(mockProcesses);
    }
  }, [selectedCampaignId]);

  return (
    <FormField
      control={form.control}
      name="seiProcesso"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Processo SEI</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || ''}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um processo (opcional)" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="_none">Não informar</SelectItem>
              {filteredProcesses.map(process => (
                <SelectItem key={process.id} value={process.number}>
                  {process.number} - {process.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Processo SEI relacionado (opcional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
