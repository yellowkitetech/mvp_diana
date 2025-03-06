
import React, { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Fornecedor } from '../types';
import { mockFornecedores } from '../utils/espelhoData';
import { cn } from "@/lib/utils";
import { UseFormReturn } from 'react-hook-form';

interface FornecedorSelectorProps {
  form: UseFormReturn<any>;
  onFornecedorSelect: (fornecedorId: string) => void;
}

export const FornecedorSelector: React.FC<FornecedorSelectorProps> = ({ 
  form, 
  onFornecedorSelect 
}) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="fornecedorId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Fornecedor</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? mockFornecedores.find((fornecedor) => fornecedor.id === field.value)?.name
                    : "Selecione um fornecedor"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Buscar fornecedor..." className="h-9" />
                <CommandEmpty>Nenhum fornecedor encontrado.</CommandEmpty>
                <CommandGroup>
                  {mockFornecedores.map((fornecedor) => (
                    <CommandItem
                      key={fornecedor.id}
                      value={fornecedor.name}
                      onSelect={() => {
                        onFornecedorSelect(fornecedor.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          fornecedor.id === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {fornecedor.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
