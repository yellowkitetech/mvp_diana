
import { Espelho, ApprovalStatus } from '../../types';

// Updated realistic espelhos data
export const mockEspelhos: Espelho[] = [
  {
    id: "esp-1",
    numero: "ESP-2023-001",
    campanha: "Campanha Nacional de Vacinação",
    campanhaId: "camp-1",
    agencia: "Grupo Comunicação Brasil",
    seiProcesso: "23000.012345/2023-12",
    numeroEmpenho: "2023NE000789",
    valorLiquido: 120000,
    valorBruto: 138000,
    status: "approved",
    observacao: "Espelho aprovado para veiculação em rádio.",
    dataAtualizacao: "2023-06-28",
    items: [
      {
        id: "item-1",
        fornecedorId: "forn-3",
        fornecedorNome: "Rede Brasileira de Rádio",
        tipoServico: "veiculacao",
        subtipoServico: "radio",
        descricao: "Spot 30s - Campanha Nacional de Vacinação",
        quantidade: 240,
        valorUnitario: 500,
        valorLiquido: 120000,
        valorBruto: 138000,
        tipo: "radio"
      }
    ],
    anexos: ["campanha_vacinacao_plano.pdf", "cronograma_veiculacao.pdf"]
  },
  {
    id: "esp-2",
    numero: "ESP-2023-002",
    campanha: "Programa Saúde da Família",
    campanhaId: "camp-2",
    agencia: "Grupo Mídia Nacional",
    seiProcesso: "23000.023456/2023-34",
    numeroEmpenho: "2023NE000845",
    valorLiquido: 85000,
    valorBruto: 97750,
    status: "pending",
    observacao: "Aguardando aprovação da diretoria de comunicação.",
    dataAtualizacao: "2023-07-25",
    items: [
      {
        id: "item-2",
        fornecedorId: "forn-4",
        fornecedorNome: "TV Brasil Central",
        tipoServico: "veiculacao",
        subtipoServico: "televisao",
        descricao: "VT 30s - Programa Saúde da Família",
        quantidade: 50,
        valorUnitario: 1700,
        valorLiquido: 85000,
        valorBruto: 97750,
        tipo: "televisao"
      }
    ],
    anexos: ["programa_saude_midia.pdf"]
  },
  {
    id: "esp-3",
    numero: "ESP-2023-003",
    campanha: "Projeto Educação para Todos",
    campanhaId: "camp-3",
    agencia: "Grupo Gráfico Nacional",
    seiProcesso: "23000.034567/2023-56",
    numeroEmpenho: "",
    valorLiquido: 75000,
    valorBruto: 86250,
    status: "rejected",
    observacao: "Valores acima do limite orçamentário previsto para materiais impressos.",
    dataAtualizacao: "2023-08-18",
    items: [
      {
        id: "item-3",
        fornecedorId: "forn-2",
        fornecedorNome: "Gráfica Impressão Rápida",
        tipoServico: "producao",
        subtipoServico: "panfleto",
        descricao: "Folhetos A5 4x4 - Projeto Educação para Todos",
        quantidade: 100000,
        valorUnitario: 0.75,
        valorLiquido: 75000,
        valorBruto: 86250,
        tipo: "panfleto"
      }
    ],
    anexos: []
  },
  {
    id: "esp-4",
    numero: "ESP-2023-004",
    campanha: "Incentivo à Agricultura Familiar",
    campanhaId: "camp-4",
    agencia: "Grupo Comunicação Brasil",
    seiProcesso: "23000.045678/2023-78",
    numeroEmpenho: "",
    valorLiquido: 145000,
    valorBruto: 166750,
    status: "draft",
    observacao: "Rascunho - aguardando finalização da proposta criativa.",
    dataAtualizacao: "2023-09-15",
    items: [
      {
        id: "item-4",
        fornecedorId: "forn-1",
        fornecedorNome: "Agência Nacional de Comunicação",
        tipoServico: "criacao",
        subtipoServico: "agencia",
        descricao: "Criação de campanha integrada para Agricultura Familiar",
        quantidade: 1,
        valorUnitario: 145000,
        valorLiquido: 145000,
        valorBruto: 166750,
        tipo: "agencia"
      }
    ],
    anexos: ["briefing_agricultura.pdf", "proposta_preliminar.pdf", "cronograma_estimado.pdf"]
  }
];
