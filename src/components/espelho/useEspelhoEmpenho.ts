
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Espelho, Empenho, FilterCriteria } from './types';
import { mockEspelhos, mockEmpenhos, getUniqueAgencies } from './utils/mockData';
import { filterEspelhos, filterEmpenhos } from './utils/espelhoFilters';
import { useEspelhoOperations } from './utils/espelhoOperations';

export const useEspelhoEmpenho = () => {
  const { toast } = useToast();
  const espelhoOperations = useEspelhoOperations();
  
  // State for UI control
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('espelhos');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Dialog control states
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  
  // Form states
  const [bulkStatus, setBulkStatus] = useState('');
  const [selectedEspelho, setSelectedEspelho] = useState<Espelho | null>(null);
  const [feedback, setFeedback] = useState('');
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAgencia, setFilterAgencia] = useState('');
  const [filterValorMin, setFilterValorMin] = useState('');
  const [filterValorMax, setFilterValorMax] = useState('');
  
  // Data from imported utility
  const espelhos = mockEspelhos;
  const empenhos = mockEmpenhos;
  
  // Apply filters using the utility functions
  const filterCriteria: FilterCriteria = {
    searchTerm,
    filterStatus,
    filterAgencia,
    filterValorMin,
    filterValorMax
  };
  
  const filteredEspelhos = filterEspelhos(espelhos, filterCriteria);
  const filteredEmpenhos = filterEmpenhos(empenhos, filterCriteria);
  
  // Selection handlers
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
    if (activeTab === 'espelhos') {
      if (selectedItems.length === filteredEspelhos.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems(filteredEspelhos.map(item => item.id));
      }
    } else {
      if (selectedItems.length === filteredEmpenhos.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems(filteredEmpenhos.map(item => item.id));
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedItems([]);
  };

  // Handle applying filters
  const handleApplyFilters = () => {
    setIsFilterDialogOpen(false);
    // Call without arguments since the method doesn't expect any
    espelhoOperations.handleApplyFilters();
  };

  // Clear filters
  const clearFilters = () => {
    setFilterStatus('');
    setFilterAgencia('');
    setFilterValorMin('');
    setFilterValorMax('');
    setIsFilterDialogOpen(false);
    espelhoOperations.clearFilters();
  };

  // Bulk status change
  const handleBulkStatusChange = () => {
    const success = espelhoOperations.handleBulkStatusChange(selectedItems, bulkStatus);
    if (success) {
      setIsBulkActionDialogOpen(false);
      setBulkStatus('');
      setSelectedItems([]);
    }
  };

  const getSelectedItemCount = () => {
    return selectedItems.length;
  };

  // Visualizar espelho
  const handleViewEspelho = (espelho: Espelho) => {
    setSelectedEspelho(espelho);
    setIsViewDialogOpen(true);
  };

  // Aprovar espelho
  const handleApproveEspelho = (id: string) => {
    const success = espelhoOperations.handleApproveEspelho(id);
    if (success) {
      setIsViewDialogOpen(false);
    }
  };

  // Abrir dialog de rejeição
  const handleOpenRejectDialog = (espelho: Espelho) => {
    setSelectedEspelho(espelho);
    setFeedback('');
    setIsRejectDialogOpen(true);
    setIsViewDialogOpen(false);
  };

  // Rejeitar espelho
  const handleRejectEspelho = () => {
    const success = espelhoOperations.handleRejectEspelho(selectedEspelho, feedback);
    if (success) {
      setIsRejectDialogOpen(false);
    }
  };

  // Obter lista de agências únicas para o filtro
  const agenciasUnicas = getUniqueAgencies();

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    selectedItems,
    setSelectedItems,
    isFilterDialogOpen,
    setIsFilterDialogOpen,
    isBulkActionDialogOpen,
    setIsBulkActionDialogOpen,
    bulkStatus,
    setBulkStatus,
    isViewDialogOpen,
    setIsViewDialogOpen,
    selectedEspelho,
    setSelectedEspelho,
    feedback,
    setFeedback,
    isRejectDialogOpen,
    setIsRejectDialogOpen,
    filterStatus,
    setFilterStatus,
    filterAgencia,
    setFilterAgencia,
    filterValorMin,
    setFilterValorMin,
    filterValorMax,
    setFilterValorMax,
    espelhos,
    empenhos,
    filteredEspelhos,
    filteredEmpenhos,
    handleSelectItem,
    handleSelectAll,
    handleTabChange,
    handleApplyFilters,
    clearFilters,
    handleBulkStatusChange,
    getSelectedItemCount,
    handleViewEspelho,
    handleApproveEspelho,
    handleOpenRejectDialog,
    handleRejectEspelho,
    agenciasUnicas
  };
};
