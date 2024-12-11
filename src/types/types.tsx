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
  endereco: string;
  treinador: string;
  numero_jogadores: number;
  vitorias: number;
  derrotas: number;
  descricao: string;
  arena?: ArenaType | null;
  logo?: File | null;
};

export type JogadorType = {
  id: number;
  nome: string;
  idade: number;
  posicao: string;
  status: string;
  altura: string;
  peso: string;
  pontos: number;
  rebotes: number;
  assistencias: number;
  turnovers: number;
  roubos_bola: number;
  num_jogos: number;
  time?: TimesType | null;
  foto?: File | null;
};

export type ArenaType = {
  id: number;
  nome: string;
  local: string;
  capacidade: number;
  time?: { id: number; nome: string } | null;
};

export type PartidaType = {
  id: number;
  data: string;
  arena: ArenaType;
  time?: TimesType| null;
  time_adversario: string;
  placar_time: number;
  placar_time_adversario: number;
  status: string;
  status_local: string;
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
