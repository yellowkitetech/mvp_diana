
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
import { SEIProcess } from '@/lib/types';
import { Edit, File, FilePlus, Search, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Dados de exemplo
const mockSEIProcesses: SEIProcess[] = [
  {
    id: '1',
    number: '00001.000123/2023-45',
    description: 'Processo para campanha de vacinação 2023',
    createdAt: '2023-04-10T10:00:00Z',
    updatedAt: '2023-04-10T10:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    number: '00001.000456/2023-78',
    description: 'Processo para festival cultural 2023',
    createdAt: '2023-08-01T09:15:00Z',
    updatedAt: '2023-08-01T09:15:00Z',
    status: 'active'
  },
  {
    id: '3',
    number: '00001.000789/2023-90',
    description: 'Processo para campanha de trânsito',
    createdAt: '2023-03-15T11:30:00Z',
    updatedAt: '2023-05-20T14:45:00Z',
    status: 'completed'
  },
  {
    id: '4',
    number: '00001.000321/2023-67',
    description: 'Processo para programa educacional',
    createdAt: '2023-06-05T08:45:00Z',
    updatedAt: '2023-06-05T08:45:00Z',
    status: 'active'
  },
  {
    id: '5',
    number: '00001.000654/2023-89',
    description: 'Processo para campanha de turismo',
    createdAt: '2023-09-10T13:20:00Z',
    updatedAt: '2023-09-10T13:20:00Z',
    status: 'archived'
  }
];

const SEIProcessList = () => {
  const { toast } = useToast();
  const [seiProcesses, setSEIProcesses] = useState<SEIProcess[]>(mockSEIProcesses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProcess, setCurrentProcess] = useState<SEIProcess | null>(null);
  
  // Formulário
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'active' | 'completed' | 'archived'>('active');
  
  const resetForm = () => {
    setNumber('');
    setDescription('');
    setStatus('active');
    setCurrentProcess(null);
  };
  
  const handleAddNew = () => {
    resetForm();
    setIsFormOpen(true);
  };
  
  const handleEdit = (process: SEIProcess) => {
    setCurrentProcess(process);
    setNumber(process.number);
    setDescription(process.description);
    setStatus(process.status);
    setIsFormOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este processo SEI?")) {
      setSEIProcesses(seiProcesses.filter(p => p.id !== id));
      
      toast({
        title: "Processo SEI excluído",
        description: "O processo SEI foi excluído com sucesso."
      });
    }
  };
  
  const handleSave = () => {
    if (!number || !description) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    // Validar formato do número SEI
    const seiNumberPattern = /^\d{5}\.\d{6}\/\d{4}-\d{2}$/;
    if (!seiNumberPattern.test(number)) {
      toast({
        title: "Número SEI inválido",
        description: "O número SEI deve seguir o formato: 00000.000000/0000-00",
        variant: "destructive"
      });
      return;
    }
    
    if (currentProcess) {
      // Atualização
      setSEIProcesses(seiProcesses.map(p => 
        p.id === currentProcess.id 
          ? { 
              ...p, 
              number, 
              description, 
              status, 
              updatedAt: new Date().toISOString() 
            } 
          : p
      ));
      
      toast({
        title: "Processo SEI atualizado",
        description: "O processo SEI foi atualizado com sucesso."
      });
    } else {
      // Novo processo
      const newProcess: SEIProcess = {
        id: `${Date.now()}`,
        number,
        description,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setSEIProcesses([...seiProcesses, newProcess]);
      
      toast({
        title: "Processo SEI criado",
        description: "O processo SEI foi criado com sucesso."
      });
    }
    
    resetForm();
    setIsFormOpen(false);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-500">Ativo</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Concluído</Badge>;
      case 'archived':
        return <Badge variant="outline">Arquivado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  const filteredProcesses = seiProcesses.filter(process => 
    process.number.includes(searchTerm) ||
    process.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Buscar processos SEI..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddNew}>
          <FilePlus className="mr-2 h-4 w-4" /> Novo Processo SEI
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Processos SEI</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProcesses.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número SEI</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcesses.map((process) => (
                    <TableRow key={process.id}>
                      <TableCell className="font-medium">{process.number}</TableCell>
                      <TableCell>{process.description}</TableCell>
                      <TableCell>{formatDate(process.createdAt)}</TableCell>
                      <TableCell>{formatDate(process.updatedAt)}</TableCell>
                      <TableCell>{getStatusBadge(process.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(process)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(process.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
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
              <File className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum processo SEI encontrado</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">
                {searchTerm 
                  ? `Não encontramos processos com o termo "${searchTerm}".` 
                  : 'Você ainda não cadastrou nenhum processo SEI.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) resetForm();
        setIsFormOpen(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentProcess ? 'Editar Processo SEI' : 'Novo Processo SEI'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="number">Número SEI <span className="text-red-500">*</span></Label>
              <Input 
                id="number" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)} 
                placeholder="00000.000000/0000-00" 
              />
              <p className="text-xs text-muted-foreground">
                Formato: 00000.000000/0000-00
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Descrição do processo" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="archived">Arquivado</SelectItem>
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

export default SEIProcessList;
