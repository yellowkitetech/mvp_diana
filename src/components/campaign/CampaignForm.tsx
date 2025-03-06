
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { Campaign, Status } from '@/lib/types';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CampaignFormProps {
  campaign?: Campaign;
  onSave: (campaign: Partial<Campaign>) => void;
  onCancel: () => void;
}

const CampaignForm = ({ campaign, onSave, onCancel }: CampaignFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [title, setTitle] = useState(campaign?.title || '');
  const [description, setDescription] = useState(campaign?.description || '');
  const [status, setStatus] = useState<Status>(campaign?.status || 'pending');
  const [department, setDepartment] = useState(campaign?.department || '');
  const [responsibleUser, setResponsibleUser] = useState(campaign?.responsibleUser || '');
  const [seiNumber, setSeiNumber] = useState(campaign?.seiNumber || '');
  const [commitmentNumber, setCommitmentNumber] = useState(campaign?.commitmentNumber || '');
  const [totalBudget, setTotalBudget] = useState(campaign?.totalBudget?.toString() || '');
  
  // Date fields
  const [startDate, setStartDate] = useState<Date | undefined>(
    campaign?.startDate ? new Date(campaign.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    campaign?.endDate ? new Date(campaign.endDate) : undefined
  );
  
  // Sample departments
  const departments = [
    { id: 'dept1', name: 'Marketing' },
    { id: 'dept2', name: 'Comunicação Institucional' },
    { id: 'dept3', name: 'Relações Públicas' },
    { id: 'dept4', name: 'Digital' },
    { id: 'dept5', name: 'Imprensa' }
  ];
  
  // Sample users
  const users = [
    { id: 'user1', name: 'João Silva' },
    { id: 'user2', name: 'Maria Oliveira' },
    { id: 'user3', name: 'Carlos Santos' },
    { id: 'user4', name: 'Ana Pereira' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !startDate || !endDate) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    const budgetValue = parseFloat(totalBudget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      toast({
        title: "Orçamento inválido",
        description: "Por favor, informe um valor de orçamento válido.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const campaignData: Partial<Campaign> = {
      id: campaign?.id,
      title,
      description,
      startDate: startDate?.toISOString().split('T')[0] || '',
      endDate: endDate?.toISOString().split('T')[0] || '',
      totalBudget: budgetValue,
      status,
      department,
      responsibleUser,
      seiNumber: seiNumber || undefined,
      commitmentNumber: commitmentNumber || undefined,
      budgetAllocations: campaign?.budgetAllocations || [],
      createdAt: campaign?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simular chamada de API
    setTimeout(() => {
      onSave(campaignData);
      setIsSubmitting(false);
      
      toast({
        title: `Campanha ${campaign ? 'atualizada' : 'criada'}`,
        description: `A campanha foi ${campaign ? 'atualizada' : 'criada'} com sucesso.`
      });
    }, 1000);
  };
  
  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{campaign ? 'Editar Campanha' : 'Nova Campanha'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Título da campanha" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
              <Select 
                value={status} 
                onValueChange={(value) => setStatus(value as Status)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="in-progress">Em Andamento</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição <span className="text-red-500">*</span></Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Descreva os objetivos e detalhes da campanha" 
              className="min-h-[100px]" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Data de Término <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => 
                      startDate ? date < startDate : false
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Select 
                value={department} 
                onValueChange={setDepartment}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibleUser">Responsável</Label>
              <Select 
                value={responsibleUser} 
                onValueChange={setResponsibleUser}
              >
                <SelectTrigger id="responsibleUser">
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seiNumber">Número do SEI</Label>
              <Input 
                id="seiNumber" 
                value={seiNumber} 
                onChange={(e) => setSeiNumber(e.target.value)} 
                placeholder="Ex: 00000.000000/0000-00" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commitmentNumber">Número do Empenho</Label>
              <Input 
                id="commitmentNumber" 
                value={commitmentNumber} 
                onChange={(e) => setCommitmentNumber(e.target.value)} 
                placeholder="Ex: 2023NE000123" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalBudget">Orçamento Total (R$) <span className="text-red-500">*</span></Label>
              <Input 
                id="totalBudget" 
                type="number" 
                value={totalBudget} 
                onChange={(e) => setTotalBudget(e.target.value)} 
                placeholder="0,00" 
                min="0" 
                step="0.01" 
                required 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Salvando..." : "Salvar Campanha"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CampaignForm;
