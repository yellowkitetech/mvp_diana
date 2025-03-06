
import { z } from 'zod';
import { EspelhoItem } from '../types';

export const espelhoFormSchema = z.object({
  numero: z.string().min(1, { message: 'Número é obrigatório' }),
  campanha: z.string().min(1, { message: 'Selecione uma campanha' }),
  seiProcesso: z.string().optional(),
  numeroEmpenho: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string(),
      fornecedorId: z.string().min(1, { message: 'Fornecedor é obrigatório' }),
      fornecedorNome: z.string().min(1, { message: 'Nome do fornecedor é obrigatório' }),
      tipoServico: z.string().min(1, { message: 'Tipo de serviço é obrigatório' }),
      subtipoServico: z.string().min(1, { message: 'Subtipo de serviço é obrigatório' }),
      descricao: z.string().min(3, { message: 'Descrição deve ter pelo menos 3 caracteres' }),
      quantidade: z.number().min(1, { message: 'Quantidade deve ser pelo menos 1' }),
      valorUnitario: z.number().min(0.01, { message: 'Valor unitário deve ser maior que zero' }),
      valorLiquido: z.number().min(0, { message: 'Valor líquido é obrigatório' }),
      valorBruto: z.number().min(0, { message: 'Valor bruto é obrigatório' }),
      tipo: z.string(),
    })
  ).min(1, { message: 'Adicione pelo menos um item' }),
  observacao: z.string().optional(),
})
.refine((data) => data.items.length > 0, {
  message: "Adicione pelo menos um item ao espelho",
  path: ["items"]
});

export type EspelhoFormData = z.infer<typeof espelhoFormSchema>;

export const getDefaultFormValues = (): EspelhoFormData => ({
  numero: '',
  campanha: '',
  seiProcesso: '',
  numeroEmpenho: '',
  items: [],
  observacao: '',
});

export const calculateTotalValue = (items: EspelhoItem[]): { liquido: number; bruto: number } => {
  return items.reduce((sum, item) => {
    return {
      liquido: sum.liquido + item.valorLiquido,
      bruto: sum.bruto + item.valorBruto
    };
  }, { liquido: 0, bruto: 0 });
};
