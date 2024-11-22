
export type FilaType = {
  nome: string,
  entrada: string,
  saida: string
}

export type DescontoType = {
  id: number,
  ticket: number,
  estacao: string,
  inicio: string,
  fim: string,
  total: string,
  auditor: string,
  categoria: string,
  aplicado: boolean,
  observacao: string
}

export type TicketType = {
  ticket: number,
  estacao: string,
  descricao: string,
  prioridade: string,
  sla: string,
  inicio: string,
  fim: string,
  atendimento: string,
  atendimento_back: string,
  mes: string,
  categoria: string,
  status: string,
  filas: FilaType[],
  descontos: DescontoType[],
}

export type AxiosData = {
  prioridade?: string,
  categoria?: string,
  mes?: string,
  uf?: string,
  estado?: string,
  aplicado?: string,
  codigo?: string,
  nome?: string,
}

export type EstadoType = {
  nome: string,
  estados?: string
}
export type LocalidadeType = {
  localidade: string,
  uf: string,
  cnl: string,
  ibge: string,
}

export type EstacaoType = {
  codigo: string,
  localidade: string,
  estado: string,
  descricao: string,
  tipo: string,
  status: string,
  latitude: string,
  longitude: string,
  cedente: string,
  cm: string,
  os_padtec: string,
  lider: string,
  coordenador: string
}

export type LiderType = {
  nome: string,
  estados: EstadoType[],
  email: string,
  telefone: string,
}

export type CoordenadorType = {
  nome: string,
  estados: EstadoType[],
  email: string,
  telefone: string,
}
export type TecnicoType = {
  nome: string,
  cpf: string,
  rg: string,
  cm: string,
  email: string,
  telefone: string,
  lider: string,
}

export type PlanoMensalType = {
  mes: string,
  plan_valor: number,
  real_valor: number,
}

export type PlanoRealizadoType = {
  codigo_diretoria: string,
  codigo_gerencia: string,
  acao: string,
  conta_acao: string,
  objeto: string,
  objetivo: string,
  tipo: string,
  total_plan: number,
  total_real: number,
  percentual_realizado: number,
  meses: PlanoMensalType[],
}