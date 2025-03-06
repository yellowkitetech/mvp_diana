
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { mockCampaigns, mockSEIProcesses, mockCommitments } from '../utils/espelhoData';
import { z } from 'zod';

// Use the same schema definition from the parent component
const espelhoSchemaFields = z.object({
  campanha: z.string().min(1, { message: 'Selecione uma campanha' }),
  seiProcesso: z.string().optional(),
  numeroEmpenho: z.string().optional(),
});

type FormFieldsValues = z.infer<typeof espelhoSchemaFields>;

interface CampaignProcessFieldsProps {
  form: UseFormReturn<any>;
}

export const CampaignProcessFields: React.FC<CampaignProcessFieldsProps> = ({ form }) => {
  return (
    <>
      {/* Campaign Field */}
      <FormField
        control={form.control}
        name="campanha"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campanha <span className="text-red-500">*</span></FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
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
      
      {/* SEI Process and Commitment Number Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="seiProcesso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Processo SEI</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um processo SEI" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Não informar</SelectItem>
                  {mockSEIProcesses.map((process) => (
                    <SelectItem key={process.id} value={process.id}>
                      {process.number}
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
          name="numeroEmpenho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número do Empenho</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um número de empenho" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Não informar</SelectItem>
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
    </>
  );
};
