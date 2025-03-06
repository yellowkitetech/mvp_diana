
import { ApprovalStatus } from './common';

export interface MediaPlan {
  id: string;
  campaignRequestId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  totalValue: number;
  status: ApprovalStatus;
  items: MediaPlanItem[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  campaignId?: string;
  seiNumber?: string;
  commitmentNumber?: string;
}

export interface MediaPlanItem {
  id: string;
  vehicle: string;
  format: string;
  startDate: string;
  endDate: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
}

export interface ProductionOrder {
  id: string;
  campaignRequestId: string;
  title: string;
  description: string;
  supplier: string;
  deliveryDate: string;
  totalValue: number;
  status: ApprovalStatus;
  items: ProductionOrderItem[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  campaignId?: string;
  seiNumber?: string;
  commitmentNumber?: string;
}

export interface ProductionOrderItem {
  id: string;
  description: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
}
