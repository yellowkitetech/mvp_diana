
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, CheckCircle, AlertCircle, Clock, FileText, SlidersHorizontal, Trash, RefreshCw, AlertTriangle } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { ApprovalStatus } from '@/lib/types';

const ProducaoPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFornecedor, setFilterFornecedor] = useState('all');
  const [filterCampaign, setFilterCampaign] = useState('all');
  const [filterSeiNumber, setFilterSeiNumber] = useState('all');
  const [filterCommitmentNumber, setFilterCommitmentNumber] = useState('all');
  
  // Estados para seleção múltipla
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<ApprovalStatus>('approved');
  
  // Dados de exemplo
  const ordensProducao = [
    { 
      id: 1, 
      numero: 'PP-2023-001', 
      titulo: 'Impressão de Folhetos', 
      campanha: 'Campanha de Vacinação', 
      fornecedor: 'Gráfica XYZ', 
      valorTotal: 25000, 
      dataEntrega: '2023-09-15', 
      status: 'approved',
      seiNumber: '00001.000123/2023-45',
      commitmentNumber: '2023NE000123'
    },
    { 
      id: 2, 
      numero: 'PP-2023-002', 
      titulo: 'Produção de Vídeo', 
      campanha: 'Ação de Conscientização', 
      fornecedor: 'Produtora ABC', 
      valorTotal: 75000, 
      dataEntrega: '2023-09-30', 
      status: 'pending',
      seiNumber: '00001.000456/2023-78',
      commitmentNumber: ''
    },
    { 
      id: 3, 
      numero: 'PP-2023-003', 
      titulo: 'Locução de Spot', 
      campanha: 'Evento de Lançamento', 
      fornecedor: 'Estúdio Som', 
      valorTotal: 8000, 
      dataEntrega: '2023-09-10', 
      status: 'approved',
      seiNumber: '00001.000789/2023-90',
      commitmentNumber: '2023NE000456'
    },
    { 
      id: 4, 
      numero: 'PP-2023-004', 
      titulo: 'Banners e Faixas', 
      campanha: 'Campanha Educativa', 
      fornecedor: 'Gráfica XYZ', 
      valorTotal: 12000, 
      dataEntrega: '2023-10-05', 
      status: 'rejected',
      seiNumber: '',
      commitmentNumber: ''
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Aprovado</Badge>;
      case 'pending':
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Pendente</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const filteredOrdens = ordensProducao.filter(ordem => {
    // Filtro de busca
    if (searchTerm && 
        !ordem.numero.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ordem.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ordem.campanha.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ordem.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ordem.seiNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ordem.commitmentNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtro de status
    if (filterStatus !== 'all' && ordem.status !== filterStatus) return false;
    
    // Filtro de fornecedor
    if (filterFornecedor !== 'all' && ordem.fornecedor !== filterFornecedor) return false;
    
    // Filtro de campanha
    if (filterCampaign !== 'all' && ordem.campanha !== filterCampaign) return false;
    
    // Filtro de processo SEI
    if (filterSeiNumber !== 'all') {
      if (filterSeiNumber === 'empty' && ordem.seiNumber) return false;
      if (filterSeiNumber === 'filled' && !ordem.seiNumber) return false;
    }
    
    // Filtro de número de empenho
    if (filterCommitmentNumber !== 'all') {
      if (filterCommitmentNumber === 'empty' && ordem.commitmentNumber) return false;
      if (filterCommitmentNumber === 'filled' && !ordem.commitmentNumber) return false;
    }
    
    return true;
  });
  
  const toggleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems(filteredOrdens.map(ordem => ordem.id));
    } else {
      setSelectedItems([]);
    }
  };
  
  const toggleSelectItem = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };
  
  const resetFilters = () => {
    setFilterStatus('all');
    setFilterFornecedor('all');
    setFilterCampaign('all');
    setFilterSeiNumber('all');
    setFilterCommitmentNumber('all');
    setSearchTerm('');
    setIsFilterOpen(false);
  };
  
  const handleBulkStatusChange = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Nenhum item selecionado",
        description: "Selecione pelo menos um item para realizar esta ação.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Status atualizado em massa",
      description: `${selectedItems.length} item(s) ${bulkStatus === 'approved' ? 'aprovado(s)' : bulkStatus === 'rejected' ? 'rejeitado(s)' : 'atualizado(s)'} com sucesso.`,
    });
    
    setSelectedItems([]);
    setBulkActionOpen(false);
  };
  
  // Lista única de fornecedores para o filtro
  const fornecedores = [...new Set(ordensProducao.map(ordem => ordem.fornecedor))];
  
  // Lista única de campanhas para o filtro
  const campanhas = [...new Set(ordensProducao.map(ordem => ordem.campanha))];

  // Lista única de processos SEI para o filtro (não vazios)
  const seiNumbers = [...new Set(ordensProducao.map(ordem => ordem.seiNumber).filter(Boolean))];
  
  // Lista única de números de empenho para o filtro (não vazios)
  const commitmentNumbers = [...new Set(ordensProducao.map(ordem => ordem.commitmentNumber).filter(Boolean))];

  return (
    <Layout title="Ordens de Produção (PPs)" description="Gerenciamento de ordens de produção para campanhas publicitárias">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Ordens de Produção</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar PPs..."
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> Filtros
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filtros Avançados</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="filterStatus">Status</Label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger id="filterStatus">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os Status</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="approved">Aprovado</SelectItem>
                          <SelectItem value="rejected">Rejeitado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="filterFornecedor">Fornecedor</Label>
                      <Select value={filterFornecedor} onValueChange={setFilterFornecedor}>
                        <SelectTrigger id="filterFornecedor">
                          <SelectValue placeholder="Selecione o fornecedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os Fornecedores</SelectItem>
                          {fornecedores.map((fornecedor, index) => (
                            <SelectItem key={index} value={fornecedor}>
                              {fornecedor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="filterCampaign">Campanha</Label>
                      <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                        <SelectTrigger id="filterCampaign">
                          <SelectValue placeholder="Selecione a campanha" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Campanhas</SelectItem>
                          {campanhas.map((campanha, index) => (
                            <SelectItem key={index} value={campanha}>
                              {campanha}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="filterSeiNumber">Processo SEI</Label>
                      <Select value={filterSeiNumber} onValueChange={setFilterSeiNumber}>
                        <SelectTrigger id="filterSeiNumber">
                          <SelectValue placeholder="Filtrar por Processo SEI" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="filled">Com Processo SEI</SelectItem>
                          <SelectItem value="empty">Sem Processo SEI</SelectItem>
                          {seiNumbers.map((numero, index) => (
                            <SelectItem key={index} value={numero}>
                              {numero}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="filterCommitmentNumber">Nº de Empenho</Label>
                      <Select value={filterCommitmentNumber} onValueChange={setFilterCommitmentNumber}>
                        <SelectTrigger id="filterCommitmentNumber">
                          <SelectValue placeholder="Filtrar por Nº de Empenho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="filled">Com Nº de Empenho</SelectItem>
                          <SelectItem value="empty">Sem Nº de Empenho</SelectItem>
                          {commitmentNumbers.map((numero, index) => (
                            <SelectItem key={index} value={numero}>
                              {numero}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={resetFilters}>
                        Limpar Filtros
                      </Button>
                      <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button>
                <Plus className="mr-1 h-4 w-4" /> Nova Ordem
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Ações em massa */}
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between bg-muted p-2 rounded-md mb-4">
              <div className="text-sm">
                {selectedItems.length} {selectedItems.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </div>
              <div className="flex gap-2">
                <Dialog open={bulkActionOpen} onOpenChange={setBulkActionOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" /> Alterar Status
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Alterar Status em Massa</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bulkStatus">Novo Status</Label>
                        <Select value={bulkStatus} onValueChange={(value: ApprovalStatus) => setBulkStatus(value)}>
                          <SelectTrigger id="bulkStatus">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Aprovado</SelectItem>
                            <SelectItem value="rejected">Rejeitado</SelectItem>
                            <SelectItem value="pending">Pendente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <p className="text-sm">Esta ação irá alterar o status de {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'itens'}.</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setBulkActionOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleBulkStatusChange}>
                        Confirmar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="destructive" onClick={() => setSelectedItems([])}>
                  <Trash className="h-4 w-4 mr-2" /> Limpar Seleção
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                    checked={filteredOrdens.length > 0 && selectedItems.length === filteredOrdens.length}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Selecionar todos"
                  />
                </TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Campanha</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Data de Entrega</TableHead>
                <TableHead className="text-right">Valor (R$)</TableHead>
                <TableHead>Processo SEI</TableHead>
                <TableHead>Nº Empenho</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrdens.length > 0 ? (
                filteredOrdens.map((ordem) => (
                  <TableRow key={ordem.id} className="cursor-pointer hover:bg-muted">
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(ordem.id)}
                        onCheckedChange={(checked) => toggleSelectItem(ordem.id, checked === true)}
                        aria-label={`Selecionar ${ordem.numero}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{ordem.numero}</TableCell>
                    <TableCell>{ordem.titulo}</TableCell>
                    <TableCell>{ordem.campanha}</TableCell>
                    <TableCell>{ordem.fornecedor}</TableCell>
                    <TableCell>{ordem.dataEntrega}</TableCell>
                    <TableCell className="text-right">{ordem.valorTotal.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      {ordem.seiNumber ? (
                        <span className="text-xs font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                          {ordem.seiNumber}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Não informado</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {ordem.commitmentNumber ? (
                        <span className="text-xs font-medium bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
                          {ordem.commitmentNumber}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Não informado</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(ordem.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Detalhes</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-4">
                    Nenhuma ordem de produção encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ProducaoPage;
