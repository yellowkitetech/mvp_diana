
import { Status } from './common';

export interface Process {
  id: string;
  title: string;
  description: string;
  agencyId: string;
  status: Status;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  campaignId?: string;
  seiNumber?: string;
  commitmentNumber?: string;
}

export interface Communication {
  id: string;
  processId: string;
  sender: string;
  recipient: string;
  subject: string;
  message: string;
  attachments: string[];
  createdAt: string;
  read: boolean;
}
