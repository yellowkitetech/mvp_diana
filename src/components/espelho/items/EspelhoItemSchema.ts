
import { z } from 'zod';
import { EspelhoItem } from '../types';

export const EspelhoItemSchema = z.object({
  fornecedorId: z.string().min(1, { message: 'Selecione um fornecedor' }),
  tipoServico: z.string().min(1, { message: 'Selecione o tipo de serviço' }),
  subtipoServico: z.string().min(1, { message: 'Selecione o subtipo de serviço' }),
  descricao: z.string().min(3, { message: 'Descrição deve ter pelo menos 3 caracteres' }),
  quantidade: z.number().min(1, { message: 'Quantidade deve ser pelo menos 1' }),
  valorUnitario: z.number().min(0.01, { message: 'Valor unitário deve ser maior que zero' }),
  valorLiquido: z.number().min(0, { message: 'Valor líquido é obrigatório' }),
  valorBruto: z.number().min(0, { message: 'Valor bruto é obrigatório' }),
});

export type EspelhoItemFormValues = z.infer<typeof EspelhoItemSchema>;

// Add the ItemFormValues export for the form components
export type ItemFormValues = EspelhoItemFormValues;

// Add default form values
export const defaultItemFormValues: ItemFormValues = {
  fornecedorId: '',
  tipoServico: '',
  subtipoServico: '',
  descricao: '',
  quantidade: 1,
  valorUnitario: 0,
  valorLiquido: 0,
  valorBruto: 0,
};

// Add the item schema creation helper
export const itemSchema = EspelhoItemSchema;

// Add helper function to create EspelhoItem from form values
export const createEspelhoItem = (values: ItemFormValues, fornecedorNome: string): EspelhoItem => {
  return {
    id: `item-${Date.now()}`,
    fornecedorId: values.fornecedorId,
    fornecedorNome,
    tipoServico: values.tipoServico,
    subtipoServico: values.subtipoServico,
    descricao: values.descricao,
    quantidade: values.quantidade,
    valorUnitario: values.valorUnitario,
    valorLiquido: values.valorLiquido,
    valorBruto: values.valorBruto,
    tipo: values.subtipoServico,
  };
};
