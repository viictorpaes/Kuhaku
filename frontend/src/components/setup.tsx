import { useState } from 'react';
import type { Modo, Dificuldade, ConfigJogo } from '../types';
import { RANGE_LABEL, DIF_LABEL, MAX_TENTATIVAS_SOLO, MEMORIA_GRID } from '../constants';

interface SetupProps {
  modo: Modo;
  onStart: (config: ConfigJogo) => Promise<void>;
  onBack: () => void;
  onOpenRanking: () => void;
}

const BG = 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.10) 0%, transparent 55%), linear-gradient(180deg, #020818 0%, #0a0f1e 100%)';

function GameHeader({ onBack, onOpenRanking }: { onBack: () => void; onOpenRanking: () => void }) {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-300 px-4 py-2 rounded-full transition"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
      >
        🛸 Base Espacial
      </button>
      <span className="font-black text-sm">
        <span className="text-white">👨‍🚀 Kuha</span><span style={{ color: '#06b6d4' }}>ku</span>
      </span>
      <button
        onClick={onOpenRanking}
        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition"
        style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.30)', color: '#67e8f9' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(6,182,212,0.18)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(6,182,212,0.10)')}
      >
        🏆 Ranking
      </button>
    </header>
  );
}

/** VS — Batalha de Sinais setup */
function VsSetup({ onStart, onBack, onOpenRanking }: SetupProps) {
  const [dificuldade, setDificuldade] = useState<Dificuldade>('MEDIUM');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleStart = async () => {
    setErro('');
    setLoading(true);
    try {
      await onStart({ dificuldade, p1: p1.trim() || 'Astronauta 1', p2: p2.trim() || 'Astronauta 2' });
    } catch {
      setErro('Erro ao criar missão. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const patentes: { dif: Dificuldade; border: string; bg: string; text: string }[] = [
    { dif: 'EASY',   border: '#0891b2', bg: 'rgba(8,145,178,0.15)',   text: '#67e8f9' },
    { dif: 'MEDIUM', border: '#1d4ed8', bg: 'rgba(29,78,216,0.15)',   text: '#93c5fd' },
    { dif: 'HARD',   border: '#7c3aed', bg: 'rgba(124,58,237,0.15)',  text: '#c4b5fd' },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0284c7, #06b6d4)', boxShadow: '0 0 28px rgba(6,182,212,0.4)' }}>
          📡
        </div>

        <h1 className="text-3xl font-black text-white mb-1">Batalha de Sinais</h1>
        <p className="text-slate-400 text-sm mb-8">2 astronautas · 3 rodadas · mesma frequência</p>

        <div className="w-full max-w-md space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-lg"
              style={{ background: 'rgba(6,182,212,0.25)', border: '1px solid rgba(6,182,212,0.5)' }}>
              👨‍🚀
            </div>
            <input
              type="text"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              placeholder="Astronauta 1"
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none transition"
              style={{ background: '#0c1a35', border: '1px solid rgba(6,182,212,0.30)' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.70)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.30)')}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-lg"
              style={{ background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.5)' }}>
              🚀
            </div>
            <input
              type="text"
              value={p2}
              onChange={(e) => setP2(e.target.value)}
              placeholder="Astronauta 2"
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none transition"
              style={{ background: '#0c1a35', border: '1px solid rgba(99,102,241,0.30)' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.70)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.30)')}
            />
          </div>
        </div>

        <div className="w-full max-w-md mb-8">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Patente da Missão</p>
          <div className="grid grid-cols-3 gap-3">
            {patentes.map(({ dif, border, bg, text }) => {
              const selected = dificuldade === dif;
              return (
                <button
                  key={dif}
                  onClick={() => setDificuldade(dif)}
                  className="py-3 rounded-xl border transition-all hover:opacity-90"
                  style={selected
                    ? { borderColor: border, background: bg }
                    : { borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }
                  }
                >
                  <p className="font-bold text-sm" style={{ color: selected ? text : '#94a3b8' }}>{DIF_LABEL[dif]}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{RANGE_LABEL[dif]}</p>
                </button>
              );
            })}
          </div>
        </div>

        {erro && <p className="text-red-400 text-xs mb-4">{erro}</p>}

        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full max-w-md py-4 rounded-2xl font-black text-white text-base disabled:opacity-50 transition hover:opacity-90 active:scale-[0.98] shadow-xl"
          style={{ background: 'linear-gradient(135deg, #0284c7, #06b6d4)', boxShadow: '0 4px 20px rgba(6,182,212,0.35)' }}
        >
          {loading ? 'Iniciando missão...' : '📡 DECOLAR MISSÃO!'}
        </button>
      </div>
    </div>
  );
}

/** Operação Resgate (solo) setup */
function SoloSetup({ onStart, onBack, onOpenRanking }: SetupProps) {
  const [loading, setLoading] = useState<Dificuldade | null>(null);

  const handleStart = async (dif: Dificuldade) => {
    setLoading(dif);
    try {
      await onStart({ dificuldade: dif, p1: 'Astronauta', p2: '' });
    } finally {
      setLoading(null);
    }
  };

  const cards: { dif: Dificuldade; emoji: string; bg: string; shadow: string }[] = [
    { dif: 'EASY',   emoji: '🌍', bg: '#0e4f6e', shadow: 'rgba(6,182,212,0.35)'  },
    { dif: 'MEDIUM', emoji: '🚀', bg: '#1e3a8a', shadow: 'rgba(29,78,216,0.35)'  },
    { dif: 'HARD',   emoji: '👨‍🚀', bg: '#4c1d95', shadow: 'rgba(124,58,237,0.35)' },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0284c7, #0ea5e9)', boxShadow: '0 0 28px rgba(6,182,212,0.35)' }}>
          🔭
        </div>

        <h1 className="text-3xl font-black text-white mb-1">Operação Resgate</h1>
        <p className="text-slate-400 text-sm mb-10">Sintonize a frequência de resgate certa</p>

        <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
          {cards.map(({ dif, emoji, bg, shadow }) => (
            <button
              key={dif}
              onClick={() => handleStart(dif)}
              disabled={loading !== null}
              className="rounded-2xl p-5 flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-70"
              style={{ background: bg, boxShadow: `0 8px 24px ${shadow}` }}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="font-black text-white text-base mt-1">
                {loading === dif ? '...' : DIF_LABEL[dif]}
              </span>
              <span className="text-white/75 text-[11px]">{RANGE_LABEL[dif]}</span>
              <span className="text-white/75 text-[11px]">{MAX_TENTATIVAS_SOLO[dif]} tentativas</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Mapas Estelares (memória) setup */
function MemoriaSetup({ onStart, onBack, onOpenRanking }: SetupProps) {
  const [loading, setLoading] = useState<Dificuldade | null>(null);

  const handleStart = async (dif: Dificuldade) => {
    setLoading(dif);
    try {
      await onStart({ dificuldade: dif, p1: 'Astronauta', p2: '' });
    } finally {
      setLoading(null);
    }
  };

  const cards: { dif: Dificuldade; emoji: string; bg: string; shadow: string }[] = [
    { dif: 'EASY',   emoji: '🌕', bg: '#0e4f6e', shadow: 'rgba(6,182,212,0.35)'  },
    { dif: 'MEDIUM', emoji: '🪐', bg: '#1e3a8a', shadow: 'rgba(29,78,216,0.35)'  },
    { dif: 'HARD',   emoji: '🌌', bg: '#3b0764', shadow: 'rgba(124,58,237,0.35)' },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #1e3a8a, #4f46e5)', boxShadow: '0 0 28px rgba(99,102,241,0.35)' }}>
          🌕
        </div>

        <h1 className="text-3xl font-black text-white mb-1">Mapas Estelares</h1>
        <p className="text-slate-400 text-sm mb-10">Memorize as coordenadas estelares</p>

        <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
          {cards.map(({ dif, emoji, bg, shadow }) => {
            const { label, pairs } = MEMORIA_GRID[dif];
            return (
              <button
                key={dif}
                onClick={() => handleStart(dif)}
                disabled={loading !== null}
                className="rounded-2xl p-5 flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-70"
                style={{ background: bg, boxShadow: `0 8px 24px ${shadow}` }}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="font-black text-white text-2xl">{label}</span>
                <span className="font-bold text-white text-base mt-1">
                  {loading === dif ? '...' : DIF_LABEL[dif]}
                </span>
                <span className="text-white/75 text-[11px]">{pairs} pares</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Setup(props: SetupProps) {
  if (props.modo === 'vs') return <VsSetup {...props} />;
  if (props.modo === 'memoria') return <MemoriaSetup {...props} />;
  return <SoloSetup {...props} />;
}
