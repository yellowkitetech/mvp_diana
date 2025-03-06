
import { ApprovalStatus } from './common';

export interface CreativeWork {
  id: string;
  campaignRequestId: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'other';
  fileUrl: string;
  status: ApprovalStatus;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
  campaignId?: string;
  seiNumber?: string;
  commitmentNumber?: string;
  abapItemId?: string;
  itemValue?: number;
  discountedValue?: number;
}
