
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Dados fictícios para o gráfico de campanhas
const campaignData = [
  { name: 'Campanha de Vacinação', value: 520000 },
  { name: 'Programa Educacional', value: 480000 },
  { name: 'Festival Cultural', value: 630000 },
  { name: 'Conscientização Ambiental', value: 350000 },
  { name: 'Campanha de Turismo', value: 420000 },
];

// Formatar valores para exibição em Reais
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CampaignChart = () => {
  return (
    <Card className="border border-diana-gray bg-white col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-diana-darkBlue">Valor Gasto por Campanha</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={campaignData} layout="vertical">
            <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
            <YAxis type="category" dataKey="name" width={150} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="value" name="Valor (R$)" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CampaignChart;
