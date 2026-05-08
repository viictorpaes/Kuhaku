import type { Dificuldade } from './types';

export const TOTAL_ROUNDS_VS = 3;
export const MAX_TENTATIVAS_VS = 12;

export const MAX_TENTATIVAS_SOLO: Record<Dificuldade, number> = 
{
  EASY: 5,
  MEDIUM: 8,
  HARD: 10,
};

export const RANGE_LABEL: Record<Dificuldade, string> = 
{
  EASY: '1 a 10',
  MEDIUM: '1 a 50',
  HARD: '1 a 100',
};

export const DIF_LABEL: Record<Dificuldade, string> = 
{
  EASY: 'Fácil',
  MEDIUM: 'Médio',
  HARD: 'Difícil',
};

export const RANGE_MAX: Record<Dificuldade, number> = 
{
  EASY: 10,
  MEDIUM: 50,
  HARD: 100,
};

export const DIF_COLOR: Record<Dificuldade, { bg: string; hover: string; btn: string }> = 
{
  EASY:   { bg: 'bg-green-600',  hover: 'hover:bg-green-500',  btn: 'bg-green-500 hover:bg-green-400' },
  MEDIUM: { bg: 'bg-amber-500',  hover: 'hover:bg-amber-400',  btn: 'bg-amber-500 hover:bg-amber-400' },
  HARD:   { bg: 'bg-red-600',    hover: 'hover:bg-red-500',    btn: 'bg-red-600   hover:bg-red-500'   },
};
