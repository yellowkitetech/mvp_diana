
import AnnualBudgetCard from './cards/AnnualBudgetCard';
import BiggestMonthCard from './cards/BiggestMonthCard';
import BiggestSupplierCard from './cards/BiggestSupplierCard';
import BiggestCampaignCard from './cards/BiggestCampaignCard';

const BudgetSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <AnnualBudgetCard />
      <BiggestMonthCard />
      <BiggestSupplierCard />
      <BiggestCampaignCard />
    </div>
  );
};

export default BudgetSummaryCards;
