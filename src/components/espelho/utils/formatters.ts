
// Utility functions for formatting values

/**
 * Format a number as currency (BRL)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Format a date as a string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR');
};
