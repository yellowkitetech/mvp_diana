
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { monthlyData } from './budgetSummaryData';
import { formatTooltipValue } from './chartUtils';

const MonthlyDistributionTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição Mensal do Orçamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatTooltipValue} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Bar dataKey="value" name="Valor Planejado (R$)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyDistributionTab;
