
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, AlertCircle, Clock, MoreHorizontal, Eye, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MediaPlan } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface MediaPlanTableProps {
  mediaPlans: MediaPlan[];
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onSelectAll: () => void;
}

const MediaPlanTable = ({ 
  mediaPlans, 
  selectedItems, 
  onSelectItem, 
  onSelectAll 
}: MediaPlanTableProps) => {
  const { toast } = useToast();
  const [viewingPlan, setViewingPlan] = useState<MediaPlan | null>(null);

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

  const handleViewPlan = (plan: MediaPlan) => {
    // In a real application, you would navigate to a details page or open a modal
    setViewingPlan(plan);
    toast({
      title: "Visualizando plano de mídia",
      description: `Detalhes do plano: ${plan.title}`
    });
  };

  const handleApprovePlan = (plan: MediaPlan) => {
    // In a real application, you would call an API to update the status
    toast({
      title: "Plano aprovado",
      description: `O plano "${plan.title}" foi aprovado com sucesso.`
    });
  };

  const handleRejectPlan = (plan: MediaPlan) => {
    // In a real application, you would open a dialog to get rejection reason
    toast({
      title: "Plano reprovado",
      description: `O plano "${plan.title}" foi reprovado.`
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox 
              checked={selectedItems.length > 0 && selectedItems.length === mediaPlans.length} 
              onCheckedChange={onSelectAll}
              aria-label="Selecionar todos"
            />
          </TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Período</TableHead>
          <TableHead className="text-right">Valor Total (R$)</TableHead>
          <TableHead>Processo SEI</TableHead>
          <TableHead>Nº Empenho</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[180px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mediaPlans.length > 0 ? (
          mediaPlans.map((plan) => (
            <TableRow key={plan.id} className="hover:bg-muted">
              <TableCell>
                <Checkbox 
                  checked={selectedItems.includes(plan.id)} 
                  onCheckedChange={() => onSelectItem(plan.id)}
                  aria-label={`Selecionar plano ${plan.title}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                {plan.title}
                <div className="text-xs text-muted-foreground mt-1">{plan.description}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{plan.startDate} - {plan.endDate}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{plan.totalValue.toLocaleString('pt-BR')}</TableCell>
              <TableCell>
                {plan.seiNumber ? (
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                    {plan.seiNumber}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Não informado</span>
                )}
              </TableCell>
              <TableCell>
                {plan.commitmentNumber ? (
                  <span className="text-xs font-medium bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
                    {plan.commitmentNumber}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Não informado</span>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(plan.status)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewPlan(plan)}
                    className="hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="sr-only">Visualizar</span>
                  </Button>
                  
                  {plan.status === 'pending' && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleApprovePlan(plan)}
                        className="hover:bg-green-50"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="sr-only">Aprovar</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRejectPlan(plan)}
                        className="hover:bg-red-50"
                      >
                        <X className="h-4 w-4 text-red-600" />
                        <span className="sr-only">Reprovar</span>
                      </Button>
                    </>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewPlan(plan)}>
                        <Eye className="h-4 w-4 mr-2" /> Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      {plan.status === 'pending' && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-green-600"
                            onClick={() => handleApprovePlan(plan)}
                          >
                            <Check className="h-4 w-4 mr-2" /> Aprovar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleRejectPlan(plan)}
                          >
                            <X className="h-4 w-4 mr-2" /> Reprovar
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-4">
              Nenhum plano de mídia encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MediaPlanTable;
