
import { formatCurrency } from '@/lib/utils';
import SummaryCard from './SummaryCard';
import { useBiggestMonth } from '@/hooks/useBiggestMonth';
import { sampleMediaPlans } from '@/lib/data';

const BiggestMonthCard = () => {
  // Use the hook to get the month with the highest total value
  const { month, amount } = useBiggestMonth(sampleMediaPlans);

  return (
    <SummaryCard
      title="Maior Mês"
      value={formatCurrency(amount)}
      description={month}
    />
  );
};

export default BiggestMonthCard;
