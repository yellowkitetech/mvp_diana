
import { useState, useEffect } from 'react';
import { CreativeWork, ApprovalStatus } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { sampleCommitmentNumberConfigs } from '@/lib/data';

// Dados de exemplo para criar obras criativas
const mockCreativeWorks: CreativeWork[] = [
  {
    id: '1',
    campaignRequestId: '1',
    title: 'Banner Principal - Campanha de Vacinação',
    description: 'Banner para website, formato 1200x600px',
    type: 'image',
    fileUrl: '/lovable-uploads/231970b0-2bb9-411f-8fd0-fc836eadac05.png',
    status: 'approved',
    createdAt: '2023-04-12T10:30:00Z',
    updatedAt: '2023-04-14T15:45:00Z',
    seiNumber: '00010.000123/2023-45',
    commitmentNumber: '2023NE000789'
  },
  {
    id: '2',
    campaignRequestId: '1',
    title: 'Spot de Rádio - Campanha de Vacinação',
    description: 'Spot de 30 segundos para veiculação em rádio',
    type: 'audio',
    fileUrl: '/audio-sample.mp3',
    status: 'pending',
    createdAt: '2023-04-13T11:20:00Z',
    updatedAt: '2023-04-13T11:20:00Z'
  },
  {
    id: '3',
    campaignRequestId: '2',
    title: 'Panfleto - Programa Educacional',
    description: 'Layout de panfleto formato A5, frente e verso',
    type: 'image',
    fileUrl: '/lovable-uploads/40df758b-1d70-43a5-9fd5-4737fc31bb53.png',
    status: 'rejected',
    feedback: 'As cores não estão de acordo com o manual de identidade visual. Por favor, ajuste conforme as diretrizes.',
    createdAt: '2023-06-12T09:15:00Z',
    updatedAt: '2023-06-14T16:30:00Z',
    seiNumber: '00010.000456/2023-78'
  },
  {
    id: '4',
    campaignRequestId: '3',
    title: 'Vídeo promocional - Festival Cultural',
    description: 'Vídeo de 45 segundos para divulgação do festival em mídias sociais',
    type: 'video',
    fileUrl: '/video-sample.mp4',
    status: 'pending',
    createdAt: '2023-08-05T14:45:00Z',
    updatedAt: '2023-08-05T14:45:00Z'
  },
  {
    id: '5',
    campaignRequestId: '1',
    title: 'Outdoor - Campanha de Vacinação',
    description: 'Arte para outdoor, formato padrão 9x3m',
    type: 'image',
    fileUrl: '/lovable-uploads/8608bfdc-de99-4292-8685-c85a58eeeb42.png',
    status: 'approved',
    createdAt: '2023-04-15T10:00:00Z',
    updatedAt: '2023-04-17T09:30:00Z',
    commitmentNumber: '2023NE000345'
  }
];

// Dados de exemplo de campanhas para o formulário de solicitação
export const mockCampaigns = [
  { id: '1', title: 'Campanha de Vacinação' },
  { id: '2', title: 'Programa Educacional' },
  { id: '3', title: 'Festival Cultural' },
  { id: '4', title: 'Campanha de Trânsito' },
  { id: '5', title: 'Incentivo ao Turismo' }
];

