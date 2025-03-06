
// Translation utilities for service types and subtypes

export const translateServiceType = (type: string): string => {
  const translations: Record<string, string> = {
    'criacao': 'Criação',
    'veiculacao': 'Veiculação',
    'producao': 'Produção',
  };

  return translations[type] || type;
};

export const translateServiceSubtype = (subtype: string): string => {
  const translations: Record<string, string> = {
    'agencia': 'Agência de Publicidade',
    'radio': 'Rádio',
    'televisao': 'Televisão',
    'site': 'Website',
    'midia-digital': 'Mídia Digital',
    'outdoor': 'Outdoor',
    'outbus': 'Busdoor/Outbus',
    'placa': 'Placas/Painéis',
    'camisa': 'Camisetas/Uniformes',
    'panfleto': 'Panfletos/Folhetos',
    'cartaz': 'Cartazes/Banners',
    'video': 'Produção de Vídeo',
    'spot-radio': 'Produção de Spot',
    'social-media': 'Mídias Sociais',
    'jornal': 'Jornal',
    'midia-impressa': 'Mídia Impressa',
  };

  return translations[subtype] || subtype;
};

// Helper function to map service types to their allowed subtypes
export const getServiceSubtypeMap = () => {
  return {
    'criacao': ['agencia'],
    'veiculacao': ['radio', 'televisao', 'site', 'midia-digital', 'outdoor', 'outbus', 'placa', 'jornal', 'midia-impressa', 'social-media'],
    'producao': ['camisa', 'panfleto', 'cartaz', 'video', 'spot-radio'],
  };
};
