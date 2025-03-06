
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Commitment, Campaign, Supplier } from '@/lib/types';
import { Edit, FileText, FilePlus, Search, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Dados de exemplo
const mockCommitments: Commitment[] = [
  {
    id: '1',
    number: '2023NE000123',
    value: 150000,
    issueDate: '2023-04-15',
    description: 'Empenho para campanha de vacinação',
    campaignId: '1',
    supplierIds: ['1', '3'],
    createdAt: '2023-04-15T10:00:00Z',
    updatedAt: '2023-04-15T10:00:00Z',
    status: 'approved'
  },
  {
    id: '2',
    number: '2023NE000456',
    value: 120000,
    issueDate: '2023-03-20',
    description: 'Empenho para campanha de trânsito',
    campaignId: '4',
    supplierIds: ['2', '5'],
    createdAt: '2023-03-20T11:00:00Z',
    updatedAt: '2023-03-20T11:00:00Z',
    status: 'used'
  },
  {
    id: '3',
    number: '2023NE000789',
    value: 200000,
    issueDate: '2023-06-10',
    description: 'Empenho para programa educacional',
    campaignId: '2',
    supplierIds: ['4'],
    createdAt: '2023-06-10T14:30:00Z',
    updatedAt: '2023-06-10T14:30:00Z',
    status: 'pending'
  },
  {
    id: '4',
    number: '2023NE000321',
    value: 180000,
    issueDate: '2023-08-01',
    description: 'Empenho para festival cultural',
    campaignId: '3',
    supplierIds: ['1', '2', '5'],
    createdAt: '2023-08-01T09:15:00Z',
    updatedAt: '2023-08-01T09:15:00Z',
    status: 'pending'
  },
  {
    id: '5',
    number: '2023NE000654',
    value: 50000,
    issueDate: '2023-05-05',
    description: 'Empenho complementar para campanha de vacinação',
    campaignId: '1',
    supplierIds: ['3'],
    createdAt: '2023-05-05T16:45:00Z',
    updatedAt: '2023-05-05T16:45:00Z',
    status: 'cancelled'
  }
];

// Dados de exemplo de campanhas e fornecedores
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Campanha de Vacinação',
    description: '',
    startDate: '',
    endDate: '',
    totalBudget: 0,
    status: 'in-progress',
    budgetAllocations: [],
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '2',
    title: 'Programa Educacional',
    description: '',
    startDate: '',
    endDate: '',
    totalBudget: 0,
    status: 'pending',
    budgetAllocations: [],
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '3',
    title: 'Festival Cultural',
    description: '',
    startDate: '',
    endDate: '',
    totalBudget: 0,
    status: 'pending',
    budgetAllocations: [],
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '4',
    title: 'Campanha de Trânsito',
    description: '',
    startDate: '',
    endDate: '',
    totalBudget: 0,
    status: 'completed',
    budgetAllocations: [],
    createdAt: '',
    updatedAt: ''
  }
];

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Rádio Cidade FM',
    companyName: '',
    group: '',
    cnpj: '',
    serviceTypes: [],
    serviceSubtypes: [],
    email: '',
    whatsapp: '',
    active: true
  },
  {
    id: '2',
    name: 'Agência Criativa',
    companyName: '',
    group: '',
    cnpj: '',
    serviceTypes: [],
    serviceSubtypes: [],
    email: '',
    whatsapp: '',
    active: true
  },
  {
    id: '3',
    name: 'Outdoor Brasil',
    companyName: '',
    group: '',
    cnpj: '',
    serviceTypes: [],
    serviceSubtypes: [],
    email: '',
    whatsapp: '',
    active: true
  },
  {
    id: '4',
    name: 'Gráfica Express',
    companyName: '',
    group: '',
    cnpj: '',
    serviceTypes: [],
    serviceSubtypes: [],
    email: '',
    whatsapp: '',
    active: true
  },
  {
    id: '5',
    name: 'TV Centro-Oeste',
    companyName: '',
    group: '',
    cnpj: '',
    serviceTypes: [],
    serviceSubtypes: [],
    email: '',
    whatsapp: '',
    active: true
  }
];

