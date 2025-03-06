
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { MediaPlan } from '@/lib/types';
import { Calendar, Download, Printer, CheckCircle, XCircle, FileText, AlertTriangle } from 'lucide-react';

interface MediaPlanDetailProps {
  mediaPlan: MediaPlan;
  onClose: () => void;
  onStatusChange?: (id: string, status: string) => void;
}

const MediaPlanDetail = ({ mediaPlan, onClose, onStatusChange }: MediaPlanDetailProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = () => {
    setIsLoading(true);
    // Simular uma API call
    setTimeout(() => {
      if (onStatusChange) {
        onStatusChange(mediaPlan.id, 'approved');
      }
      toast({
        title: "PI aprovada com sucesso",
        description: "A PI foi aprovada e será enviada para o próximo passo do fluxo.",
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleReject = () => {
    setIsLoading(true);
    // Simular uma API call
    setTimeout(() => {
      if (onStatusChange) {
        onStatusChange(mediaPlan.id, 'rejected');
      }
      toast({
        title: "PI rejeitada",
        description: "A PI foi rejeitada e o criador será notificado.",
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Aprovado</Badge>;
      case 'pending':
        return <Badge variant="outline"><AlertTriangle className="h-3 w-3 mr-1" /> Pendente</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Status Desconhecido</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{mediaPlan.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{mediaPlan.description}</p>
          </div>
          {getStatusBadge(mediaPlan.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Período de Veiculação</h3>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>
                {formatDate(mediaPlan.startDate)} até {formatDate(mediaPlan.endDate)}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Valor Total</h3>
            <p className="text-lg font-bold">{formatCurrency(mediaPlan.totalValue)}</p>
          </div>
        </div>

        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3">Itens do Plano de Mídia</h3>
          <div className="space-y-4">
            {mediaPlan.items.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <div>
                    <h4 className="text-sm font-medium">{item.vehicle}</h4>
                    <p className="text-xs text-muted-foreground">{item.format}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Período</p>
                    <p className="text-sm">
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Quantidade</p>
                    <p className="text-sm">{item.quantity} inserções</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Valor</p>
                    <p className="text-sm font-medium">{formatCurrency(item.totalValue)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3">Anexos</h3>
          <div className="flex flex-wrap gap-2">
            {mediaPlan.attachments?.map((attachment, index) => (
              <Button key={index} variant="outline" size="sm" className="flex items-center">
                <FileText className="h-4 w-4 mr-1" /> {attachment}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Voltar
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" /> Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Exportar
          </Button>
        </div>
        {mediaPlan.status === 'pending' && (
          <div className="flex space-x-2">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleReject}
              disabled={isLoading}
            >
              <XCircle className="h-4 w-4 mr-1" /> Rejeitar
            </Button>
            <Button 
              size="sm" 
              onClick={handleApprove}
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default MediaPlanDetail;
