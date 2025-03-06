
import { formatCurrency } from '@/lib/utils';
import SummaryCard from './SummaryCard';

const AnnualBudgetCard = () => {
  // This could be made dynamic with props in the future
  const budgetAmount = 2200000;
  const year = 2023;

  return (
    <SummaryCard
      title="Orçamento Anual"
      value={formatCurrency(budgetAmount)}
      description={`Total planejado para ${year}`}
    />
  );
};

export default AnnualBudgetCard;
