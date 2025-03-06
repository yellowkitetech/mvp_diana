
import { 
  Agency, 
  Process, 
  Communication, 
  User, 
  Status,
  MediaPlan,
  DashboardMetrics,
  Supplier,
  CommitmentNumberConfig,
  AbapTableItem
} from './types';

// Sample Agencies
export const sampleAgencies: Agency[] = [
  {
    id: "1",
    name: "Agência Cálice Propaganda",
    contactPerson: "José Silva",
    email: "jose@calice.com",
    phone: "(61) 99999-8888",
    address: "SCS Quadra 8, Bloco B-50, Sala 401, Brasília/DF",
    active: true
  },
  {
    id: "2",
    name: "Comunicação Visual Ltda",
    contactPerson: "Maria Souza",
    email: "maria@comvisual.com",
    phone: "(61) 98765-4321",
    address: "SIA Trecho 3, Lote 625, Sala 301, Brasília/DF",
    active: true
  },
  {
    id: "3",
    name: "PubliMídia Comunicação",
    contactPerson: "Carlos Mendes",
    email: "carlos@publimidia.com",
    phone: "(61) 97777-5555",
    address: "SRTVS Quadra 701, Bloco A, Sala 410, Brasília/DF",
    active: false
  }
];

// Helper function to get agency by id
export const getAgencyById = (id: string): Agency | undefined => {
  return sampleAgencies.find(agency => agency.id === id);
};

// Sample Users
export const sampleUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@diana.gov.br",
    role: "admin",
    avatar: "/lovable-uploads/231970b0-2bb9-411f-8fd0-fc836eadac05.png"
  },
  {
    id: "2",
    name: "Agency Manager",
    email: "agency@calice.com",
    role: "agency",
    avatar: "/lovable-uploads/40df758b-1d70-43a5-9fd5-4737fc31bb53.png",
    agencyId: "1"
  },
  {
    id: "3",
    name: "SECOM Analyst",
    email: "analyst@diana.gov.br",
    role: "analyst",
    avatar: "/lovable-uploads/8608bfdc-de99-4292-8685-c85a58eeeb42.png"
  }
];

// Current user (simulando usuário logado)
export const currentUser: User = sampleUsers[0];

// Sample Processes
export const sampleProcesses: Process[] = [
  {
    id: "1",
    title: "Campanha de Vacinação",
    description: "Desenvolvimento de materiais para a campanha nacional de vacinação contra a gripe.",
    agencyId: "1",
    status: "in-progress",
    priority: "high",
    createdAt: "2023-03-10T14:30:00Z",
    updatedAt: "2023-03-12T09:15:00Z",
    dueDate: "2023-04-15T23:59:59Z",
    campaignId: "campaign1",
    seiNumber: "00001.000123/2023-45",
    commitmentNumber: "2023NE000123"
  },
  {
    id: "2",
    title: "Evento de Educação Pública",
    description: "Divulgação e materiais para o evento nacional de educação pública que ocorrerá em junho.",
    agencyId: "1",
    status: "pending",
    priority: "medium",
    createdAt: "2023-03-05T11:20:00Z",
    updatedAt: "2023-03-05T11:20:00Z",
    dueDate: "2023-05-20T23:59:59Z"
  },
  {
    id: "3",
    title: "Campanha de Segurança Viária",
    description: "Desenvolvimento da campanha educativa sobre segurança no trânsito para o período de férias.",
    agencyId: "2",
    status: "completed",
    priority: "medium",
    createdAt: "2023-02-15T09:45:00Z",
    updatedAt: "2023-03-01T16:30:00Z",
    dueDate: "2023-03-01T23:59:59Z",
    campaignId: "campaign2",
    seiNumber: "00001.000456/2023-78"
  },
  {
    id: "4",
    title: "Programa Habitacional",
    description: "Materiais de divulgação para o novo programa habitacional do governo.",
    agencyId: "2",
    status: "in-progress",
    priority: "high",
    createdAt: "2023-03-08T10:00:00Z",
    updatedAt: "2023-03-10T14:45:00Z",
    dueDate: "2023-04-10T23:59:59Z"
  },
  {
    id: "5",
    title: "Campanha de Incentivo ao Esporte",
    description: "Desenvolvimento de materiais para a campanha de incentivo à prática esportiva.",
    agencyId: "3",
    status: "pending",
    priority: "low",
    createdAt: "2023-03-12T15:30:00Z",
    updatedAt: "2023-03-12T15:30:00Z",
    dueDate: "2023-05-01T23:59:59Z"
  }
];

// Helper function to get process by id
export const getProcessById = (id: string): Process | undefined => {
  return sampleProcesses.find(process => process.id === id);
};

