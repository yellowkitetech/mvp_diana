
export type ServiceType = 'criacao' | 'veiculacao' | 'producao';

export type ServiceSubtype = 
  | 'agencia' 
  | 'radio' 
  | 'televisao' 
  | 'site' 
  | 'midia-digital' 
  | 'outdoor' 
  | 'outbus' 
  | 'placa'
  | 'camisa'
  | 'panfleto'
  | 'video'
  | 'spot-radio'
  | 'social-media'  
  | 'jornal'  
  | 'midia-impressa'
  | 'cartaz';  // Added the missing 'cartaz' subtype

export interface Supplier {
  id: string;
  name: string;
  companyName: string; // Razão Social
  group: string;
  cnpj: string;
  serviceTypes: ServiceType[]; // Tipos de serviço (múltipla escolha)
  serviceSubtypes: ServiceSubtype[]; // Subtipos de serviço (múltipla escolha)
  email: string;
  whatsapp: string;
  active: boolean;
}
