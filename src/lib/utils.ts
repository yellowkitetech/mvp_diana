
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { sampleCommitmentNumberConfigs } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para formatar valores monetários
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Função para formatar datas
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

// Função para formatar o número do SEI
export function formatSEINumber(seiNumber: string): string {
  if (!seiNumber) return '';
  
  // Se já estiver formatado, retorna como está
  if (seiNumber.includes('.') && seiNumber.includes('/') && seiNumber.includes('-')) {
    return seiNumber;
  }
  
  // Tenta formatar (assumindo o formato 00000000000000000)
  try {
    if (seiNumber.length === 17) {
      return `${seiNumber.substring(0, 5)}.${seiNumber.substring(5, 11)}/${seiNumber.substring(11, 15)}-${seiNumber.substring(15)}`;
    }
  } catch (e) {
    // Em caso de erro, retorna o valor original
  }
  
  return seiNumber;
}

// Função para validar o número do SEI
export function isValidSEINumber(seiNumber: string): boolean {
  if (!seiNumber) return false;
  
  const seiPattern = /^\d{5}\.\d{6}\/\d{4}-\d{2}$/;
  return seiPattern.test(seiNumber);
}

// Função para formatar o número de empenho baseado nas configurações
export function formatCommitmentNumber(number: string): string {
  if (!number) return '';
  
  // Se já estiver formatado (contém prefixo configurado), retorna como está
  const activeConfig = sampleCommitmentNumberConfigs.find(config => config.active);
  if (activeConfig && number.includes(activeConfig.prefix)) {
    return number;
  }
  
  // Tenta formatar (assumindo apenas números)
  try {
    if (number.length >= 1) {
      const activeConfig = sampleCommitmentNumberConfigs.find(config => config.active);
      if (activeConfig) {
        return `${activeConfig.year}${activeConfig.prefix}${number.padStart(6, '0')}`;
      } else {
        // Fallback para o comportamento original se não houver configuração ativa
        const year = new Date().getFullYear().toString();
        return `${year}NE${number.padStart(6, '0')}`;
      }
    }
  } catch (e) {
    // Em caso de erro, retorna o valor original
  }
  
  return number;
}
