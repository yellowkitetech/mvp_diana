
import { formatCurrency } from '@/lib/utils';
import SummaryCard from './SummaryCard';

const BiggestCampaignCard = () => {
  // This could be made dynamic with props in the future
  const amount = 680000;
  const campaign = "Festival Cultural";

  return (
    <SummaryCard
      title="Maior Campanha"
      value={formatCurrency(amount)}
      description={campaign}
    />
  );
};

export default BiggestCampaignCard;
