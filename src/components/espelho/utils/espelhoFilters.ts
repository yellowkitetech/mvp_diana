
import { Espelho, Empenho, FilterCriteria } from '../types';

// Change the export to use 'export type' instead of just 'export'
export type { FilterCriteria };

export const filterEspelhos = (espelhos: Espelho[], criteria: FilterCriteria): Espelho[] => {
  return espelhos.filter(espelho => {
    // Search term filter
    const searchTermMatch = 
      criteria.searchTerm === '' || 
      espelho.numero.toLowerCase().includes(criteria.searchTerm.toLowerCase()) ||
      espelho.campanha.toLowerCase().includes(criteria.searchTerm.toLowerCase()) ||
      (espelho.seiProcesso && espelho.seiProcesso.toLowerCase().includes(criteria.searchTerm.toLowerCase())) ||
      (espelho.numeroEmpenho && espelho.numeroEmpenho.toLowerCase().includes(criteria.searchTerm.toLowerCase()));
    
    // Status filter
    const statusMatch = 
      criteria.filterStatus === '' || 
      espelho.status === criteria.filterStatus;
    
    // Agency filter (if applicable)
    const agencyMatch = 
      criteria.filterAgencia === '' || 
      espelho.items.some(item => {
        // This is just a simple example. In a real app, you'd have proper agency filtering
        const supplier = item.fornecedorNome;
        return supplier.toLowerCase().includes(criteria.filterAgencia.toLowerCase());
      });
    
    // Value range filter
    const minValue = criteria.filterValorMin ? parseFloat(criteria.filterValorMin) : 0;
    const maxValue = criteria.filterValorMax ? parseFloat(criteria.filterValorMax) : Infinity;
    const valueMatch = espelho.valorLiquido >= minValue && espelho.valorLiquido <= maxValue;
    
    return searchTermMatch && statusMatch && agencyMatch && valueMatch;
  });
};

export const filterEmpenhos = (empenhos: Empenho[], criteria: FilterCriteria): Empenho[] => {
  return empenhos.filter(empenho => {
    // Search term filter
    const searchTermMatch = 
      criteria.searchTerm === '' || 
      empenho.numero.toLowerCase().includes(criteria.searchTerm.toLowerCase()) ||
      empenho.campanha.toLowerCase().includes(criteria.searchTerm.toLowerCase()) ||
      (empenho.seiProcesso && empenho.seiProcesso.toLowerCase().includes(criteria.searchTerm.toLowerCase()));
    
    // Status filter
    const statusMatch = 
      criteria.filterStatus === '' || 
      empenho.status === criteria.filterStatus;
    
    // Value range filter
    const minValue = criteria.filterValorMin ? parseFloat(criteria.filterValorMin) : 0;
    const maxValue = criteria.filterValorMax ? parseFloat(criteria.filterValorMax) : Infinity;
    const valueMatch = empenho.valorLiquido >= minValue && empenho.valorLiquido <= maxValue;
    
    return searchTermMatch && statusMatch && valueMatch;
  });
};