// Sample Communications
export const sampleCommunications: Communication[] = [
  {
    id: "1",
    processId: "1",
    sender: "Admin User",
    recipient: "Agency Manager",
    subject: "Revisão da arte para a campanha de vacinação",
    message: "Olá, precisamos revisar a arte enviada para a campanha de vacinação. Há alguns ajustes de cores e posicionamento do logo que precisam ser feitos. Você pode enviar uma versão atualizada até amanhã?",
    attachments: [],
    createdAt: "2023-03-11T10:15:00Z",
    read: true
  },
  {
    id: "2",
    processId: "1",
    sender: "Agency Manager",
    recipient: "Admin User",
    subject: "Re: Revisão da arte para a campanha de vacinação",
    message: "Olá, recebemos suas considerações e estamos trabalhando nos ajustes solicitados. Enviaremos a versão atualizada até o final do dia hoje. Alguma outra orientação ou ajuste que gostaria que déssemos atenção especial?",
    attachments: [],
    createdAt: "2023-03-11T14:30:00Z",
    read: true
  },
  {
    id: "3",
    processId: "2",
    sender: "Admin User",
    recipient: "Agency Manager",
    subject: "Materiais para o evento de educação",
    message: "Precisamos iniciar o desenvolvimento dos materiais para o evento de educação pública. Você já recebeu o briefing? Vamos agendar uma reunião para discutir os detalhes?",
    attachments: [],
    createdAt: "2023-03-07T09:45:00Z",
    read: false
  },
  {
    id: "4",
    processId: "4",
    sender: "SECOM Analyst",
    recipient: "Agency Manager",
    subject: "Aprovação das peças do programa habitacional",
    message: "As peças enviadas para o programa habitacional foram aprovadas pela diretoria. Vocês podem iniciar a produção conforme o cronograma discutido.",
    attachments: ["aprovacao_diretoria.pdf"],
    createdAt: "2023-03-10T16:20:00Z",
    read: false
  }
];

// Helper function to get communications by process id
export const getCommunicationsByProcessId = (processId: string): Communication[] => {
  return sampleCommunications.filter(comm => comm.processId === processId);
};

// Sample Media Plans
export const sampleMediaPlans: MediaPlan[] = [
  {
    id: "1",
    campaignRequestId: "1",
    title: "Plano de Mídia - Campanha de Vacinação",
    description: "Distribuição de mídia para a campanha nacional de vacinação contra a gripe",
    startDate: "2023-04-01",
    endDate: "2023-05-15",
    totalValue: 250000,
    status: "pending",
    items: [
      {
        id: "item1",
        vehicle: "TV Centro-Oeste",
        format: "Comercial 30s",
        startDate: "2023-04-01",
        endDate: "2023-04-30",
        quantity: 45,
        unitValue: 2000,
        totalValue: 90000
      },
      {
        id: "item2",
        vehicle: "Rádio Capital",
        format: "Spot 30s",
        startDate: "2023-04-01",
        endDate: "2023-05-15",
        quantity: 300,
        unitValue: 200,
        totalValue: 60000
      },
      {
        id: "item3",
        vehicle: "Jornal da Cidade",
        format: "1/2 Página",
        startDate: "2023-04-05",
        endDate: "2023-05-10",
        quantity: 10,
        unitValue: 5000,
        totalValue: 50000
      },
      {
        id: "item4",
        vehicle: "Portal de Notícias",
        format: "Banner principal",
        startDate: "2023-04-01",
        endDate: "2023-05-15",
        quantity: 45,
        unitValue: 1000,
        totalValue: 45000
      }
    ],
    attachments: ["detalhamento_midia.pdf", "cronograma_insercoes.xlsx"],
    createdAt: "2023-03-15T10:00:00Z",
    updatedAt: "2023-03-15T10:00:00Z",
    campaignId: "campaign1",
    seiNumber: "00001.000123/2023-45",
    commitmentNumber: "2023NE000123"
  },
  {
    id: "2",
    campaignRequestId: "4",
    title: "Plano de Mídia - Programa Habitacional",
    description: "Distribuição de mídia para divulgação do novo programa habitacional",
    startDate: "2023-04-15",
    endDate: "2023-06-15",
    totalValue: 300000,
    status: "approved",
    items: [
      {
        id: "item1",
        vehicle: "TV Nacional",
        format: "Comercial 30s",
        startDate: "2023-04-15",
        endDate: "2023-06-15",
        quantity: 60,
        unitValue: 3000,
        totalValue: 180000
      },
      {
        id: "item2",
        vehicle: "Rádio Metropolitana",
        format: "Spot 30s",
        startDate: "2023-04-20",
        endDate: "2023-06-10",
        quantity: 240,
        unitValue: 250,
        totalValue: 60000
      },
      {
        id: "item3",
        vehicle: "Outdoor Digital",
        format: "Painel LED",
        startDate: "2023-05-01",
        endDate: "2023-06-01",
        quantity: 12,
        unitValue: 5000,
        totalValue: 60000
      }
    ],
    attachments: ["plano_midia_habitacional.pdf"],
    createdAt: "2023-03-20T14:30:00Z",
    updatedAt: "2023-03-22T09:15:00Z"
  },
  {
    id: "3",
    campaignRequestId: "5",
    title: "Plano de Mídia - Incentivo ao Esporte",
    description: "Veiculação da campanha de incentivo à prática esportiva",
    startDate: "2023-05-10",
    endDate: "2023-07-10",
    totalValue: 150000,
    status: "rejected",
    items: [
      {
        id: "item1",
        vehicle: "Rádio Jovem",
        format: "Spot 20s",
        startDate: "2023-05-10",
        endDate: "2023-07-10",
        quantity: 180,
        unitValue: 150,
        totalValue: 27000
      },
      {
        id: "item2",
        vehicle: "Portais Esportivos",
        format: "Banner lateral",
        startDate: "2023-05-15",
        endDate: "2023-07-05",
        quantity: 60,
        unitValue: 800,
        totalValue: 48000
      },
      {
        id: "item3",
        vehicle: "Mídia Exterior",
        format: "Busdoor",
        startDate: "2023-06-01",
        endDate: "2023-06-30",
        quantity: 50,
        unitValue: 1500,
        totalValue: 75000
      }
    ],
    attachments: ["plano_midia_esporte.pdf", "justificativa_midia.docx"],
    createdAt: "2023-03-25T11:20:00Z",
    updatedAt: "2023-03-28T16:40:00Z",
    campaignId: "campaign3"
  }
];

