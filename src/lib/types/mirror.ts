
import { ApprovalStatus } from './common';

export interface CampaignMirror {
  id: string;
  campaignRequestId: string;
  items: MirrorItem[];
  totalValue: number;
  status: MirrorStatus;
  committedDate?: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  campaignId?: string;
  seiNumber?: string;
  commitmentNumber?: string;
  feedback?: string;
  
  // Additional fields to match our components
  agencia?: string;
  fornecedor?: string;
  valor?: number;
  dataAtualizacao?: string;
}

export interface MirrorItem {
  id: string;
  description: string;
  supplierId: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  
  // Additional fields to match our components
  fornecedorNome?: string;
  tipoServico?: string;
  subtipoServico?: string;
  tipo?: string;
  descricao?: string;
  quantidade?: number;
  valorUnitario?: number;
}

export type MirrorStatus = 'draft' | 'pending' | 'approved' | 'rejected';
