// src/types.ts
export type ModoJogo = 'vs' | 'guess' | 'memory';
export type Dificuldade = 'facil' | 'medio' | 'dificil';

export interface EstadoJogo 
{
  telaAtual: 'home' | 'setup' | 'game';
  modo: ModoJogo | null;
  dificuldade: Dificuldade | null;
  nomeJogador1: string;
  nomeJogador2: string;
  jogadorAtual: number;
  tentativasRestantes: number;
  numeroSecreto: number | null;
}