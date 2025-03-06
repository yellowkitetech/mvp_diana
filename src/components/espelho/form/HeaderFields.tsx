
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EspelhoFormData } from '../utils/espelhoFormSchema';
import { mockCampaigns } from '../utils/mockData/campaigns';
import { SEIProcessSelector } from './SEIProcessSelector';
import { EmpenhoSelector } from './EmpenhoSelector';

interface HeaderFieldsProps {
  form: UseFormReturn<EspelhoFormData>;
  selectedCampaignId: string;
  setSelectedCampaignId: (id: string) => void;
}

export const HeaderFields: React.FC<HeaderFieldsProps> = ({ 
  form, 
  selectedCampaignId, 
  setSelectedCampaignId 
}) => {
  // Handler for campaign selection changes
  const handleCampaignChange = (value: string) => {
    setSelectedCampaignId(value);
    form.setValue('campanha', value);
    form.trigger('campanha');
    
    // Reset dependent fields
    form.setValue('seiProcesso', '');
    form.setValue('numeroEmpenho', '');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="numero"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input placeholder="ESP-2023-XXX" {...field} />
            </FormControl>
            <FormDescription>
              Número de identificação do espelho
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="campanha"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campanha <span className="text-destructive">*</span></FormLabel>
            <Select onValueChange={handleCampaignChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma campanha" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {mockCampaigns.map(campaign => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Campanha publicitária relacionada
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <SEIProcessSelector 
        form={form} 
        selectedCampaignId={selectedCampaignId} 
      />

      <EmpenhoSelector 
        form={form} 
        selectedCampaignId={selectedCampaignId} 
      />
    </div>
  );
};