const CommitmentList = () => {
  const { toast } = useToast();
  const [commitments, setCommitments] = useState<Commitment[]>(mockCommitments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCommitment, setCurrentCommitment] = useState<Commitment | null>(null);
  
  // Formulário
  const [number, setNumber] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [supplierIds, setSupplierIds] = useState<string[]>([]);
  const [issueDate, setIssueDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<'pending' | 'approved' | 'used' | 'cancelled'>('pending');
  
  const resetForm = () => {
    setNumber('');
    setValue('');
    setDescription('');
    setCampaignId('');
    setSupplierIds([]);
    setIssueDate(undefined);
    setStatus('pending');
    setCurrentCommitment(null);
  };
  
  const handleAddNew = () => {
    resetForm();
    setIsFormOpen(true);
  };
  
  const handleEdit = (commitment: Commitment) => {
    setCurrentCommitment(commitment);
    setNumber(commitment.number);
    setValue(commitment.value.toString());
    setDescription(commitment.description);
    setCampaignId(commitment.campaignId || '');
    setSupplierIds(commitment.supplierIds);
    setIssueDate(new Date(commitment.issueDate));
    setStatus(commitment.status);
    setIsFormOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este empenho?")) {
      setCommitments(commitments.filter(c => c.id !== id));
      
      toast({
        title: "Empenho excluído",
        description: "O empenho foi excluído com sucesso."
      });
    }
  };
  
  const handleSave = () => {
    if (!number || !value || !description || !issueDate) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    const valueNumber = parseFloat(value);
    if (isNaN(valueNumber) || valueNumber <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um valor válido.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentCommitment) {
      // Atualização
      setCommitments(commitments.map(c => 
        c.id === currentCommitment.id 
          ? { 
              ...c, 
              number, 
              value: valueNumber,
              description, 
              issueDate: issueDate.toISOString().split('T')[0],
              campaignId: campaignId || undefined,
              supplierIds,
              status,
              updatedAt: new Date().toISOString() 
            } 
          : c
      ));
      
      toast({
        title: "Empenho atualizado",
        description: "O empenho foi atualizado com sucesso."
      });
    } else {
      // Novo empenho
      const newCommitment: Commitment = {
        id: `${Date.now()}`,
        number,
        value: valueNumber,
        description,
        issueDate: issueDate.toISOString().split('T')[0],
        campaignId: campaignId || undefined,
        supplierIds,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setCommitments([...commitments, newCommitment]);
      
      toast({
        title: "Empenho criado",
        description: "O empenho foi criado com sucesso."
      });
    }
    
    resetForm();
    setIsFormOpen(false);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pendente</Badge>;
      case 'approved':
        return <Badge className="bg-blue-500">Aprovado</Badge>;
      case 'used':
        return <Badge className="bg-green-500">Utilizado</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  const getCampaignTitle = (id: string) => {
    const campaign = mockCampaigns.find(c => c.id === id);
    return campaign ? campaign.title : 'Sem campanha';
  };
  
  const getSupplierNames = (ids: string[]) => {
    return ids.map(id => {
      const supplier = mockSuppliers.find(s => s.id === id);
      return supplier ? supplier.name : '';
    }).filter(Boolean).join(', ');
  };
  
  const filteredCommitments = commitments.filter(commitment => 
    commitment.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    commitment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (commitment.campaignId && getCampaignTitle(commitment.campaignId).toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar empenhos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddNew}>
          <FilePlus className="mr-2 h-4 w-4" /> Novo Empenho
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Empenhos</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCommitments.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Campanha</TableHead>
                    <TableHead>Fornecedores</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommitments.map((commitment) => (
                    <TableRow key={commitment.id}>
                      <TableCell className="font-medium">{commitment.number}</TableCell>
                      <TableCell className="max-w-[250px] truncate">
                        {commitment.description}
                      </TableCell>
                      <TableCell>
                        {commitment.campaignId ? getCampaignTitle(commitment.campaignId) : 
                          <span className="text-muted-foreground">-</span>}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate">
                          {getSupplierNames(commitment.supplierIds)}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(commitment.issueDate)}</TableCell>
                      <TableCell>{formatCurrency(commitment.value)}</TableCell>
                      <TableCell>{getStatusBadge(commitment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(commitment)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(commitment.id)}>
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
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum empenho encontrado</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                {searchTerm 
                  ? `Não encontramos empenhos com o termo "${searchTerm}".` 
                  : 'Você ainda não cadastrou nenhum empenho.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) resetForm();
        setIsFormOpen(open);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentCommitment ? 'Editar Empenho' : 'Novo Empenho'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número do Empenho <span className="text-red-500">*</span></Label>
                <Input 
                  id="number" 
                  value={number} 
                  onChange={(e) => setNumber(e.target.value)} 
                  placeholder="Ex: 2023NE000123" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor (R$) <span className="text-red-500">*</span></Label>
                <Input 
                  id="value" 
                  type="number" 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} 
                  placeholder="0,00" 
                  min="0" 
                  step="0.01" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Descrição do empenho" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campaign">Campanha</Label>
                <Select value={campaignId} onValueChange={setCampaignId}>
                  <SelectTrigger id="campaign">
                    <SelectValue placeholder="Selecione a campanha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhuma campanha</SelectItem>
                    {mockCampaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data de Emissão <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {issueDate ? (
                        format(issueDate, "PP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={issueDate}
                      onSelect={setIssueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="suppliers">Fornecedores</Label>
              <Select 
                value={supplierIds.length > 0 ? 'selected' : ''}
                onValueChange={(value) => {
                  if (value === 'selected') return;
                  if (value === '') setSupplierIds([]);
                  else setSupplierIds([...supplierIds, value]);
                }}
              >
                <SelectTrigger id="suppliers">
                  <SelectValue placeholder="Selecione os fornecedores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum fornecedor</SelectItem>
                  {mockSuppliers
                    .filter(supplier => !supplierIds.includes(supplier.id))
                    .map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  {supplierIds.length > 0 && (
                    <SelectItem value="selected">
                      {supplierIds.length} fornecedor(es) selecionado(s)
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              
              {supplierIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {supplierIds.map(id => {
                    const supplier = mockSuppliers.find(s => s.id === id);
                    return supplier ? (
                      <Badge 
                        key={id} 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {supplier.name}
                        <button 
                          onClick={() => setSupplierIds(supplierIds.filter(s => s !== id))}
                          className="ml-1 h-4 w-4 rounded-full bg-muted-foreground/20 inline-flex items-center justify-center hover:bg-muted-foreground/40"
                        >
                          ×
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="approved">Aprovado</SelectItem>
                  <SelectItem value="used">Utilizado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsFormOpen(false);
            }}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommitmentList;
