export type Tela = 'home' | 'setup' | 'game' | 'result' | 'ranking';
export type Modo = 'solo' | 'vs' | 'memoria' | 'logica';
export type Dificuldade = 'EASY' | 'MEDIUM' | 'HARD';
export type Direcao = 'higher' | 'lower' | 'correct';

export interface Palpite {
  valor: number;
  feedback: string;
  direcao: Direcao;
  jogador: 1 | 2;
}

export interface ConfigJogo {
  dificuldade: Dificuldade;
  p1: string;
  p2: string;
}