// Sample Dashboard Metrics
export const dashboardMetrics: DashboardMetrics = {
  totalCampaigns: 8,
  pendingApprovals: 5,
  ongoingCampaigns: 3,
  completedCampaigns: 2,
  totalBudget: 1000000,
  committedBudget: 700000,
  remainingBudget: 300000,
  campaignsByDepartment: [
    { departmentId: "dept1", count: 3 },
    { departmentId: "dept2", count: 2 },
    { departmentId: "dept3", count: 1 },
    { departmentId: "dept4", count: 2 }
  ],
  invoicesByStatus: [
    { status: "pending", count: 5, value: 250000 },
    { status: "verified", count: 3, value: 150000 },
    { status: "paid", count: 7, value: 300000 },
    { status: "cancelled", count: 1, value: 25000 }
  ]
};

// Sample Suppliers
export const sampleSuppliers: Supplier[] = [
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
  }
];

// Função auxiliar para verificar se um processo está faltando informações importantes
export const isMissingImportantInfo = (process: Process): boolean => {
  return !process.campaignId || !process.seiNumber || !process.commitmentNumber;
};

// Função auxiliar para contar processos com informações faltantes
export const countProcessesMissingInfo = (): { total: number, campaign: number, sei: number, commitment: number } => {
  const result = { 
    total: 0, 
    campaign: 0, 
    sei: 0, 
    commitment: 0 
  };
  
  sampleProcesses.forEach(process => {
    if (!process.campaignId) {
      result.campaign++;
      result.total = result.total || 1;
    }
    if (!process.seiNumber) {
      result.sei++;
      result.total = result.total || 1;
    }
    if (!process.commitmentNumber) {
      result.commitment++;
      result.total = result.total || 1;
    }
  });
  
  return result;
};

// Função auxiliar para atualizar um processo
export const updateProcess = (process: Process): void => {
  const index = sampleProcesses.findIndex(p => p.id === process.id);
  if (index !== -1) {
    sampleProcesses[index] = {
      ...sampleProcesses[index],
      ...process,
      updatedAt: new Date().toISOString()
    };
  }
};

// Sample commitment number configurations
export const sampleCommitmentNumberConfigs: CommitmentNumberConfig[] = [
  {
    id: "1",
    prefix: "NE",
    lastUsedNumber: 123,
    year: 2023,
    active: true
  },
  {
    id: "2",
    prefix: "NE",
    lastUsedNumber: 45,
    year: 2024,
    active: true
  }
];

// Helper function to get the next commitment number
export const getNextCommitmentNumber = (): string => {
  const activeConfig = sampleCommitmentNumberConfigs.find(config => config.active);
  
  if (!activeConfig) {
    return '';
  }
  
  const nextNumber = activeConfig.lastUsedNumber + 1;
  return `${activeConfig.year}${activeConfig.prefix}${nextNumber.toString().padStart(6, '0')}`;
};

