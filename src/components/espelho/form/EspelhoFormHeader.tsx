
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { mockCampaigns } from '../utils/mockData/campaigns';
import { mockProcesses } from '../utils/mockData/processes';

interface EspelhoFormHeaderProps {
  form: UseFormReturn<EspelhoFormData>;
}

export const EspelhoFormHeader: React.FC<EspelhoFormHeaderProps> = ({ form }) => {
  // Mock data for empenhos/commitments
  const mockCommitments = [
    { id: 'emp-1', number: '2024NE000123' },
    { id: 'emp-2', number: '2024NE000456' },
    { id: 'emp-3', number: '2024NE000789' },
  ];

  return (
    <div className="border p-4 rounded-md space-y-4">
      <h4 className="font-medium">Informações do Espelho</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Campaign Field */}
        <FormField
          control={form.control}
          name="campanha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campanha <span className="text-red-500">*</span></FormLabel>
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma campanha" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockCampaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* SEI Process Field */}
        <FormField
          control={form.control}
          name="seiProcesso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Processo SEI</FormLabel>
              <Select 
                value={field.value || ''} 
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um processo (opcional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Não Informar</SelectItem>
                  {mockProcesses.map((process) => (
                    <SelectItem key={process.id} value={process.id}>
                      {process.number} - {process.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Commitment Number Field */}
        <FormField
          control={form.control}
          name="numeroEmpenho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número do Empenho</FormLabel>
              <Select 
                value={field.value || ''} 
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um empenho (opcional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Não Informar</SelectItem>
                  {mockCommitments.map((commitment) => (
                    <SelectItem key={commitment.id} value={commitment.id}>
                      {commitment.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
