
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, FileText, Building, Calendar } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Campaign } from '@/lib/types/campaign';
import { Department } from '@/lib/types/department';
import { Agency } from '@/lib/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Dados de exemplo
const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Campanha Vacinação 2023',
    description: 'Campanha anual de vacinação',
    startDate: '2023-08-01',
    endDate: '2023-09-30',
    totalBudget: 150000,
    status: 'in-progress',
    budgetAllocations: [],
    createdAt: '2023-07-15',
    updatedAt: '2023-07-15',
    department: 'Secretaria de Saúde',
    seiNumber: '00123.45678/2023-01',
  },
  {
    id: '2',
    title: 'Campanha Educativa de Trânsito',
    description: 'Conscientização sobre segurança no trânsito',
    startDate: '2023-09-15',
    endDate: '2023-10-15',
    totalBudget: 80000,
    status: 'pending',
    budgetAllocations: [],
    createdAt: '2023-08-20',
    updatedAt: '2023-08-20',
    department: 'Secretaria de Mobilidade Urbana',
    seiNumber: '00123.98765/2023-02',
  },
  {
    id: '3',
    title: 'Lançamento Programa Habitacional',
    description: 'Divulgação do novo programa habitacional',
    startDate: '2023-10-01',
    endDate: '2023-11-15',
    totalBudget: 200000,
    status: 'pending',
    budgetAllocations: [],
    createdAt: '2023-08-25',
    updatedAt: '2023-08-25',
    department: 'Secretaria de Habitação',
    seiNumber: '00123.56789/2023-03',
  }
];

// Exemplo de secretarias
const sampleDepartments: Department[] = [
  { id: '1', name: 'Secretaria de Saúde', contactEmail: 'saude@gov.br', contactPhone: '6133334444', active: true },
  { id: '2', name: 'Secretaria de Educação', contactEmail: 'educacao@gov.br', contactPhone: '6133335555', active: true },
  { id: '3', name: 'Secretaria de Mobilidade Urbana', contactEmail: 'mobilidade@gov.br', contactPhone: '6133336666', active: true },
  { id: '4', name: 'Secretaria de Habitação', contactEmail: 'habitacao@gov.br', contactPhone: '6133337777', active: true },
];

// Exemplo de agências
const sampleAgencies: Agency[] = [
  { id: '1', name: 'Agência Publicidade A', contactPerson: 'João Silva', email: 'joao@agenciaa.com', phone: '6199998888', address: 'Brasília, DF', active: true },
  { id: '2', name: 'Agência Marketing B', contactPerson: 'Maria Souza', email: 'maria@agenciab.com', phone: '6199997777', address: 'Brasília, DF', active: true },
];

const CampaignManager: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(sampleCampaigns);
  const [showCampaignForm, setShowCampaignForm] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Em andamento</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Concluída</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" /> Filtrar por Status
          </Button>
          <Button variant="outline" className="gap-2">
            <Building className="h-4 w-4" /> Filtrar por Secretaria
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" /> Filtrar por Data
          </Button>
        </div>
        <Dialog open={showCampaignForm} onOpenChange={setShowCampaignForm}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Formulário de cadastro de campanha será implementado aqui.
                </p>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Secretaria</TableHead>
              <TableHead>Nº Processo SEI</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Orçamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.title}</TableCell>
                <TableCell>{campaign.department}</TableCell>
                <TableCell>{campaign.seiNumber || "—"}</TableCell>
                <TableCell>
                  {formatDate(campaign.startDate)} a {formatDate(campaign.endDate)}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(campaign.totalBudget)}
                </TableCell>
                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignManager;
