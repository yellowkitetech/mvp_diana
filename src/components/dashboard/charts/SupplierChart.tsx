
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Dados fictícios para o gráfico de fornecedores
const supplierData = [
  { name: 'Agência Criativa', value: 380000 },
  { name: 'Rádio Cidade', value: 250000 },
  { name: 'TV Centro-Oeste', value: 480000 },
  { name: 'Outdoor Brasil', value: 220000 },
  { name: 'Gráfica Express', value: 170000 },
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

const SupplierChart = () => {
  return (
    <Card className="border border-diana-gray bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-diana-darkBlue">Valor por Fornecedor</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={supplierData} layout="vertical">
            <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
            <YAxis type="category" dataKey="name" width={130} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="value" name="Valor (R$)" fill="#38A169" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SupplierChart;
