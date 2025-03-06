
import { useMemo } from 'react';
import { MediaPlan } from '@/lib/types/media';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface BiggestMonthData {
  month: string;
  amount: number;
}

export const useBiggestMonth = (mediaPlans: MediaPlan[]): BiggestMonthData => {
  const biggestMonth = useMemo(() => {
    // Group media plans by month
    const monthlyTotals = mediaPlans.reduce((acc, plan) => {
      // Get the month from the startDate
      const date = parseISO(plan.startDate);
      const monthKey = format(date, 'yyyy-MM');
      const formattedMonth = format(date, 'MMMM/yyyy', { locale: ptBR });
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: formattedMonth,
          amount: 0
        };
      }
      
      acc[monthKey].amount += plan.totalValue;
      return acc;
    }, {} as Record<string, BiggestMonthData>);
    
    // Find the month with the highest total
    const months = Object.values(monthlyTotals);
    if (months.length === 0) {
      return {
        month: "Sem dados",
        amount: 0
      };
    }
    
    return months.reduce((max, current) => 
      current.amount > max.amount ? current : max, 
      months[0]
    );
  }, [mediaPlans]);
  
  return biggestMonth;
};
