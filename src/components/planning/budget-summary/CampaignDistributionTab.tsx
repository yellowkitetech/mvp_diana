
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { campaignData } from './budgetSummaryData';
import { formatTooltipValue } from './chartUtils';

const CampaignDistributionTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Campanha</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignData} layout="vertical">
              <XAxis type="number" tickFormatter={formatTooltipValue} />
              <YAxis type="category" dataKey="name" width={180} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Bar dataKey="value" name="Valor Planejado (R$)" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignDistributionTab;
