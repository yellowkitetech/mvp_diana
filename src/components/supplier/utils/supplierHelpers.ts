
import { ServiceType, ServiceSubtype, Supplier } from '@/lib/types';

// Mock data for suppliers
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
  },
  {
    id: '9',
    name: 'Agência de Design',
    companyName: 'Design Criativo LTDA',
    group: 'Grupo Design Criativo',
    cnpj: '90.123.456/0001-78',
    serviceTypes: ['criacao'],
    serviceSubtypes: ['agencia'],
    email: 'contato@agenciadesign.com.br',
    whatsapp: '(61) 90123-4567',
    active: false
  },
  {
    id: '10',
    name: 'OutBus Media',
    companyName: 'OutBus Mídia em Transporte LTDA',
    group: 'Grupo Outdoor Brasil',
    cnpj: '01.234.567/0001-89',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['outbus'],
    email: 'comercial@outbusmedia.com.br',
    whatsapp: '(61) 98765-0123',
    active: true
  }
];

// Filter suppliers based on search term
export const filterSuppliers = (suppliers: Supplier[], searchTerm: string): Supplier[] => {
  if (!searchTerm) return suppliers;
  
  const term = searchTerm.toLowerCase();
  return suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(term) ||
    supplier.companyName.toLowerCase().includes(term) ||
    supplier.cnpj.includes(term)
  );
};

// Filter suppliers by service type
export const filterByServiceType = (suppliers: Supplier[], serviceType: string): Supplier[] => {
  if (!serviceType || serviceType === 'all') return suppliers;
  
  return suppliers.filter(supplier => 
    supplier.serviceTypes.includes(serviceType as ServiceType)
  );
};

// Filter suppliers by active status
export const filterByActiveStatus = (suppliers: Supplier[], onlyActive: boolean): Supplier[] => {
  if (!onlyActive) return suppliers;
  
  return suppliers.filter(supplier => supplier.active);
};

// Get unique service types from suppliers
export const getUniqueServiceTypes = (suppliers: Supplier[]): string[] => {
  const allServiceTypes = suppliers.flatMap(supplier => supplier.serviceTypes);
  return [...new Set(allServiceTypes)];
};

// Get unique service subtypes from suppliers
export const getUniqueServiceSubtypes = (suppliers: Supplier[]): string[] => {
  const allServiceSubtypes = suppliers.flatMap(supplier => supplier.serviceSubtypes);
  return [...new Set(allServiceSubtypes)];
};
