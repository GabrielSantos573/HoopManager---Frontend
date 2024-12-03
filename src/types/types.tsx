export type AxiosData = {
  prioridade?: string;
  categoria?: string;
  mes?: string;
  uf?: string;
  estado?: string;
  aplicado?: string;
  codigo?: string;
  nome?: string;
};

export type TimesType = {
  id: number;
  nome: string;
  regiao: string;
  treinador: string;
  numero_jogadores: number;
  vitorias: number;
  derrotas: number;
  campeonatos_vencidos: number;
  descricao: string;
  logo?: string | null;
};

export type JogadorType = {
  nome: string;
  posicao: string;
  status: string;
  altura: string;
  pontos: number;
  rebotes: number;
  assistencias: number;
  turnovers: number;
  roubos_bola: number;
  num_jogos: number;
  time?: TimesType | null;
};

export type ArenaType = {
  nome: string;
  local: string;
  capacidade: number;
  time_casa?: TimesType | null;
};

export type PartidaType = {
  data: string;
  arena: ArenaType;
  time_visitante: TimesType;
  placar_time_casa: number;
  placar_time_visitante: number;
};

export type EstatisticaPartidaType = {
  pontos: number;
  rebotes: number;
  assistencias: number;
  turnovers: number;
  roubos_bola: number;
  jogador: JogadorType;
  partida: PartidaType;
};
