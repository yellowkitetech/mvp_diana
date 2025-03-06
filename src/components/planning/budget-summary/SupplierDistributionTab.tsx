
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { supplierData } from './budgetSummaryData';
import { formatTooltipValue } from './chartUtils';

const SupplierDistributionTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Fornecedor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={supplierData} layout="vertical">
              <XAxis type="number" tickFormatter={formatTooltipValue} />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Bar dataKey="value" name="Valor Planejado (R$)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierDistributionTab;
