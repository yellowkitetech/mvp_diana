
import { formatCurrency } from '@/lib/utils';

export const formatTooltipValue = (value: number): string => {
  return formatCurrency(value);
};
