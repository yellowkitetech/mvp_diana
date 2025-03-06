
// Export all mock data from this index file
export * from './campaigns';
export * from './processes';
export * from './espelhos';
export * from './fornecedores';
export * from './empenhos';
export * from './commitments';

import { mockFornecedores } from './fornecedores';

// Helper function to get unique agencies from fornecedores
export const getUniqueAgencies = () => {
  const agencies = new Set<string>();
  mockFornecedores.forEach(fornecedor => {
    if (fornecedor.group) {
      agencies.add(fornecedor.group);
    }
  });
  return Array.from(agencies).filter(agency => agency !== '');
};
