
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';

const RelatoriosPage = () => {
  const [periodoFiltro, setPeriodoFiltro] = useState('2023');
  
  // Dados de exemplo para os gráficos
  const dadosGastosMensais = [
    { mes: 'Jan', valor: 150000 },
    { mes: 'Fev', valor: 180000 },
    { mes: 'Mar', valor: 220000 },
    { mes: 'Abr', valor: 250000 },
    { mes: 'Mai', valor: 300000 },
    { mes: 'Jun', valor: 280000 },
    { mes: 'Jul', valor: 260000 },
    { mes: 'Ago', valor: 240000 },
    { mes: 'Set', valor: 220000 },
    { mes: 'Out', valor: 210000 },
    { mes: 'Nov', valor: 190000 },
    { mes: 'Dez', valor: 170000 },
  ];
  
  const dadosGastosPorCategoria = [
    { nome: 'Mídia Digital', valor: 450000 },
    { nome: 'Mídia Impressa', valor: 300000 },
    { nome: 'Rádio', valor: 150000 },
    { nome: 'TV', valor: 800000 },
    { nome: 'Outdoor', valor: 200000 },
  ];
  
  const dadosCampanhasPorStatus = [
    { nome: 'Em Andamento', valor: 15, cor: '#3498db' },
    { nome: 'Concluídas', valor: 25, cor: '#2ecc71' },
    { nome: 'Planejadas', valor: 10, cor: '#f39c12' },
    { nome: 'Canceladas', valor: 5, cor: '#e74c3c' },
  ];
  
  const relatoriosDisponiveis = [
    { id: 1, titulo: 'Relatório de Desempenho de Mídia 2023', data: '2023-08-25', tipo: 'PDF' },
    { id: 2, titulo: 'Análise de Campanhas - 1º Semestre 2023', data: '2023-07-15', tipo: 'Excel' },
    { id: 3, titulo: 'Prestação de Contas - Campanha Vacinação', data: '2023-06-30', tipo: 'PDF' },
    { id: 4, titulo: 'Relatório de Investimentos em Mídia', data: '2023-05-20', tipo: 'PDF' },
    { id: 5, titulo: 'Métricas de Desempenho Digital', data: '2023-04-10', tipo: 'Excel' },
  ];

  return (
    <Layout title="Relatórios" description="Visualização e download de relatórios de campanhas">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Gastos por Mês</CardTitle>
              <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="w-full h-[300px] flex justify-center">
              <LineChart
                width={600}
                height={300}
                data={dadosGastosMensais}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Legend />
                <Line type="monotone" dataKey="valor" stroke="#3498db" activeDot={{ r: 8 }} name="Valor Gasto (R$)" />
              </LineChart>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Campanhas por Status</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="w-full h-[300px] flex justify-center items-center">
              <PieChart width={250} height={250}>
                <Pie
                  data={dadosCampanhasPorStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  nameKey="nome"
                  label={({ nome, percent }) => `${nome}: ${(percent * 100).toFixed(0)}%`}
                >
                  {dadosCampanhasPorStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} campanhas`} />
              </PieChart>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="w-full h-[300px] flex justify-center">
              <BarChart
                width={600}
                height={300}
                data={dadosGastosPorCategoria}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                <Legend />
                <Bar dataKey="valor" fill="#2ecc71" name="Valor Gasto (R$)" />
              </BarChart>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[280px] overflow-auto pr-2">
              {relatoriosDisponiveis.map((relatorio) => (
                <div key={relatorio.id} className="flex items-center p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <div className="mr-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{relatorio.titulo}</div>
                    <div className="text-xs text-muted-foreground">{relatorio.data}</div>
                  </div>
                  <div className="ml-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      relatorio.tipo === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {relatorio.tipo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Painel de Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gastos">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="gastos">
                <LineChartIcon className="h-4 w-4 mr-2" /> Gastos
              </TabsTrigger>
              <TabsTrigger value="campanhas">
                <BarChart3 className="h-4 w-4 mr-2" /> Campanhas
              </TabsTrigger>
              <TabsTrigger value="midias">
                <PieChartIcon className="h-4 w-4 mr-2" /> Mídias
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="gastos">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Selecione critérios para gerar um relatório personalizado de gastos por período.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Período Inicial</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jan2023">Janeiro 2023</SelectItem>
                        <SelectItem value="fev2023">Fevereiro 2023</SelectItem>
                        <SelectItem value="mar2023">Março 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Período Final</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ago2023">Agosto 2023</SelectItem>
                        <SelectItem value="set2023">Setembro 2023</SelectItem>
                        <SelectItem value="out2023">Outubro 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Formato</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full md:w-auto">
                  <Download className="h-4 w-4 mr-2" /> Gerar Relatório
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="campanhas">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Gere relatórios detalhados sobre o desempenho de campanhas específicas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Campanha</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="camp1">Campanha de Vacinação</SelectItem>
                        <SelectItem value="camp2">Ação de Conscientização</SelectItem>
                        <SelectItem value="camp3">Evento de Lançamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desempenho">Desempenho</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="completo">Completo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Formato</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full md:w-auto">
                  <Download className="h-4 w-4 mr-2" /> Gerar Relatório
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="midias">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Analise a distribuição de investimentos em diferentes tipos de mídia.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ano</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Agrupar por</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tipo">Tipo de Mídia</SelectItem>
                        <SelectItem value="veiculo">Veículo</SelectItem>
                        <SelectItem value="campanha">Campanha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Formato</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full md:w-auto">
                  <Download className="h-4 w-4 mr-2" /> Gerar Relatório
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default RelatoriosPage;
