
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Campaign } from '@/lib/types';
import { CalendarRange, Edit, FileText, Plus, Search, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency, formatDate } from '@/lib/utils';
import CampaignForm from './CampaignForm';

// Dados de exemplo
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Campanha de Vacinação',
    description: 'Campanha nacional de vacinação contra a gripe',
    startDate: '2023-05-01',
    endDate: '2023-06-15',
    totalBudget: 150000,
    status: 'in-progress',
    budgetAllocations: [],
    createdAt: '2023-04-15T10:00:00Z',
    updatedAt: '2023-04-15T10:00:00Z',
    seiNumber: '00001.000123/2023-45',
    commitmentNumber: '2023NE000123',
    department: 'dept1',
    responsibleUser: 'user1'
  },
  {
    id: '2',
    title: 'Programa Educacional',
    description: 'Divulgação do novo programa educacional',
    startDate: '2023-07-01',
    endDate: '2023-08-30',
    totalBudget: 200000,
    status: 'pending',
    budgetAllocations: [],
    createdAt: '2023-06-10T14:30:00Z',
    updatedAt: '2023-06-10T14:30:00Z'
  },
  {
    id: '3',
    title: 'Festival Cultural',
    description: 'Divulgação do festival cultural nacional',
    startDate: '2023-09-10',
    endDate: '2023-10-10',
    totalBudget: 180000,
    status: 'pending',
    budgetAllocations: [],
    createdAt: '2023-08-01T09:15:00Z',
    updatedAt: '2023-08-01T09:15:00Z',
    seiNumber: '00001.000456/2023-78'
  },
  {
    id: '4',
    title: 'Campanha de Trânsito',
    description: 'Conscientização sobre segurança no trânsito',
    startDate: '2023-04-15',
    endDate: '2023-05-30',
    totalBudget: 120000,
    status: 'completed',
    budgetAllocations: [],
    createdAt: '2023-03-20T11:00:00Z',
    updatedAt: '2023-05-31T09:00:00Z',
    seiNumber: '00001.000789/2023-90',
    commitmentNumber: '2023NE000456'
  },
  {
    id: '5',
    title: 'Incentivo ao Turismo',
    description: 'Promoção de destinos turísticos nacionais',
    startDate: '2023-11-01',
    endDate: '2023-12-15',
    totalBudget: 250000,
    status: 'pending',
    budgetAllocations: [],
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-09-15T10:30:00Z'
  }
];

const CampaignList = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | undefined>(undefined);
  
  const handleAddNew = () => {
    setCurrentCampaign(undefined);
    setIsFormOpen(true);
  };
  
  const handleEdit = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setIsFormOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta campanha?")) {
      setCampaigns(campaigns.filter(c => c.id !== id));
      
      toast({
        title: "Campanha excluída",
        description: "A campanha foi excluída com sucesso."
      });
    }
  };
  
  const handleSave = (campaign: Partial<Campaign>) => {
    if (campaign.id) {
      // Atualização
      setCampaigns(campaigns.map(c => 
        c.id === campaign.id ? { ...c, ...campaign } as Campaign : c
      ));
    } else {
      // Nova campanha
      const newCampaign = {
        ...campaign,
        id: `${Date.now()}`, // Gerar ID temporário
        budgetAllocations: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Campaign;
      
      setCampaigns([...campaigns, newCampaign]);
    }
    
    setIsFormOpen(false);
    
    toast({
      title: campaign.id ? "Campanha atualizada" : "Campanha criada",
      description: `A campanha foi ${campaign.id ? "atualizada" : "criada"} com sucesso.`
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pendente</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">Em andamento</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Concluída</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelada</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (campaign.seiNumber && campaign.seiNumber.includes(searchTerm)) ||
    (campaign.commitmentNumber && campaign.commitmentNumber.includes(searchTerm))
  );
  
  // Contabilizar campanhas sem SEI ou empenho
  const campaignsWithoutSEI = campaigns.filter(c => !c.seiNumber).length;
  const campaignsWithoutCommitment = campaigns.filter(c => !c.commitmentNumber).length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar campanhas..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Nova Campanha
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total de Campanhas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {campaigns.filter(c => c.status === 'in-progress').length} em andamento
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Sem Número SEI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{campaignsWithoutSEI}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((campaignsWithoutSEI / campaigns.length) * 100).toFixed(0)}% do total de campanhas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Sem Número Empenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{campaignsWithoutCommitment}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((campaignsWithoutCommitment / campaigns.length) * 100).toFixed(0)}% do total de campanhas
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Lista de Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCampaigns.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome / Descrição</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Números</TableHead>
                    <TableHead className="text-right">Orçamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {campaign.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarRange className="h-4 w-4 mr-1 text-muted-foreground" />
                          <div className="text-sm">
                            <p>{formatDate(campaign.startDate)}</p>
                            <p>{formatDate(campaign.endDate)}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {campaign.seiNumber ? (
                            <p>SEI: {campaign.seiNumber}</p>
                          ) : (
                            <p className="text-muted-foreground">SEI: Não informado</p>
                          )}
                          {campaign.commitmentNumber ? (
                            <p>NE: {campaign.commitmentNumber}</p>
                          ) : (
                            <p className="text-muted-foreground">NE: Não informado</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(campaign.totalBudget)}
                      </TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(campaign)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(campaign.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Detalhes</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CalendarRange className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhuma campanha encontrada</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                {searchTerm 
                  ? `Não encontramos campanhas com o termo "${searchTerm}".` 
                  : 'Você ainda não cadastrou nenhuma campanha.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-5xl">
          <CampaignForm
            campaign={currentCampaign}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignList;
