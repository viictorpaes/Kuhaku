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

export const LOGICA_CONFIG: Record<Dificuldade, { count: number; label: string; description: string }> =
{
  EASY:   { count: 8,  label: '🌍 Cadete',     description: 'P, Q · ∧ ∨ ¬ · 8 transmissões'            },
  MEDIUM: { count: 10, label: '🚀 Piloto',      description: 'P, Q, R · ∧ ∨ ¬ → · 10 transmissões'    },
  HARD:   { count: 12, label: '👨‍🚀 Comandante',  description: 'P, Q, R · ∧ ∨ ¬ → ↔ · 12 transmissões'  },
};

export const PARENTESES_CONFIG: Record<Dificuldade, { count: number; label: string; description: string }> =
{
  EASY:   { count: 8,  label: '🌍 Cadete',     description: '∧ ∨ · 8 expressões'           },
  MEDIUM: { count: 10, label: '🚀 Piloto',      description: '∧ ∨ → · 10 expressões'        },
  HARD:   { count: 12, label: '👨‍🚀 Comandante',  description: '∧ ∨ → ↔ · 12 expressões'     },
};


export const TIMER_VS_TURNO = 15;

export const TIMER_LOGICA: Record<Dificuldade, number> =
{
  EASY:   30,
  MEDIUM: 20,
  HARD:   15,
};

export const TIMER_PRECEDENCIA: Record<Dificuldade, number> =
{
  EASY:   45,
  MEDIUM: 35,
  HARD:   25,
};

export const MEMORIA_TIMER_INICIAL = 60;
export const MEMORIA_BONUS_PAR = 25;
