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
  EASY:   'Canal 1-10',
  MEDIUM: 'Canal 1-50',
  HARD:   'Canal 1-100',
};

export const DIF_LABEL: Record<Dificuldade, string> =
{
  EASY:   '🌍 Cadete',
  MEDIUM: '🚀 Piloto',
  HARD:   '👨‍🚀 Comandante',
};

export const RANGE_MAX: Record<Dificuldade, number> = 
{
  EASY: 10,
  MEDIUM: 50,
  HARD: 100,
};

export const DIF_COLOR: Record<Dificuldade, { bg: string; hover: string; btn: string }> =
{
  EASY:   { bg: 'bg-cyan-700',    hover: 'hover:bg-cyan-600',    btn: 'bg-cyan-700 hover:bg-cyan-600'       },
  MEDIUM: { bg: 'bg-blue-700',    hover: 'hover:bg-blue-600',    btn: 'bg-blue-700 hover:bg-blue-600'       },
  HARD:   { bg: 'bg-violet-700',  hover: 'hover:bg-violet-600',  btn: 'bg-violet-700 hover:bg-violet-600'   },
};

export const MEMORIA_GRID: Record<Dificuldade, { cols: number; rows: number; label: string; pairs: number }> = 
{
  EASY:   { cols: 4, rows: 4, label: '4×4', pairs: 8  },
  MEDIUM: { cols: 4, rows: 5, label: '4×5', pairs: 10 },
  HARD:   { cols: 6, rows: 6, label: '6×6', pairs: 18 },
};