export const useCreativePageState = (isSecomUser: boolean) => {
  const { toast } = useToast();
  const [creativeWorks, setCreativeWorks] = useState<CreativeWork[]>(mockCreativeWorks);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedWork, setSelectedWork] = useState<CreativeWork | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para seleção múltipla
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<ApprovalStatus>('approved');
  
  // Estados para filtros avançados
  const [filterCampaign, setFilterCampaign] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeiNumber, setFilterSeiNumber] = useState('all');
  const [filterCommitmentNumber, setFilterCommitmentNumber] = useState('all');
  
  // Obter listas únicas de processos SEI e números de empenho dos dados
  const seiNumbers = [
    ...new Set(creativeWorks.map(work => work.seiNumber).filter(Boolean))
  ];
  
  const commitmentNumbers = [
    ...new Set(creativeWorks.map(work => work.commitmentNumber).filter(Boolean))
  ];
  
  // Obter configurações de empenho
  const [availableCommitmentNumbers, setAvailableCommitmentNumbers] = useState<string[]>([]);
  
  useEffect(() => {
    // Simular a obtenção de números de empenho disponíveis
    const activeConfig = sampleCommitmentNumberConfigs.find(config => config.active);
    if (activeConfig) {
      const start = activeConfig.lastUsedNumber + 1;
      const numbersArray = Array.from({ length: 10 }, (_, i) => 
        `${activeConfig.year}${activeConfig.prefix}${(start + i).toString().padStart(6, '0')}`
      );
      setAvailableCommitmentNumbers(numbersArray);
    }
  }, []);
  
  const handleStatusChange = (id: string, newStatus: ApprovalStatus, feedback?: string) => {
    setCreativeWorks(prev => 
      prev.map(work => 
        work.id === id ? { ...work, status: newStatus, feedback, updatedAt: new Date().toISOString() } : work
      )
    );
    
    toast({
      title: `Item ${newStatus === 'approved' ? 'aprovado' : 'rejeitado'}`,
      description: `O item foi ${newStatus === 'approved' ? 'aprovado' : 'rejeitado'} com sucesso.`,
      variant: newStatus === 'approved' ? 'default' : 'destructive'
    });
    
    setSelectedWork(null);
  };
  
  const handleBulkStatusChange = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Nenhum item selecionado",
        description: "Selecione pelo menos um item para realizar esta ação.",
        variant: "destructive"
      });
      return;
    }
    
    setCreativeWorks(prev =>
      prev.map(work =>
        selectedItems.includes(work.id)
          ? { ...work, status: bulkStatus, updatedAt: new Date().toISOString() }
          : work
      )
    );
    
    toast({
      title: "Status atualizado em massa",
      description: `${selectedItems.length} item(s) ${bulkStatus === 'approved' ? 'aprovado(s)' : bulkStatus === 'rejected' ? 'rejeitado(s)' : 'atualizado(s)'} com sucesso.`,
    });
    
    setSelectedItems([]);
    setBulkActionOpen(false);
  };
  
  const handleSubmitRequest = (formData: any) => {
    // Format the form data into the CreativeWork format
    const newWork: CreativeWork = {
      id: Date.now().toString(),
      campaignRequestId: formData.campaignId,
      title: formData.title,
      description: formData.observations || 'Sem descrição',
      type: 'image', // Default to image, should be determined by file type in a real implementation
      fileUrl: formData.file ? URL.createObjectURL(formData.file) : '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seiNumber: formData.seiNumber,
      commitmentNumber: formData.commitmentNumber,
      abapItemId: formData.abapItemId,
      itemValue: formData.itemValue,
      discountedValue: formData.discountedValue
    };
    
    setCreativeWorks(prev => [newWork, ...prev]);
    
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de criação foi enviada com sucesso e será analisada pela equipe."
    });
    
    setIsRequestDialogOpen(false);
  };
  
  const toggleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems(creativeWorks.map(work => work.id));
    } else {
      setSelectedItems([]);
    }
  };
  
  const toggleSelectItem = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };
  
  const resetFilters = () => {
    setFilterStatus('all');
    setFilterCampaign('all');
    setFilterType('all');
    setFilterSeiNumber('all');
    setFilterCommitmentNumber('all');
    setSearchTerm('');
    setIsFilterOpen(false);
  };
  
  return {
    creativeWorks,
    filterStatus,
    setFilterStatus,
    selectedWork,
    setSelectedWork,
    isPreviewOpen,
    setIsPreviewOpen,
    isRequestDialogOpen,
    setIsRequestDialogOpen,
    isFilterOpen,
    setIsFilterOpen,
    searchTerm,
    setSearchTerm,
    selectedItems,
    setSelectedItems,
    bulkActionOpen,
    setBulkActionOpen,
    bulkStatus,
    setBulkStatus,
    filterCampaign,
    setFilterCampaign,
    filterType,
    setFilterType,
    filterSeiNumber,
    setFilterSeiNumber,
    filterCommitmentNumber,
    setFilterCommitmentNumber,
    seiNumbers,
    commitmentNumbers,
    availableCommitmentNumbers,
    handleStatusChange,
    handleBulkStatusChange,
    handleSubmitRequest,
    toggleSelectAll,
    toggleSelectItem,
    resetFilters
  };
};
