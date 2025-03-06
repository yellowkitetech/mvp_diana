
import { ServiceType } from './supplier';

export interface Invoice {
  id: string;
  campaignRequestId: string;
  number: string;
  supplierId: string;
  issueDate: string;
  dueDate: string;
  totalValue: number;
  status: 'pending' | 'verified' | 'paid' | 'cancelled';
  attachments: string[];
  paymentDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  campaignId?: string;
  seiNumber?: string;
  commitmentNumber?: string;
}

export interface BudgetPlan {
  id: string;
  year: number;
  month: number;
  totalBudget: number;
  allocations: BudgetAllocation[];
  createdAt: string;
  updatedAt: string;
}

export interface BudgetAllocation {
  id: string;
  supplierId: string;
  serviceType: ServiceType;
  amount: number;
  campaignId?: string;
}

export interface CommitmentNumberConfig {
  id: string;
  prefix: string;
  lastUsedNumber: number;
  year: number;
  active: boolean;
}

export interface Commitment {
  id: string;
  number: string;
  value: number;
  issueDate: string;
  description: string;
  campaignId?: string;
  supplierIds: string[]; // Fornecedores associados
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'approved' | 'used' | 'cancelled';
  seiNumber?: string; // Número do processo SEI associado
}
