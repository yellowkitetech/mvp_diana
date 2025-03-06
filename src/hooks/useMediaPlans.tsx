
import { useState, useMemo } from 'react';
import { sampleMediaPlans } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';
import { MediaPlan } from '@/lib/types';

export const useMediaPlans = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeiNumber, setFilterSeiNumber] = useState('all');
  const [filterCommitmentNumber, setFilterCommitmentNumber] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  // Media plans data
  const mediaPlans = sampleMediaPlans;

  const filteredMediaPlans = useMemo(() => {
    return mediaPlans.filter(plan => {
      // Filtro de busca
      if (searchTerm && 
          !plan.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !plan.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !(plan.seiNumber && plan.seiNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
          !(plan.commitmentNumber && plan.commitmentNumber.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      // Filtro de status
      if (filterStatus !== 'all' && plan.status !== filterStatus) return false;
      
      // Filtro de processo SEI
      if (filterSeiNumber !== 'all') {
        if (filterSeiNumber === 'empty' && plan.seiNumber) return false;
        if (filterSeiNumber === 'filled' && !plan.seiNumber) return false;
        if (filterSeiNumber !== 'empty' && filterSeiNumber !== 'filled' && plan.seiNumber !== filterSeiNumber) return false;
      }
      
      // Filtro de número de empenho
      if (filterCommitmentNumber !== 'all') {
        if (filterCommitmentNumber === 'empty' && plan.commitmentNumber) return false;
        if (filterCommitmentNumber === 'filled' && !plan.commitmentNumber) return false;
        if (filterCommitmentNumber !== 'empty' && filterCommitmentNumber !== 'filled' && plan.commitmentNumber !== filterCommitmentNumber) return false;
      }
      
      return true;
    });
  }, [mediaPlans, searchTerm, filterStatus, filterSeiNumber, filterCommitmentNumber]);

  const resetFilters = () => {
    setFilterStatus('all');
    setFilterSeiNumber('all');
    setFilterCommitmentNumber('all');
    setSearchTerm('');
  };
  
  // Lista única de processos SEI para o filtro (não vazios)
  const seiNumbers = useMemo(() => {
    return [...new Set(sampleMediaPlans.map(plan => plan.seiNumber).filter(Boolean))];
  }, []);
  
  // Lista única de números de empenho para o filtro (não vazios)
  const commitmentNumbers = useMemo(() => {
    return [...new Set(sampleMediaPlans.map(plan => plan.commitmentNumber).filter(Boolean))];
  }, []);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredMediaPlans.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMediaPlans.map(item => item.id));
    }
  };

  const handleBulkStatusChange = () => {
    if (!bulkStatus || selectedItems.length === 0) {
      toast({
        title: "Operação cancelada",
        description: "Selecione um status e pelo menos um item.",
        variant: "destructive"
      });
      return;
    }
    
    // Em uma aplicação real, você chamaria uma API aqui
    // para atualizar o status dos itens selecionados
    
    toast({
      title: "Status atualizado",
      description: `${selectedItems.length} plano(s) de mídia atualizado(s) para "${bulkStatus}".`
    });
    
    setIsBulkActionDialogOpen(false);
    setBulkStatus('');
    setSelectedItems([]);
  };

  const getSelectedItemCount = () => {
    return selectedItems.length;
  };
  
  return {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterSeiNumber,
    setFilterSeiNumber,
    filterCommitmentNumber,
    setFilterCommitmentNumber,
    selectedItems,
    setSelectedItems,
    isBulkActionDialogOpen,
    setIsBulkActionDialogOpen,
    bulkStatus,
    setBulkStatus,
    isCreateFormOpen,
    setIsCreateFormOpen,
    filteredMediaPlans,
    seiNumbers,
    commitmentNumbers,
    resetFilters,
    handleSelectItem,
    handleSelectAll,
    handleBulkStatusChange,
    getSelectedItemCount
  };
};
