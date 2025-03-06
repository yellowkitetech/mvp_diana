
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BudgetFormHeaderProps {
  year: string;
  setYear: (year: string) => void;
  month: string;
  setMonth: (month: string) => void;
  totalBudget: string;
  setTotalBudget: (budget: string) => void;
  months: { value: string; label: string }[];
}

const BudgetFormHeader = ({
  year,
  setYear,
  month,
  setMonth,
  totalBudget,
  setTotalBudget,
  months
}: BudgetFormHeaderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="year">Ano</Label>
        <Input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="2000"
          max="2100"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="month">Mês</Label>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger id="month">
            <SelectValue placeholder="Selecione o mês" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="totalBudget">Orçamento Total (R$)</Label>
        <Input
          id="totalBudget"
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
};

export default BudgetFormHeader;
