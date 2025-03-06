
import { formatCurrency } from '@/lib/utils';

interface BudgetSummaryProps {
  totalAllocated: number;
  totalBudget: number;
  remainingBudget: number;
}

const BudgetSummary = ({ totalAllocated, totalBudget, remainingBudget }: BudgetSummaryProps) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Alocações de Orçamento</h3>
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Alocado:</span> {formatCurrency(totalAllocated)} / {formatCurrency(totalBudget)}
        <span className="ml-4 font-medium">Disponível:</span> {formatCurrency(remainingBudget)}
      </div>
    </div>
  );
};

export default BudgetSummary;
