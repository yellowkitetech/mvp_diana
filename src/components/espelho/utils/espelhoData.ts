
// Rewritten espelhoData.ts file that imports from the smaller, focused files
import { 
  mockEspelhos,
  mockEmpenhos,
  mockCampaigns,
  mockProcesses,
  mockFornecedores,
  mockCommitments,
  getUniqueAgencies
} from './mockData';

import {
  formatCurrency,
  formatDate
} from './formatters';

import {
  translateServiceType as getServiceTypeLabel,
  translateServiceSubtype as getServiceSubtypeLabel
} from './serviceTranslations';

// Re-export everything to maintain the same public API
export {
  mockEspelhos,
  mockEmpenhos,
  mockCampaigns,
  mockProcesses as mockSEIProcesses,
  mockFornecedores,
  mockCommitments,
  getUniqueAgencies,
  getServiceTypeLabel,
  getServiceSubtypeLabel,
  formatCurrency,
  formatDate
};