// Helper function to update commitment number config
export const updateCommitmentNumberConfig = (config: CommitmentNumberConfig): void => {
  const index = sampleCommitmentNumberConfigs.findIndex(c => c.id === config.id);
  if (index !== -1) {
    sampleCommitmentNumberConfigs[index] = {
      ...config
    };
  }
};

// Helper function to add new commitment number config
export const addCommitmentNumberConfig = (config: Omit<CommitmentNumberConfig, 'id'>): CommitmentNumberConfig => {
  const newId = (sampleCommitmentNumberConfigs.length + 1).toString();
  const newConfig: CommitmentNumberConfig = {
    id: newId,
    ...config
  };
  
  sampleCommitmentNumberConfigs.push(newConfig);
  return newConfig;
};

// Helper function to delete commitment number config
export const deleteCommitmentNumberConfig = (id: string): boolean => {
  const index = sampleCommitmentNumberConfigs.findIndex(c => c.id === id);
  if (index !== -1) {
    sampleCommitmentNumberConfigs.splice(index, 1);
    return true;
  }
  return false;
};

// Sample ABAP Table items
export const sampleAbapTableItems: AbapTableItem[] = [
  // JORNAL
  { id: "1", number: 1, name: "Menor ou igual a 1/4 de página", type: "JORNAL", description: "Anúncio em jornal de até 1/4 de página", value: 2500.93 },
  { id: "2", number: 2, name: "Até 1/3 de página", type: "JORNAL", description: "Anúncio em jornal de até 1/3 de página", value: 2922.77 },
  { id: "3", number: 3, name: "Até 1/2 de página", type: "JORNAL", description: "Anúncio em jornal de até 1/2 de página", value: 4118.93 },
  { id: "4", number: 4, name: "Até 2/3 de página", type: "JORNAL", description: "Anúncio em jornal de até 2/3 de página", value: 4594.52 },
  { id: "5", number: 5, name: "Até 1 página", type: "JORNAL", description: "Anúncio em jornal de 1 página inteira", value: 6236.82 },
  { id: "6", number: 6, name: "Até Página Dupla", type: "JORNAL", description: "Anúncio em jornal em página dupla", value: 10206.48 },
  
  // REVISTA
  { id: "7", number: 7, name: "Até ½ página", type: "REVISTA", description: "Anúncio em revista de até 1/2 página", value: 3057.91 },
  { id: "8", number: 8, name: "Até 1 página", type: "REVISTA", description: "Anúncio em revista de 1 página inteira", value: 4784.25 },
  { id: "9", number: 9, name: "Página Dupla", type: "REVISTA", description: "Anúncio em revista em página dupla", value: 7414.31 },
  
  // ANÚNCIO LEGAL
  { id: "10", number: 10, name: "Até 1/4 página", type: "ANÚNCIO LEGAL", description: "Anúncio legal de até 1/4 de página", value: 1582.70 },
  { id: "11", number: 11, name: "Até ½ página", type: "ANÚNCIO LEGAL", description: "Anúncio legal de até 1/2 página", value: 2965.68 },
  { id: "12", number: 12, name: "Até 1 página", type: "ANÚNCIO LEGAL", description: "Anúncio legal de 1 página inteira", value: 5647.91 },
  { id: "13", number: 13, name: "Página Dupla", type: "ANÚNCIO LEGAL", description: "Anúncio legal em página dupla", value: 9880.59 },
  
  // IMPRESSOS / FOLDERS
  { id: "14", number: 14, name: "Capa de Agenda", type: "IMPRESSOS / FOLDERS", description: "Design de capa para agenda", value: 3305.78 },
  { id: "15", number: 15, name: "Capa de CD/ DVD", type: "IMPRESSOS / FOLDERS", description: "Design de capa para CD/DVD", value: 4732.83 },
  { id: "16", number: 16, name: "Capa de Relatório / Caderno / Revista", type: "IMPRESSOS / FOLDERS", description: "Design de capa para relatório, caderno ou revista", value: 5946.80 },
  { id: "17", number: 17, name: "Catálogo (qualquer tamanho)/ Encarte Varejo", type: "IMPRESSOS / FOLDERS", description: "Design de catálogo ou encarte de varejo", value: 1260.02 },
  { id: "18", number: 18, name: "Cinta para Jornal", type: "IMPRESSOS / FOLDERS", description: "Design de cinta para jornal", value: 3057.91 },
  { id: "19", number: 19, name: "Encarte Jornal / Revista", type: "IMPRESSOS / FOLDERS", description: "Design de encarte para jornal ou revista", value: 4072.08 },
  { id: "20", number: 20, name: "Folder com página igual ou maior que A4, até 8 páginas", type: "IMPRESSOS / FOLDERS", description: "Design de folder tamanho A4 ou maior, até 8 páginas", value: 1782.47 },
  { id: "21", number: 21, name: "Folder com página igual ou maior que A4, acima de 8 páginas", type: "IMPRESSOS / FOLDERS", description: "Design de folder tamanho A4 ou maior, acima de 8 páginas", value: 1567.36 },
  { id: "22", number: 22, name: "Folder com página menor que A4, até 8 páginas", type: "IMPRESSOS / FOLDERS", description: "Design de folder menor que A4, até 8 páginas", value: 1567.36 },
  { id: "23", number: 23, name: "Folder com página menor que A4, acima 8 páginas", type: "IMPRESSOS / FOLDERS", description: "Design de folder menor que A4, acima de 8 páginas", value: 1256.36 },
  { id: "24", number: 24, name: "Envelope / Caixa especial para Folder", type: "IMPRESSOS / FOLDERS", description: "Design de envelope ou caixa especial para folder", value: 4072.08 },
  { id: "25", number: 25, name: "Folheto / Panfleto / Volante (com página até tamanho A5)", type: "IMPRESSOS / FOLDERS", description: "Design de folheto, panfleto ou volante até tamanho A5", value: 1780.08 },
  { id: "26", number: 26, name: "Folheto Técnico / Manual Técnico", type: "IMPRESSOS / FOLDERS", description: "Design de folheto técnico ou manual técnico", value: 1782.47 },
  { id: "27", number: 27, name: "House Organ (Jornal de empresas)-Diagramação", type: "IMPRESSOS / FOLDERS", description: "Diagramação de jornal empresarial (house organ)", value: 768.30 },
  { id: "28", number: 28, name: "House Organ (Jornal de empresas)-Projeto Gráfico", type: "IMPRESSOS / FOLDERS", description: "Projeto gráfico de jornal empresarial (house organ)", value: 4072.08 },
  { id: "29", number: 29, name: "Mala", type: "IMPRESSOS / FOLDERS", description: "Design de mala direta", value: 4708.09 },
  { id: "30", number: 30, name: "Relatório - Diagramação", type: "IMPRESSOS / FOLDERS", description: "Diagramação de relatório", value: 1782.47 },
  
  // PAPELARIA
  { id: "31", number: 31, name: "Bloco de Anotações (capa, uma folha de miolo e capa do verso)", type: "PAPELARIA", description: "Design de bloco de anotações completo", value: 1183.21 },
  { id: "32", number: 32, name: "Cartão de Visita", type: "PAPELARIA", description: "Design de cartão de visita", value: 2320.30 },
  { id: "33", number: 33, name: "Variação de nomes e endereços (20% do valor unitário)", type: "PAPELARIA", description: "Variações de cartões de visita", value: 476.33 },
  { id: "34", number: 34, name: "Envelope Pequeno", type: "PAPELARIA", description: "Design de envelope pequeno", value: 1183.21 },
  { id: "35", number: 35, name: "Envelope Saco/Ofício", type: "PAPELARIA", description: "Design de envelope saco ou ofício", value: 1183.21 },
  { id: "36", number: 36, name: "Papel Carta", type: "PAPELARIA", description: "Design de papel carta", value: 1183.21 },
  { id: "37", number: 37, name: "Papel Embrulho / Presente / Sacolas", type: "PAPELARIA", description: "Design de papel para embrulho, presente ou sacolas", value: 2320.30 },
  { id: "38", number: 38, name: "Papel de Parede", type: "PAPELARIA", description: "Design de papel de parede", value: 2320.30 },
  { id: "39", number: 39, name: "Pasta", type: "PAPELARIA", description: "Design de pasta", value: 2320.30 },
  
  // IDENTIDADE CORPORATIVA
  { id: "40", number: 40, name: "Marca de Empresa", type: "IDENTIDADE CORPORATIVA", description: "Criação de marca para empresa", value: 15828.57 },
  { id: "41", number: 41, name: "Marca + Papelaria básica", type: "IDENTIDADE CORPORATIVA", description: "Criação de marca com papelaria básica", value: 17709.93 },
  { id: "42", number: 42, name: "Marca de Produto", type: "IDENTIDADE CORPORATIVA", description: "Criação de marca para produto", value: 12574.37 },
  { id: "43", number: 43, name: "Imobiliário ou Eventos", type: "IDENTIDADE CORPORATIVA", description: "Criação de marca para imobiliário ou eventos", value: 5755.34 },
  { id: "44", number: 44, name: "Reformulação de Marca", type: "IDENTIDADE CORPORATIVA", description: "Reformulação de marca existente", value: 8223.82 },
  { id: "45", number: 45, name: "Selo Comemorativo", type: "IDENTIDADE CORPORATIVA", description: "Criação de selo comemorativo", value: 5412.64 },
  { id: "46", number: 46, name: "Manual de Identidade Visual (por página)", type: "IDENTIDADE CORPORATIVA", description: "Elaboração de manual de identidade visual (por página)", value: 906.61 },
  { id: "47", number: 47, name: "Slogan", type: "IDENTIDADE CORPORATIVA", description: "Criação de slogan", value: 7508.32 },
  { id: "48", number: 48, name: "Uniforme", type: "IDENTIDADE CORPORATIVA", description: "Design de uniforme", value: 2339.39 },
  { id: "49", number: 49, name: "Placas de sinalização para portas, estacionamento, etc.(unidade)", type: "IDENTIDADE CORPORATIVA", description: "Design de placas de sinalização (por unidade)", value: 215.12 },
  
  // EMBALAGENS
  { id: "50", number: 50, name: "Embalagem de produto (caixa, saco, lata, etc.)", type: "EMBALAGENS", description: "Design de embalagem de produto", value: 13024.90 },
  { id: "51", number: 51, name: "Adaptação / reformulação de embalagem (para linha de produtos)", type: "EMBALAGENS", description: "Adaptação ou reformulação de embalagem", value: 6494.57 },
  { id: "52", number: 52, name: "Rótulo", type: "EMBALAGENS", description: "Design de rótulo", value: 11654.77 },
  { id: "53", number: 53, name: "Reformulação / adaptação de Rótulo", type: "EMBALAGENS", description: "Reformulação ou adaptação de rótulo", value: 5458.75 },
  { id: "54", number: 54, name: "Display para folder e produtos", type: "EMBALAGENS", description: "Design de display para folder e produtos", value: 6069.71 },
  
  // SPOT DE RÁDIO
  { id: "55", number: 55, name: "SPOT 30\"", type: "SPOT DE RÁDIO", description: "Criação de spot de rádio de 30 segundos", value: 1932.66 },
  { id: "56", number: 56, name: "SPOT 45\"", type: "SPOT DE RÁDIO", description: "Criação de spot de rádio de 45 segundos", value: 1982.24 },
  { id: "57", number: 57, name: "SPOT 60\"", type: "SPOT DE RÁDIO", description: "Criação de spot de rádio de 60 segundos", value: 2761.88 },
  
  // FONOGRAMA (jingle/trilha)
  { id: "58", number: 58, name: "Jingle institucional 30\"", type: "FONOGRAMA", description: "Criação de jingle institucional de 30 segundos", value: 4115.11 },
  { id: "59", number: 59, name: "Jingle institucional 45\"", type: "FONOGRAMA", description: "Criação de jingle institucional de 45 segundos", value: 4901.87 },
  { id: "60", number: 60, name: "Jingle institucional 60\"", type: "FONOGRAMA", description: "Criação de jingle institucional de 60 segundos", value: 5823.83 },
  
  // VT
  { id: "61", number: 61, name: "30\"", type: "VT", description: "Criação de VT de 30 segundos", value: 6263.21 },
  { id: "62", number: 62, name: "60\"", type: "VT", description: "Criação de VT de 60 segundos", value: 8091.44 },
  { id: "63", number: 63, name: "Cartelas eletrônicas para varejo (unidade)", type: "VT", description: "Criação de cartelas eletrônicas para varejo (por unidade)", value: 1085.41 },
  { id: "64", number: 64, name: "Varejo: Troca de ofertas", type: "VT", description: "Troca de ofertas em VT de varejo", value: 983.43 },
  
  // ASSINATURA
  { id: "65", number: 65, name: "Vinheta Eletrônica (storyboard e roteiro)", type: "ASSINATURA", description: "Criação de vinheta eletrônica com storyboard e roteiro", value: 1466.98 },
  
  // ÁUDIO VISUAL / DOCUMENTÁRIO
  { id: "66", number: 66, name: "Qualquer segmento", type: "ÁUDIO VISUAL / DOCUMENTÁRIO", description: "Produção de conteúdo audiovisual ou documentário", value: 4801.06 },
  
  // OUTDOOR / MÍDIA EXTERIOR
  { id: "67", number: 67, name: "Outdoor", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de outdoor", value: 4881.27 },
  { id: "68", number: 68, name: "Backbus", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de backbus", value: 4206.36 },
  { id: "69", number: 69, name: "Lateral de ônibus", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de lateral de ônibus", value: 3129.39 },
  { id: "70", number: 70, name: "Busdoor", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de busdoor", value: 2936.10 },
  { id: "71", number: 71, name: "Envelopamento de automóvel (preço mínimo)", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de envelopamento de automóvel", value: 3918.42 },
  { id: "72", number: 72, name: "Painel frontal -Ponto de ônibus", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de painel frontal para ponto de ônibus", value: 3918.42 },
  { id: "73", number: 73, name: "Painel lateral -Ponto de ônibus", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de painel lateral para ponto de ônibus", value: 2658.37 },
  { id: "74", number: 74, name: "Lightdoor / Backlight/ Frontlight", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de lightdoor, backlight ou frontlight", value: 5997.03 },
  { id: "75", number: 75, name: "Muro / Tapume", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de mídia para muro ou tapume", value: 5547.26 },
  { id: "76", number: 76, name: "Postdoor / placa de esquina", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de postdoor ou placa de esquina", value: 1265.02 },
  { id: "77", number: 77, name: "Balão Promocional", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de balão promocional", value: 989.67 },
  { id: "78", number: 78, name: "Relógio Digital", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de mídia para relógio digital", value: 2781.32 },
  { id: "79", number: 79, name: "Placa/Painel sinalização", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de placa ou painel de sinalização", value: 1015.66 },
  { id: "80", number: 80, name: "Placa/ Painel - empreendimento/rodovia", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de placa ou painel para empreendimento ou rodovia", value: 3918.42 },
  { id: "81", number: 81, name: "Estandarte / Galhardete / Faixa Avião / Faxa Rua", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de estandarte, galhardete, faixa de avião ou faixa de rua", value: 1170.94 },
  { id: "82", number: 82, name: "Empena de Prédio (avaliar caso a caso) - Preço mínimo", type: "OUTDOOR / MÍDIA EXTERIOR", description: "Criação de empena de prédio (preço mínimo)", value: 7344.28 },
  
  // MATERIAL PROMOCIONAL
  { id: "83", number: 83, name: "Adesivo", type: "MATERIAL PROMOCIONAL", description: "Criação de adesivo", value: 1417.79 },
  { id: "84", number: 84, name: "Adesivo de chão", type: "MATERIAL PROMOCIONAL", description: "Criação de adesivo de chão", value: 3425.86 },
  { id: "85", number: 85, name: "Camisa", type: "MATERIAL PROMOCIONAL", description: "Criação de design para camisa", value: 1851.84 },
  { id: "86", number: 86, name: "Bandeira", type: "MATERIAL PROMOCIONAL", description: "Criação de bandeira", value: 1548.48 },
  { id: "87", number: 87, name: "Bandeirola (frente e verso)/ Móbile Simples", type: "MATERIAL PROMOCIONAL", description: "Criação de bandeirola ou móbile simples", value: 2177.75 },
  { id: "88", number: 88, name: "Móbile com facas especiais", type: "MATERIAL PROMOCIONAL", description: "Criação de móbile com facas especiais", value: 2658.36 },
  { id: "89", number: 89, name: "Banner recorte", type: "MATERIAL PROMOCIONAL", description: "Criação de banner com recorte", value: 1329.84 },
  { id: "90", number: 90, name: "Banner Policromia", type: "MATERIAL PROMOCIONAL", description: "Criação de banner em policromia", value: 2663.18 },
  { id: "91", number: 91, name: "Boné/ Chaveiro / Crachá / Caneta / Imã de geladeira / Brindes simples", type: "MATERIAL PROMOCIONAL", description: "Criação de design para brindes simples", value: 1404.43 },
  { id: "92", number: 92, name: "Broadside (por página)", type: "MATERIAL PROMOCIONAL", description: "Criação de broadside (por página)", value: 3083.50 },
  { id: "93", number: 93, name: "Capa Carnê", type: "MATERIAL PROMOCIONAL", description: "Criação de capa para carnê", value: 1210.52 },
  { id: "94", number: 94, name: "Cartão de Natal Padrão", type: "MATERIAL PROMOCIONAL", description: "Criação de cartão de natal padrão", value: 3205.91 },
  { id: "95", number: 95, name: "Cartaz A3 ou maior", type: "MATERIAL PROMOCIONAL", description: "Criação de cartaz A3 ou maior", value: 2781.32 },
  { id: "96", number: 96, name: "Cartaz p/ Varejo", type: "MATERIAL PROMOCIONAL", description: "Criação de cartaz para varejo", value: 2074.46 },
  { id: "97", number: 97, name: "Copo / Caneca", type: "MATERIAL PROMOCIONAL", description: "Criação de design para copo ou caneca", value: 1183.21 },
  { id: "98", number: 98, name: "Cupom", type: "MATERIAL PROMOCIONAL", description: "Criação de cupom", value: 1106.38 },
  { id: "99", number: 99, name: "Diploma", type: "MATERIAL PROMOCIONAL", description: "Criação de diploma", value: 2074.46 },
  { id: "100", number: 100, name: "Display Balcão/Parede", type: "MATERIAL PROMOCIONAL", description: "Criação de display para balcão ou parede", value: 1167.37 },
  { id: "101", number: 101, name: "Faixa de Gôndola / Stopper", type: "MATERIAL PROMOCIONAL", description: "Criação de faixa de gôndola ou stopper", value: 2658.36 },
  { id: "102", number: 102, name: "Sacola", type: "MATERIAL PROMOCIONAL", description: "Criação de sacola", value: 1282.42 },
  { id: "103", number: 103, name: "Convite Padrão", type: "MATERIAL PROMOCIONAL", description: "Criação de convite padrão", value: 1496.20 },
  { id: "104", number: 104, name: "Calendário (p/ página)", type: "MATERIAL PROMOCIONAL", description: "Criação de calendário (por página)", value: 904.30 },
  { id: "105", number: 105, name: "Inflável", type: "MATERIAL PROMOCIONAL", description: "Criação de design para inflável", value: 1321.51 },
  { id: "106", number: 106, name: "Tag de preço", type: "MATERIAL PROMOCIONAL", description: "Criação de tag de preço", value: 814.40 },
  
  // MÍDIA ELETRÔNICA E INTERNET
  { id: "107", number: 107, name: "Banner -Formatos:Gif animado e Animado", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Criação de banner em GIF animado", value: 2037.29 },
  { id: "108", number: 108, name: "Banner Formato Especial - Formatos: Interativo", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Criação de banner em formato especial interativo", value: 3743.11 },
  { id: "109", number: 109, name: "WEB SITE CORPORATIVO", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Criação das interfaces, arquitetura de informação, conteúdo e finalização html, css e javascript. Até 20 Páginas", value: 23095.65 },
  { id: "110", number: 110, name: "WEBSITE CORPORATIVO COM SISTEMAS DE GESTÃO DE CONTEÚDO", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Interfaces, arquitetura de informação e conteúdo criados pela agência, finalizado por terceiros com CMS. Até 20 Páginas", value: 13860.48 },
  { id: "111", number: 111, name: "HOTSITE de evento e promocional", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Criação de hotsite para evento ou promocional. Até 5 Páginas", value: 6930.22 },
  { id: "112", number: 112, name: "Newsletter (mala direta via e-mail)", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Criação de newsletter para envio por e-mail", value: 2781.32 },
  { id: "113", number: 113, name: "Apresentação em Power point", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Criação de apresentação em PowerPoint. Até 30 Páginas", value: 8427.88 },
  { id: "114", number: 114, name: "Apresentação digital com estrutura de navegação", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Criação de apresentação digital com navegação. Até 20 páginas", value: 13860.48 },
  { id: "115", number: 115, name: "Apresentação digital com estrutura de navegação com locução", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Apresentação digital com navegação e locução. Até 30 Páginas", value: 23095.65 },
  { id: "116", number: 116, name: "Apresentação em DVD", type: "MÍDIA ELETRÔNICA E INTERNET", description: "Produção de conteúdo em DVD com montagem de fotos e dados informativos. Até 30 Páginas", value: 23095.65 },
  { id: "117", number: 117, name: "Formato: DVD sem estrutura de navegação", type: "MÍDIA ELETRÔNICA E INTERNET", description: "DVD sem estrutura de navegação (menus)", value: 23095.65 }
];

// Helper function to add a new ABAP table item
export const addAbapTableItem = (item: Omit<AbapTableItem, 'id'>): AbapTableItem => {
  const newId = (sampleAbapTableItems.length + 1).toString();
  const newItem: AbapTableItem = {
    id: newId,
    ...item
  };
  
  sampleAbapTableItems.push(newItem);
  return newItem;
};

// Helper function to update an ABAP table item
export const updateAbapTableItem = (item: AbapTableItem): void => {
  const index = sampleAbapTableItems.findIndex(i => i.id === item.id);
  if (index !== -1) {
    sampleAbapTableItems[index] = {...item};
  }
};

// Helper function to delete an ABAP table item
export const deleteAbapTableItem = (id: string): boolean => {
  const index = sampleAbapTableItems.findIndex(i => i.id === id);
  if (index !== -1) {
    sampleAbapTableItems.splice(index, 1);
    return true;
  }
  return false;
};

// Helper function to get ABAP table items by type
export const getAbapTableItemsByType = (type: string): AbapTableItem[] => {
  return sampleAbapTableItems.filter(item => item.type === type);
};

// Helper function to get unique ABAP table types
export const getUniqueAbapTableTypes = (): string[] => {
  const types = new Set<string>();
  sampleAbapTableItems.forEach(item => {
    types.add(item.type);
  });
  return Array.from(types);
};
