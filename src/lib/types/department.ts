
import { ApprovalStatus } from './common';

export interface Department {
  id: string;
  name: string;
  description?: string;
  contactEmail: string;
  contactPhone: string;
  active: boolean;
}

export interface CampaignRequest {
  id: string;
  agencyId: string;
  processNumber: number;
  departments: string[]; // IDs dos departamentos envolvidos
  briefing: string;
  status: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
  attachments: string[];
  campaignId?: string;
  seiNumber?: string;
  commitmentNumber?: string;
}
