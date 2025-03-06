import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fornecedor, EspelhoItem } from '../../types';
import { mockFornecedores } from '../../utils/mockData/fornecedores';
import { translateServiceType, translateServiceSubtype, getServiceSubtypeMap } from '../../utils/serviceTranslations';
import { EspelhoItemSchema, EspelhoItemFormValues } from '../EspelhoItemSchema';

export interface UseEspelhoItemFormProps {
  onAddItem: (item: EspelhoItem) => void;
  onCancel: () => void;
  campaignId?: string;
}

export function useEspelhoItemForm({ onAddItem, onCancel, campaignId }: UseEspelhoItemFormProps) {
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);
  const [filteredFornecedores, setFilteredFornecedores] = useState<Fornecedor[]>(mockFornecedores);

  const form = useForm<EspelhoItemFormValues>({
    resolver: zodResolver(EspelhoItemSchema),
    defaultValues: {
      fornecedorId: '',
      tipoServico: '',
      subtipoServico: '',
      descricao: '',
      quantidade: 1,
      valorUnitario: 0,
      valorLiquido: 0,
      valorBruto: 0,
    },
  });

  // Filter fornecedores based on campaign if needed
  useEffect(() => {
    if (campaignId) {
      const mockCampaigns = require('../../utils/mockData/campaigns').mockCampaigns;
      const campaign = mockCampaigns.find((c: any) => c.id === campaignId);
      if (campaign) {
        // For demonstration, we'll filter by service types that might be associated with the campaign
        if (campaign.title.includes('Vacinação') || campaign.title.includes('Saúde')) {
          // For health campaigns, prioritize media suppliers
          const relevantFornecedores = mockFornecedores.filter(f => 
            f.serviceTypes.includes('veiculacao')
          );
          setFilteredFornecedores(relevantFornecedores.length > 0 ? relevantFornecedores : mockFornecedores);
        } else if (campaign.title.includes('Educação')) {
          // For education campaigns, prioritize print material suppliers
          const relevantFornecedores = mockFornecedores.filter(f => 
            f.serviceTypes.includes('producao') && f.serviceSubtypes.includes('panfleto')
          );
          setFilteredFornecedores(relevantFornecedores.length > 0 ? relevantFornecedores : mockFornecedores);
        } else {
          setFilteredFornecedores(mockFornecedores);
        }
      }
    } else {
      setFilteredFornecedores(mockFornecedores);
    }
  }, [campaignId]);

  // Load service types and subtypes when fornecedor changes
  useEffect(() => {
    if (form.watch('fornecedorId')) {
      const fornecedor = mockFornecedores.find(f => f.id === form.watch('fornecedorId'));
      setSelectedFornecedor(fornecedor || null);
      
      // Reset service type and subtype
      form.setValue('tipoServico', '');
      form.setValue('subtipoServico', '');
    }
  }, [form.watch('fornecedorId')]);

  // Reset subtype when service type changes
  useEffect(() => {
    if (form.watch('tipoServico')) {
      form.setValue('subtipoServico', '');
    }
  }, [form.watch('tipoServico')]);

  // Calculate total value when quantity or unit value changes
  useEffect(() => {
    const quantidade = form.watch('quantidade') || 0;
    const valorUnitario = form.watch('valorUnitario') || 0;
    const valorLiquido = quantidade * valorUnitario;
    const valorBruto = valorLiquido * 1.15; // Adding 15% for taxes as an example
    
    form.setValue('valorLiquido', valorLiquido);
    form.setValue('valorBruto', valorBruto);
  }, [form.watch('quantidade'), form.watch('valorUnitario')]);

  // Auto-create descriptive text based on selected fields
  useEffect(() => {
    const tipoServico = form.watch('tipoServico');
    const subtipoServico = form.watch('subtipoServico');
    const fornecedorId = form.watch('fornecedorId');
    
    if (tipoServico && subtipoServico && fornecedorId) {
      const fornecedor = mockFornecedores.find(f => f.id === fornecedorId);
      
      if (campaignId) {
        const mockCampaigns = require('../../utils/mockData/campaigns').mockCampaigns;
        const campaign = mockCampaigns.find((c: any) => c.id === campaignId);
        
        if (fornecedor && campaign) {
          let descricaoAutomatica = '';
          
          if (tipoServico === 'veiculacao' && subtipoServico === 'radio') {
            descricaoAutomatica = `Spot 30s - ${campaign.title}`;
          } else if (tipoServico === 'veiculacao' && subtipoServico === 'televisao') {
            descricaoAutomatica = `VT 30s - ${campaign.title}`;
          } else if (tipoServico === 'producao' && subtipoServico === 'panfleto') {
            descricaoAutomatica = `Folhetos A5 4x4 - ${campaign.title}`;
          } else if (tipoServico === 'criacao' && subtipoServico === 'agencia') {
            descricaoAutomatica = `Criação de campanha completa para ${campaign.title}`;
          }
          
          if (descricaoAutomatica && !form.getValues('descricao')) {
            form.setValue('descricao', descricaoAutomatica);
          }
        }
      }
    }
  }, [form.watch('tipoServico'), form.watch('subtipoServico'), form.watch('fornecedorId'), campaignId]);

  const onSubmit = (data: EspelhoItemFormValues) => {
    const fornecedor = mockFornecedores.find(f => f.id === data.fornecedorId);
    
    if (!fornecedor) return;
    
    const newItem: EspelhoItem = {
      id: `item-${Date.now()}`,
      fornecedorId: data.fornecedorId,
      fornecedorNome: fornecedor.name,
      tipoServico: data.tipoServico,
      subtipoServico: data.subtipoServico,
      descricao: data.descricao,
      quantidade: data.quantidade,
      valorUnitario: data.valorUnitario,
      valorLiquido: data.valorLiquido,
      valorBruto: data.valorBruto,
      tipo: data.subtipoServico,
    };
    
    onAddItem(newItem);
    form.reset();
    onCancel();
  };

  // Subtypes filtering function to reuse across components
  const filterSubtypes = (selectedType: string, allSubtypes: string[]) => {
    const serviceSubtypeMap = getServiceSubtypeMap();
    const availableSubtypes = serviceSubtypeMap[selectedType] || [];
    return allSubtypes.filter(subtype => availableSubtypes.includes(subtype));
  };

  return {
    form,
    filteredFornecedores,
    selectedFornecedor,
    onSubmit,
    filterSubtypes,
    onCancel
  };
}
