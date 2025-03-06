
import { formatCurrency } from '@/lib/utils';
import SummaryCard from './SummaryCard';

const BiggestSupplierCard = () => {
  // This could be made dynamic with props in the future
  const amount = 520000;
  const supplier = "TV Centro-Oeste";

  return (
    <SummaryCard
      title="Maior Fornecedor"
      value={formatCurrency(amount)}
      description={supplier}
    />
  );
};

export default BiggestSupplierCard;
