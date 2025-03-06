
import { Status } from './common';
import { BudgetAllocation } from './financial';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  status: Status;
  budgetAllocations: BudgetAllocation[];
  createdAt: string;
  updatedAt: string;
  // Campos adicionais
  seiNumber?: string;
  commitmentNumber?: string;
  department?: string;
  responsibleUser?: string;
}

export interface SEIProcess {
  id: string;
  number: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed' | 'archived';
}
