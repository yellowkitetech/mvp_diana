
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { BudgetAllocation, BudgetPlan } from '@/lib/types';
import BudgetFormHeader from './budget-form/BudgetFormHeader';
import AllocationForm from './budget-form/AllocationForm';
import AllocationsTable from './budget-form/AllocationsTable';
import BudgetSummary from './budget-form/BudgetSummary';
import { mockCampaigns, mockSuppliers } from './budget-form/mockData';

interface BudgetPlanningFormProps {
  onSave?: (data: BudgetPlan) => void;
}

const BudgetPlanningForm = ({ onSave }: BudgetPlanningFormProps) => {
  const { toast } = useToast();
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [totalBudget, setTotalBudget] = useState<string>('500000');
  const [allocations, setAllocations] = useState<BudgetAllocation[]>([]);
  const [suppliers] = useState(mockSuppliers);
  const [campaigns] = useState(mockCampaigns);
  
  const [currentAllocation, setCurrentAllocation] = useState({
    supplierId: '',
    serviceType: '' as any,
    amount: '',
    campaignId: ''
  });
  
  const months = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];
  
  const addAllocation = () => {
    if (!currentAllocation.supplierId || !currentAllocation.serviceType || !currentAllocation.amount) {
      toast({
        title: "Campos incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    const amount = parseFloat(currentAllocation.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Valor inválido",
        description: "O valor alocado deve ser maior que zero.",
        variant: "destructive"
      });
      return;
    }
    
    const newAllocation: BudgetAllocation = {
      id: `alloc-${Date.now()}`,
      supplierId: currentAllocation.supplierId,
      serviceType: currentAllocation.serviceType,
      amount,
      campaignId: currentAllocation.campaignId || undefined
    };
    
    setAllocations([...allocations, newAllocation]);
    
    // Limpar o formulário de alocação
    setCurrentAllocation({
      supplierId: '',
      serviceType: '' as any,
      amount: '',
      campaignId: ''
    });
    
    toast({
      title: "Alocação adicionada",
      description: "A alocação de orçamento foi adicionada com sucesso."
    });
  };
  
  const removeAllocation = (id: string) => {
    setAllocations(allocations.filter(a => a.id !== id));
  };
  
  const getTotalAllocated = () => {
    return allocations.reduce((sum, allocation) => sum + allocation.amount, 0);
  };
  
  const getRemainingBudget = () => {
    const total = parseFloat(totalBudget) || 0;
    const allocated = getTotalAllocated();
    return total - allocated;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!year || !month || !totalBudget) {
      toast({
        title: "Formulário incompleto",
        description: "Preencha o ano, mês e orçamento total.",
        variant: "destructive"
      });
      return;
    }
    
    const budget = parseFloat(totalBudget);
    if (isNaN(budget) || budget <= 0) {
      toast({
        title: "Orçamento inválido",
        description: "O orçamento total deve ser maior que zero.",
        variant: "destructive"
      });
      return;
    }
    
    if (allocations.length === 0) {
      toast({
        title: "Sem alocações",
        description: "Adicione pelo menos uma alocação de orçamento.",
        variant: "destructive"
      });
      return;
    }
    
    const budgetPlan: BudgetPlan = {
      id: `plan-${Date.now()}`,
      year: parseInt(year),
      month: parseInt(month),
      totalBudget: budget,
      allocations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (onSave) {
      onSave(budgetPlan);
    }
    
    toast({
      title: "Planejamento salvo",
      description: `O planejamento para ${months.find(m => m.value === month)?.label} de ${year} foi salvo com sucesso.`
    });
  };
  
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Planejamento Orçamentário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <BudgetFormHeader
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            totalBudget={totalBudget}
            setTotalBudget={setTotalBudget}
            months={months}
          />
          
          <div className="space-y-4">
            <BudgetSummary 
              totalAllocated={getTotalAllocated()} 
              totalBudget={parseFloat(totalBudget) || 0} 
              remainingBudget={getRemainingBudget()}
            />
            
            <AllocationForm
              currentAllocation={currentAllocation}
              setCurrentAllocation={setCurrentAllocation}
              suppliers={suppliers}
              campaigns={campaigns}
              onAddAllocation={addAllocation}
            />
            
            <AllocationsTable
              allocations={allocations}
              suppliers={suppliers}
              campaigns={campaigns}
              onRemoveAllocation={removeAllocation}
              totalAllocated={getTotalAllocated()}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" /> Salvar Planejamento
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BudgetPlanningForm;
