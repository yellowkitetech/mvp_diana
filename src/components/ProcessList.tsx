
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Process, Status } from '@/lib/types';
import { sampleProcesses, getAgencyById, isMissingImportantInfo } from '@/lib/data';
import { CalendarClock, CheckCircle, AlertCircle, Clock, PlusCircle, FileText, Receipt, CalendarRange, Filter } from 'lucide-react';
import ProcessForm from './ProcessForm';
import { useToast } from '@/components/ui/use-toast';

interface ProcessListProps {
  onSelect: (process: Process) => void;
  selectedAgencyId?: string;
}

const getStatusIcon = (status: Status) => {
  switch (status) {
    case 'pending':
      return <Clock size={16} className="mr-1" />;
    case 'in-progress':
      return <CalendarClock size={16} className="mr-1" />;
    case 'completed':
      return <CheckCircle size={16} className="mr-1" />;
    case 'cancelled':
      return <AlertCircle size={16} className="mr-1" />;
    default:
      return null;
  }
};

const getStatusBadgeVariant = (status: Status): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'pending':
      return 'secondary';
    case 'in-progress':
      return 'default';
    case 'completed':
      return 'outline';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive" className="ml-2">Alta</Badge>;
    case 'medium':
      return <Badge variant="secondary" className="ml-2">Média</Badge>;
    case 'low':
      return <Badge variant="outline" className="ml-2">Baixa</Badge>;
    default:
      return null;
  }
};

const ProcessList = ({ onSelect, selectedAgencyId }: ProcessListProps) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [showMissing, setShowMissing] = useState(false);
  const [processes, setProcesses] = useState<Process[]>(sampleProcesses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProcess, setCurrentProcess] = useState<Process | undefined>(undefined);
  
  let filteredProcesses = [...processes];
  
  // Filtro por agência
  if (selectedAgencyId) {
    filteredProcesses = filteredProcesses.filter(
      process => process.agencyId === selectedAgencyId
    );
  }
  
  // Filtro por status
  if (filter !== 'all') {
    filteredProcesses = filteredProcesses.filter(
      process => process.status === filter
    );
  }
  
  // Filtro por informações faltantes
  if (showMissing) {
    filteredProcesses = filteredProcesses.filter(
      process => isMissingImportantInfo(process)
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  const handleNewProcess = () => {
    setCurrentProcess(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditProcess = (process: Process) => {
    setCurrentProcess(process);
    setIsFormOpen(true);
  };
  
  const handleSaveProcess = (processData: Partial<Process>) => {
    if (processData.id) {
      // Atualização
      setProcesses(processes.map(p => 
        p.id === processData.id ? { ...p, ...processData } as Process : p
      ));
      
      toast({
        title: "Processo atualizado",
        description: "O processo foi atualizado com sucesso."
      });
    } else {
      // Novo processo
      const newProcess = {
        ...processData,
        id: `${Date.now()}`, // Gerar ID temporário
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Process;
      
      setProcesses([...processes, newProcess]);
      
      toast({
        title: "Processo criado",
        description: "O processo foi criado com sucesso."
      });
    }
    
    setIsFormOpen(false);
  };

  return (
    <Card className="w-full h-full border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Processos
            {selectedAgencyId && (
              <span className="text-sm font-normal ml-2 text-muted-foreground">
                ({getAgencyById(selectedAgencyId)?.name})
              </span>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowMissing(!showMissing)}
              className={showMissing ? "bg-muted" : ""}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showMissing ? "Todos" : "Faltando Informações"}
            </Button>
            <Button size="sm" onClick={handleNewProcess}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Processo
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" className="mt-2" onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 h-[calc(100%-140px)] overflow-auto">
        {filteredProcesses.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Nenhum processo encontrado.
          </div>
        ) : (
          filteredProcesses.map((process) => (
            <div 
              key={process.id}
              className="border rounded-lg p-4 card-hover cursor-pointer transition-all bg-card relative"
              onClick={() => onSelect(process)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{process.title}</div>
                <div className="flex items-center">
                  {getPriorityBadge(process.priority)}
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {process.description}
              </div>
              
              {/* Informações complementares */}
              <div className="text-xs text-muted-foreground mt-2 flex flex-wrap gap-2">
                {process.campaignId && (
                  <span className="flex items-center">
                    <CalendarRange className="h-3 w-3 mr-1" />
                    Campanha
                  </span>
                )}
                {process.seiNumber && (
                  <span className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    SEI: {process.seiNumber}
                  </span>
                )}
                {process.commitmentNumber && (
                  <span className="flex items-center">
                    <Receipt className="h-3 w-3 mr-1" />
                    NE: {process.commitmentNumber}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <div>
                  Criado em: {formatDate(process.createdAt)}
                </div>
                <Badge variant={getStatusBadgeVariant(process.status)} className="flex items-center">
                  {getStatusIcon(process.status)}
                  {process.status === 'pending' && 'Pendente'}
                  {process.status === 'in-progress' && 'Em Andamento'}
                  {process.status === 'completed' && 'Concluído'}
                  {process.status === 'cancelled' && 'Cancelado'}
                </Badge>
              </div>
              
              {/* Botão de edição no canto superior direito */}
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditProcess(process);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  <path d="m15 5 4 4"/>
                </svg>
                <span className="sr-only">Editar</span>
              </Button>
            </div>
          ))
        )}
      </CardContent>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl">
          <ProcessForm
            process={currentProcess}
            onSave={handleSaveProcess}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProcessList;
