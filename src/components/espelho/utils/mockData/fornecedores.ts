
import { Fornecedor } from '../../types';

// Updated realistic suppliers data with more detailed service information
export const mockFornecedores: Fornecedor[] = [
  { 
    id: 'forn-1', 
    name: 'Agência Nacional de Comunicação',
    serviceTypes: ['criacao', 'veiculacao'],
    serviceSubtypes: ['agencia', 'midia-digital', 'site'],
    group: 'Grupo Comunicação Brasil'
  },
  { 
    id: 'forn-2', 
    name: 'Gráfica Impressão Rápida',
    serviceTypes: ['producao'],
    serviceSubtypes: ['panfleto', 'cartaz'],
    group: 'Grupo Gráfico Nacional'
  },
  { 
    id: 'forn-3', 
    name: 'Rede Brasileira de Rádio',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['radio', 'spot-radio'],
    group: 'Grupo Mídia Nacional'
  },
  { 
    id: 'forn-4', 
    name: 'TV Brasil Central',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['televisao', 'video'],
    group: 'Grupo Mídia Nacional'
  },
  { 
    id: 'forn-5', 
    name: 'Marketing Digital Express',
    serviceTypes: ['veiculacao', 'criacao'],
    serviceSubtypes: ['midia-digital', 'site', 'agencia'],
    group: 'Grupo Marketing Digital'
  },
  { 
    id: 'forn-6', 
    name: 'Outdoor & Mídia Exterior',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['outdoor', 'outbus', 'placa'],
    group: 'Grupo Outdoor Brasil'
  },
  { 
    id: 'forn-7', 
    name: 'Produtora Audiovisual Premium',
    serviceTypes: ['producao'],
    serviceSubtypes: ['video', 'spot-radio'],
    group: 'Grupo Produção Audiovisual'
  },
  { 
    id: 'forn-8', 
    name: 'Agência de Design Visual',
    serviceTypes: ['criacao'],
    serviceSubtypes: ['agencia'],
    group: 'Grupo Design Criativo'
  },
  { 
    id: 'forn-9', 
    name: 'Produtora Multimídia Nacional',
    serviceTypes: ['producao', 'criacao'],
    serviceSubtypes: ['video', 'panfleto', 'cartaz', 'agencia'],
    group: 'Grupo Produção Nacional'
  },
  { 
    id: 'forn-10', 
    name: 'Jornal Informativo Regional',
    serviceTypes: ['veiculacao'],
    serviceSubtypes: ['jornal', 'midia-impressa'],
    group: 'Grupo Editorial Brasil'
  },
  { 
    id: 'forn-11', 
    name: 'Digital Marketing Solutions',
    serviceTypes: ['veiculacao', 'criacao'],
    serviceSubtypes: ['midia-digital', 'social-media', 'agencia'],
    group: 'Grupo Internacional de Marketing'
  },
  { 
    id: 'forn-12', 
    name: 'Estúdio Criação Publicitária',
    serviceTypes: ['criacao'],
    serviceSubtypes: ['agencia'],
    group: 'Grupo Criativo Nacional'
  }
];
