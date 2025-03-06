
import { Invoice as BaseInvoice } from './financial';

// Extended Invoice type with additional UI-specific fields
export interface InvoiceWithMeta extends BaseInvoice {
  supplierName: string;
  campaignName: string;
}

// Type for invoice filters
export interface InvoiceFilters {
  status: string;
  supplier: string;
  campaign: string;
  minValue: string;
  maxValue: string;
  searchTerm: string;
}

// Type for bulk actions on invoices
export type BulkAction = 'status' | 'delete' | 'export';
