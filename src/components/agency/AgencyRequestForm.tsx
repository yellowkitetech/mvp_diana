
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send, FileText } from 'lucide-react';
import AgencySelector from './request-form/AgencySelector';
import RequestTypeSelector from './request-form/RequestTypeSelector';
import DepartmentSelector from './request-form/DepartmentSelector';
import CampaignSelector from './request-form/CampaignSelector';

type RequestType = 'espelho' | 'criacao' | 'midia' | 'producao';

interface AgencyRequestFormProps {
  onClose: () => void;
}

const AgencyRequestForm = ({ onClose }: AgencyRequestFormProps) => {
  const { toast } = useToast();
  
  const [agencyId, setAgencyId] = useState<string>('');
  const [requestType, setRequestType] = useState<RequestType | ''>('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [seiProcess, setSeiProcess] = useState<string>('');
  const [campaignId, setCampaignId] = useState<string>('');
  const [briefing, setBriefing] = useState<string>('');

  const handleDepartmentChange = (departmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments(prev => [...prev, departmentId]);
    } else {
      setSelectedDepartments(prev => prev.filter(id => id !== departmentId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agencyId || !requestType || selectedDepartments.length === 0 || !campaignId || !briefing) {
      toast({
        title: "Campos incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    const request = {
      agencyId,
      requestType,
      departments: selectedDepartments,
      seiProcess: seiProcess || undefined,
      campaignId,
      briefing,
      createdAt: new Date().toISOString()
    };
    
    console.log('Solicitação enviada:', request);
    
    toast({
      title: "Solicitação enviada",
      description: "A solicitação foi enviada com sucesso para a agência."
    });
    
    onClose();
  };
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" /> Enviar Solicitação para Agência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AgencySelector agencyId={agencyId} setAgencyId={setAgencyId} />
            <RequestTypeSelector requestType={requestType} setRequestType={setRequestType} />
          </div>
          
          <DepartmentSelector 
            selectedDepartments={selectedDepartments}
            onDepartmentChange={handleDepartmentChange}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seiProcess">Processo SEI</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="seiProcess"
                  placeholder="Número do processo (opcional)"
                  value={seiProcess}
                  onChange={(e) => setSeiProcess(e.target.value)}
                />
                <Button type="button" variant="outline" size="icon" title="Buscar processo">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Pode ser adicionado posteriormente
              </p>
            </div>
            
            <CampaignSelector campaignId={campaignId} setCampaignId={setCampaignId} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="briefing">Briefing <span className="text-destructive">*</span></Label>
            <Textarea
              id="briefing"
              placeholder="Descreva o briefing da solicitação..."
              className="min-h-[150px]"
              value={briefing}
              onChange={(e) => setBriefing(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" /> Enviar Solicitação
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AgencyRequestForm;
