
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Dados fictícios para o gráfico de tipo de serviço
const serviceTypeData = [
  { name: 'Criação', value: 350000, fill: '#3182CE' },
  { name: 'Veiculação', value: 1200000, fill: '#38A169' },
  { name: 'Produção', value: 650000, fill: '#ECC94B' },
  { name: 'Promoção', value: 450000, fill: '#E53E3E' },
  { name: 'Digital', value: 580000, fill: '#805AD5' },
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

const ServiceTypeChart = () => {
  return (
    <Card className="border border-diana-gray bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-diana-darkBlue">Valor por Tipo de Serviço</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={serviceTypeData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {serviceTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ServiceTypeChart;
