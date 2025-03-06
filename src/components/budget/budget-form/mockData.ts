
import { Campaign, Supplier } from '@/lib/types';
import { Status } from '@/lib/types/common';

// Mock data for campaign budgets
export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Rádio Cidade FM',
    companyName: 'Cidade Comunicações LTDA',
    group: 'Grupo Cidade',
    cnpj: '12.345.678/0001-90',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['radio'],
    email: 'comercial@radiocidade.com.br',
    whatsapp: '(61) 99999-8888',
    active: true
  },
  {
    id: '2',
    name: 'Agência Criativa',
    companyName: 'Criativa Comunicação e Marketing LTDA',
    group: '',
    cnpj: '23.456.789/0001-01',
    serviceTypes: ['criacao'],
    serviceSubtypes: ['agencia'],
    email: 'contato@agenciacriativa.com.br',
    whatsapp: '(61) 98765-4321',
    active: true
  },
  {
    id: '3',
    name: 'Outdoor Brasil',
    companyName: 'Brasil Mídia Exterior LTDA',
    group: 'Grupo Mídia Brasil',
    cnpj: '34.567.890/0001-12',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['outdoor', 'placa'],
    email: 'vendas@outdoorbrasil.com.br',
    whatsapp: '(61) 99876-5432',
    active: true
  },
  {
    id: '4',
    name: 'Gráfica Express',
    companyName: 'Express Indústria Gráfica LTDA',
    group: '',
    cnpj: '45.678.901/0001-23',
    serviceTypes: ['producao'],
    serviceSubtypes: ['panfleto', 'camisa'],
    email: 'atendimento@graficaexpress.com.br',
    whatsapp: '(61) 95678-1234',
    active: true
  },
  {
    id: '5',
    name: 'TV Centro-Oeste',
    companyName: 'Centro-Oeste Comunicações S.A.',
    group: 'Rede Nacional',
    cnpj: '56.789.012/0001-34',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['televisao'],
    email: 'comercial@tvcentrooeste.com.br',
    whatsapp: '(61) 94567-8901',
    active: true
  },
  {
    id: '6',
    name: 'Digital Marketing Solutions',
    companyName: 'Solutions Marketing Digital LTDA',
    group: 'Grupo Internacional de Marketing',
    cnpj: '67.890.123/0001-45',
    serviceTypes: ['veiculacao', 'criacao'],
    serviceSubtypes: ['midia-digital', 'social-media'],
    email: 'contato@digitalmarketing.com.br',
    whatsapp: '(61) 93456-7890',
    active: true
  },
  {
    id: '7',
    name: 'Jornal Regional',
    companyName: 'Regional Editora de Jornais LTDA',
    group: 'Grupo Editorial Brasil',
    cnpj: '78.901.234/0001-56',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['jornal'],
    email: 'anuncios@jornalregional.com.br',
    whatsapp: '(61) 92345-6789',
    active: true
  },
  {
    id: '8',
    name: 'Produtora Audiovisual',
    companyName: 'Audiovisual Produções LTDA',
    group: 'Grupo Produção Audiovisual',
    cnpj: '89.012.345/0001-67',
    serviceTypes: ['producao'],
    serviceSubtypes: ['video', 'spot-radio'],
    email: 'contato@produtoraaudiovisual.com.br',
    whatsapp: '(61) 91234-5678',
    active: true
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Campanha de Vacinação',
    description: 'Campanha nacional de vacinação contra a gripe',
    startDate: '2023-05-01',
    endDate: '2023-06-15',
    totalBudget: 250000,
    status: 'in-progress' as Status, // Fixed status to use valid value
    budgetAllocations: [
      { id: 'alloc-1', supplierId: '1', amount: 50000, serviceType: 'veiculacao' },
      { id: 'alloc-2', supplierId: '2', amount: 70000, serviceType: 'criacao' },
      { id: 'alloc-3', supplierId: '4', amount: 30000, serviceType: 'producao' }
    ],
    createdAt: '2023-04-15T10:00:00Z',
    updatedAt: '2023-04-30T14:20:00Z'
  },
  {
    id: '2',
    title: 'Programa Educacional',
    description: 'Divulgação do novo programa educacional',
    startDate: '2023-07-01',
    endDate: '2023-08-30',
    totalBudget: 320000,
    status: 'in-progress' as Status, // Fixed status to use valid value
    budgetAllocations: [
      { id: 'alloc-4', supplierId: '3', amount: 60000, serviceType: 'veiculacao' },
      { id: 'alloc-5', supplierId: '5', amount: 120000, serviceType: 'veiculacao' },
      { id: 'alloc-6', supplierId: '2', amount: 80000, serviceType: 'criacao' },
      { id: 'alloc-7', supplierId: '4', amount: 40000, serviceType: 'producao' }
    ],
    createdAt: '2023-06-10T14:30:00Z',
    updatedAt: '2023-06-25T09:40:00Z'
  },
  {
    id: '3',
    title: 'Festival Cultural',
    description: 'Divulgação do festival cultural nacional',
    startDate: '2023-09-10',
    endDate: '2023-10-10',
    totalBudget: 180000,
    status: 'pending' as Status,
    budgetAllocations: [
      { id: 'alloc-8', supplierId: '1', amount: 40000, serviceType: 'veiculacao' },
      { id: 'alloc-9', supplierId: '6', amount: 60000, serviceType: 'veiculacao' },
      { id: 'alloc-10', supplierId: '2', amount: 50000, serviceType: 'criacao' },
      { id: 'alloc-11', supplierId: '8', amount: 30000, serviceType: 'producao' }
    ],
    createdAt: '2023-08-01T09:15:00Z',
    updatedAt: '2023-08-15T16:20:00Z'
  },
  {
    id: '4',
    title: 'Campanha de Segurança no Trânsito',
    description: 'Campanha de conscientização sobre segurança no trânsito',
    startDate: '2023-11-01',
    endDate: '2023-12-15',
    totalBudget: 200000,
    status: 'in-progress' as Status, // Fixed status to use valid value
    budgetAllocations: [
      { id: 'alloc-12', supplierId: '5', amount: 70000, serviceType: 'veiculacao' },
      { id: 'alloc-13', supplierId: '3', amount: 45000, serviceType: 'veiculacao' },
      { id: 'alloc-14', supplierId: '2', amount: 55000, serviceType: 'criacao' },
      { id: 'alloc-15', supplierId: '8', amount: 30000, serviceType: 'producao' }
    ],
    createdAt: '2023-10-05T11:30:00Z',
    updatedAt: '2023-10-20T14:15:00Z'
  },
  {
    id: '5',
    title: 'Promoção do Turismo Regional',
    description: 'Campanha para promoção de destinos turísticos regionais',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    totalBudget: 275000,
    status: 'pending' as Status,
    budgetAllocations: [
      { id: 'alloc-16', supplierId: '1', amount: 45000, serviceType: 'veiculacao' },
      { id: 'alloc-17', supplierId: '5', amount: 85000, serviceType: 'veiculacao' },
      { id: 'alloc-18', supplierId: '6', amount: 55000, serviceType: 'veiculacao' },
      { id: 'alloc-19', supplierId: '2', amount: 60000, serviceType: 'criacao' },
      { id: 'alloc-20', supplierId: '4', amount: 30000, serviceType: 'producao' }
    ],
    createdAt: '2023-12-10T10:45:00Z',
    updatedAt: '2023-12-20T13:20:00Z'
  }
];
