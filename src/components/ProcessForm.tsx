
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Process, Status } from '@/lib/types';
import { getAgencyById, sampleAgencies, updateProcess } from '@/lib/data';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';

interface ProcessFormProps {
  process?: Process;
  onSave: (process: Partial<Process>) => void;
  onCancel: () => void;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ process, onSave, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [title, setTitle] = useState(process?.title || '');
  const [description, setDescription] = useState(process?.description || '');
  const [agencyId, setAgencyId] = useState(process?.agencyId || '');
  const [status, setStatus] = useState<Status>(process?.status || 'pending');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(
    (process?.priority as 'high' | 'medium' | 'low') || 'medium'
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(
    process?.dueDate ? new Date(process.dueDate) : undefined
  );
  
  // Novos campos solicitados
  const [campaignId, setCampaignId] = useState(process?.campaignId || '');
  const [seiNumber, setSeiNumber] = useState(process?.seiNumber || '');
  const [commitmentNumber, setCommitmentNumber] = useState(process?.commitmentNumber || '');
  
  // Campanhas de exemplo
  const sampleCampaigns = [
    { id: 'campaign1', title: 'Campanha de Vacinação' },
    { id: 'campaign2', title: 'Campanha de Segurança Viária' },
    { id: 'campaign3', title: 'Festival Cultural' },
    { id: 'campaign4', title: 'Programa Habitacional' },
    { id: 'campaign5', title: 'Incentivo ao Esporte' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !agencyId) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const processData: Partial<Process> = {
      id: process?.id,
      title,
      description,
      agencyId,
      status,
      priority,
      dueDate: dueDate?.toISOString() || null,
      campaignId: campaignId || undefined,
      seiNumber: seiNumber || undefined,
      commitmentNumber: commitmentNumber || undefined,
      createdAt: process?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simular chamada de API
    setTimeout(() => {
      onSave(processData);
      setIsSubmitting(false);
      
      if (process?.id) {
        updateProcess(processData as Process);
      }
      
      toast({
        title: `Processo ${process ? 'atualizado' : 'criado'}`,
        description: `O processo foi ${process ? 'atualizado' : 'criado'} com sucesso.`
      });
    }, 1000);
  };
  
  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{process ? 'Editar Processo' : 'Novo Processo'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Título do processo" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agency">Agência <span className="text-red-500">*</span></Label>
              <Select 
                value={agencyId} 
                onValueChange={setAgencyId}
              >
                <SelectTrigger id="agency">
                  <SelectValue placeholder="Selecione a agência" />
                </SelectTrigger>
                <SelectContent>
                  {sampleAgencies.map((agency) => (
                    <SelectItem key={agency.id} value={agency.id}>{agency.name}</SelectItem>
                  ))}
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
              placeholder="Descrição do processo" 
              className="min-h-[100px]" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
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
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select 
                value={priority} 
                onValueChange={(value: 'high' | 'medium' | 'low') => setPriority(value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Data de Entrega</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Novos campos solicitados */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Informações Complementares</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campaign">Campanha</Label>
                <Select 
                  value={campaignId} 
                  onValueChange={setCampaignId}
                >
                  <SelectTrigger id="campaign">
                    <SelectValue placeholder="Selecione a campanha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhuma</SelectItem>
                    {sampleCampaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>{campaign.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
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
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Salvando..." : "Salvar Processo"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProcessForm;
