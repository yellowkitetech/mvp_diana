
import { ServiceType, ServiceSubtype } from '@/lib/types';

export const formatCNPJ = (value: string) => {
  // Remove caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Formato XX.XXX.XXX/XXXX-XX
  return numbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

export const formatWhatsApp = (value: string) => {
  // Remove caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara (XX) XXXXX-XXXX
  return numbers.replace(
    /^(\d{2})(\d{5})(\d{4})$/,
    '($1) $2-$3'
  );
};

export const serviceTypes: Array<{id: ServiceType, label: string}> = [
  { id: 'criacao', label: 'Criação' },
  { id: 'veiculacao', label: 'Veiculação' },
  { id: 'producao', label: 'Produção' }
];

export const serviceSubtypes: Record<ServiceType, Array<{id: ServiceSubtype, label: string}>> = {
  'criacao': [
    { id: 'agencia', label: 'Agência' }
  ],
  'veiculacao': [
    { id: 'radio', label: 'Rádio' },
    { id: 'televisao', label: 'Televisão' },
    { id: 'site', label: 'Site' },
    { id: 'midia-digital', label: 'Mídia Digital' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'outbus', label: 'Outbus' },
    { id: 'placa', label: 'Placa' },
    { id: 'jornal', label: 'Jornal' },
    { id: 'midia-impressa', label: 'Mídia Impressa' },
    { id: 'social-media', label: 'Mídias Sociais' }
  ],
  'producao': [
    { id: 'camisa', label: 'Camisa' },
    { id: 'panfleto', label: 'Panfleto' },
    { id: 'video', label: 'Vídeo' },
    { id: 'spot-radio', label: 'Spot de Rádio' },
    { id: 'cartaz', label: 'Cartaz/Banner' }
  ]
};
