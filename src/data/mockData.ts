// ============================================================
// DADOS SIMULADOS - CCM/SEDUC
// Substitua esses dados pelos dados reais quando disponíveis
// ============================================================

export type StatusProcesso = 'pendente' | 'em_andamento' | 'concluido' | 'atrasado' | 'suspenso';

export interface Processo {
  id: string;
  cadeira: string;
  servidor: string;
  dataEntrada: string;
  prazo: string;
  status: StatusProcesso;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
}

export interface DadosCadeira {
  nome: string;
  sigla: string;
  cor: string;
  total: number;
  pendentes: number;
  emAndamento: number;
  concluidos: number;
  atrasados: number;
  suspensos: number;
  meta: number;
  responsavel: string;
}

export interface IndicadorAlerta {
  id: string;
  tipo: 'critico' | 'atencao' | 'info';
  titulo: string;
  descricao: string;
  cadeira: string;
  valor: number;
  meta: number;
}

// ─── CADEIRAS ───────────────────────────────────────────────
export const cadeiras: DadosCadeira[] = [
  {
    nome: 'POLO',
    sigla: 'PLO',
    cor: '#6366f1',
    total: 47,
    pendentes: 12,
    emAndamento: 18,
    concluidos: 14,
    atrasados: 3,
    suspensos: 0,
    meta: 50,
    responsavel: 'A definir',
  },
  {
    nome: 'PECÚNIA',
    sigla: 'PEC',
    cor: '#8b5cf6',
    total: 63,
    pendentes: 21,
    emAndamento: 25,
    concluidos: 12,
    atrasados: 5,
    suspensos: 0,
    meta: 70,
    responsavel: 'A definir',
  },
  {
    nome: 'TRIÊNIO',
    sigla: 'TRI',
    cor: '#a855f7',
    total: 38,
    pendentes: 10,
    emAndamento: 15,
    concluidos: 11,
    atrasados: 2,
    suspensos: 0,
    meta: 40,
    responsavel: 'A definir',
  },
  {
    nome: 'CERTIDÃO',
    sigla: 'CRT',
    cor: '#ec4899',
    total: 29,
    pendentes: 8,
    emAndamento: 14,
    concluidos: 6,
    atrasados: 1,
    suspensos: 0,
    meta: 35,
    responsavel: 'A definir',
  },
  {
    nome: 'FÉRIAS',
    sigla: 'FER',
    cor: '#f59e0b',
    total: 55,
    pendentes: 17,
    emAndamento: 22,
    concluidos: 13,
    atrasados: 3,
    suspensos: 0,
    meta: 60,
    responsavel: 'A definir',
  },
  {
    nome: 'DESIGNAÇÃO',
    sigla: 'DES',
    cor: '#10b981',
    total: 41,
    pendentes: 14,
    emAndamento: 16,
    concluidos: 9,
    atrasados: 2,
    suspensos: 0,
    meta: 45,
    responsavel: 'A definir',
  },
  {
    nome: 'DIÁRIO/PUBLICAÇÃO',
    sigla: 'DPB',
    cor: '#06b6d4',
    total: 72,
    pendentes: 25,
    emAndamento: 28,
    concluidos: 16,
    atrasados: 3,
    suspensos: 0,
    meta: 80,
    responsavel: 'A definir',
  },
  {
    nome: 'DECLARAÇÃO/ATESTADO',
    sigla: 'DAT',
    cor: '#3b82f6',
    total: 33,
    pendentes: 11,
    emAndamento: 13,
    concluidos: 8,
    atrasados: 1,
    suspensos: 0,
    meta: 40,
    responsavel: 'A definir',
  },
  {
    nome: 'PROTOCOLO',
    sigla: 'PRT',
    cor: '#f97316',
    total: 88,
    pendentes: 30,
    emAndamento: 35,
    concluidos: 20,
    atrasados: 3,
    suspensos: 0,
    meta: 100,
    responsavel: 'A definir',
  },
];

// ─── TOTAIS GERAIS ───────────────────────────────────────────
export const totaisGerais = {
  totalProcessos: cadeiras.reduce((acc, c) => acc + c.total, 0),
  totalPendentes: cadeiras.reduce((acc, c) => acc + c.pendentes, 0),
  totalEmAndamento: cadeiras.reduce((acc, c) => acc + c.emAndamento, 0),
  totalConcluidos: cadeiras.reduce((acc, c) => acc + c.concluidos, 0),
  totalAtrasados: cadeiras.reduce((acc, c) => acc + c.atrasados, 0),
  totalSuspensos: cadeiras.reduce((acc, c) => acc + c.suspensos, 0),
};

// ─── INDICADORES DE ALERTA ──────────────────────────────────
export const indicadoresAlerta: IndicadorAlerta[] = [
  {
    id: 'alerta-1',
    tipo: 'critico',
    titulo: 'PROTOCOLO acima da capacidade',
    descricao: 'Volume de processos excede a meta estabelecida',
    cadeira: 'PROTOCOLO',
    valor: 88,
    meta: 80,
  },
  {
    id: 'alerta-2',
    tipo: 'critico',
    titulo: 'DIÁRIO/PUBLICAÇÃO — alta demanda',
    descricao: 'Muitos processos pendentes aguardando distribuição',
    cadeira: 'DIÁRIO/PUBLICAÇÃO',
    valor: 72,
    meta: 65,
  },
  {
    id: 'alerta-3',
    tipo: 'atencao',
    titulo: 'PECÚNIA — prazo a vencer',
    descricao: '5 processos com prazo vencendo nos próximos 3 dias',
    cadeira: 'PECÚNIA',
    valor: 5,
    meta: 0,
  },
  {
    id: 'alerta-4',
    tipo: 'atencao',
    titulo: 'FÉRIAS — processos atrasados',
    descricao: '3 processos fora do prazo esperado',
    cadeira: 'FÉRIAS',
    valor: 3,
    meta: 0,
  },
  {
    id: 'alerta-5',
    tipo: 'info',
    titulo: 'TRIÊNIO — meta quase atingida',
    descricao: 'Cadeira próxima de atingir a meta do período',
    cadeira: 'TRIÊNIO',
    valor: 38,
    meta: 40,
  },
];

// ─── HISTÓRICO SEMANAL (para gráfico de linha) ──────────────
export const historicoSemanal = [
  { semana: 'Sem 1', entradas: 62, saidas: 48, atrasados: 8 },
  { semana: 'Sem 2', entradas: 75, saidas: 60, atrasados: 11 },
  { semana: 'Sem 3', entradas: 58, saidas: 55, atrasados: 7 },
  { semana: 'Sem 4', entradas: 81, saidas: 70, atrasados: 6 },
  { semana: 'Sem 5', entradas: 93, saidas: 85, atrasados: 9 },
  { semana: 'Sem 6', entradas: 88, saidas: 78, atrasados: 12 },
];

// ─── EFICIÊNCIA POR CADEIRA (%) ──────────────────────────────
export const eficienciaCadeiras = cadeiras.map((c) => ({
  nome: c.nome.length > 12 ? c.sigla : c.nome,
  nomeCompleto: c.nome,
  eficiencia: Math.round((c.concluidos / c.total) * 100),
  cor: c.cor,
}));
