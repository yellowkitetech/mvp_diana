
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Dados fictícios para o gráfico de subtipo de serviço
const subtypeData = [
  { name: 'Impressos', value: 280000 },
  { name: 'Spots de Rádio', value: 230000 },
  { name: 'Comerciais de TV', value: 520000 },
  { name: 'Outdoors', value: 320000 },
  { name: 'Mídias Sociais', value: 380000 },
  { name: 'Eventos', value: 270000 },
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

const SubtypeServiceChart = () => {
  return (
    <Card className="border border-diana-gray bg-white col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-diana-darkBlue">Valor por Subtipo de Serviço</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={subtypeData}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => formatCurrency(value).slice(0, -3) + 'k'} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="value" name="Valor (R$)" fill="#805AD5" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SubtypeServiceChart;
