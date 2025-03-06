
import { Department } from './department';

export interface SEIProcess {
  id: string;
  processNumber: string;
  description: string;
  departments: string[]; // IDs of departments
  attachments: string[];
  campaignId?: string; // Added campaign ID field
  createdAt: string;
  updatedAt: string;
}
