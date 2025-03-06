
import { ReactNode } from 'react';

export type ApprovalStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';

export interface Espelho {
  id: string;
  numero: string;
  campanha: string;
  campanhaId: string;
  agencia: string;  // Added agency field
  seiProcesso: string;
  numeroEmpenho: string;
  valorLiquido: number;
  valorBruto: number;
  status: ApprovalStatus;
  observacao?: string;
  dataAtualizacao: string;
  items: EspelhoItem[];
  anexos?: string[];
}

export interface EspelhoItem {
  id: string;
  fornecedorId: string;
  fornecedorNome: string;
  tipoServico: string;
  subtipoServico: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorLiquido: number;
  valorBruto: number;
  tipo: string;
}

export interface Empenho {
  id: string;
  numero: string;
  campanha: string;
  seiProcesso: string;
  valorLiquido: number;
  valorBruto: number;
  status: ApprovalStatus;
  dataAtualizacao: string;
}

export interface Commitment {
  id: string;
  number: string;
  date: string;
  value: number;
  description: string;
  status: string;
}

export interface Fornecedor {
  id: string;
  name: string;
  serviceTypes: string[];
  serviceSubtypes: string[];
  group?: string;
}

export interface Campaign {
  id: string;
  title: string;
}

export interface SEIProcess {
  id: string;
  number: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface EspelhoEmpenhoPageProps {
  // These would be props for the page component
}

export interface FilterCriteria {
  searchTerm: string;
  filterStatus: string;
  filterAgencia: string;
  filterValorMin: string;
  filterValorMax: string;
}
