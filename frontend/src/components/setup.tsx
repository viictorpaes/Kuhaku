import { useState } from 'react';
import type { Modo, Dificuldade, ConfigJogo } from '../types';
import {
  RANGE_LABEL, DIF_LABEL, MAX_TENTATIVAS_SOLO, MEMORIA_GRID, LOGICA_CONFIG,
  PARENTESES_CONFIG, TIMER_LOGICA, TIMER_PRECEDENCIA, MEMORIA_TIMER_INICIAL, MEMORIA_BONUS_PAR,
  TIMER_VS_TURNO, TIMER_SOLO,
} from '../constants';

interface SetupProps 
{
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

const RANGE_PRESETS = 
[
  { label: '1-100',    value: 100   },
  { label: '1-500',    value: 500   },
  { label: '1-1.000',  value: 1000  },
  { label: '1-5.000',  value: 5000  },
  { label: '1-10.000', value: 10000 },
  { label: '1-100k',   value: 100000},
];

const TIMER_PRESETS = 
[
  { label: 'Sem limite', value: null },
  { label: '60s',        value: 60  },
  { label: '30s',        value: 30  },
  { label: '20s',        value: 20  },
  { label: '10s',        value: 10  },
  { label: '5s',         value: 5   },
];

function calcTentativasCustom(range: number): number {
  return Math.max(3, Math.ceil(Math.log2(range) * 1.5));
}

function VsSetup({ onStart, onBack, onOpenRanking }: SetupProps) {
  const [dificuldade, setDificuldade] = useState<Dificuldade>('MEDIUM');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleStart = async () => 
  {
    setErro('');
    setLoading(true);
    try 
    {
      await onStart({ dificuldade, p1: p1.trim() || 'Astronauta 1', p2: p2.trim() || 'Astronauta 2', timerSegundos: TIMER_VS_TURNO });
    } 
    catch 
    {
      setErro('Erro ao criar missão. Verifique se o servidor está rodando.');
    } 
    finally 
    {
      setLoading(false);
    }
  };

  const patentes: { dif: Dificuldade; border: string; bg: string; text: string }[] = 
  [
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
        <p className="text-slate-400 text-sm mb-3">2 astronautas · 3 rodadas · mesma frequência</p>

        {/* Timer info */}
        <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
          style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.25)' }}>
          <span className="text-cyan-400 font-black text-sm">⏱ {TIMER_VS_TURNO}s por turno</span>
          <span className="text-slate-500 text-xs">· Tempo esgotado = turno perdido</span>
        </div>

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


function SoloSetup({ onStart, onBack, onOpenRanking }: SetupProps) 
{
  const [loading, setLoading] = useState<Dificuldade | 'custom' | null>(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customRange, setCustomRange] = useState(1000);
  const [customTimer, setCustomTimer] = useState<number | null>(30);

  const handleStart = async (dif: Dificuldade) =>
  {
    setLoading(dif);
    try {
      await onStart({ dificuldade: dif, p1: 'Astronauta', p2: '', timerSegundos: TIMER_SOLO[dif] });
    }
    finally
    {
      setLoading(null);
    }
  };

  const handleCustomStart = async () => 
  {
    setLoading('custom');
    try 
    {
      await onStart({
        dificuldade: 'HARD',
        p1: 'Astronauta',
        p2: '',
        rangeMax: customRange,
        timerSegundos: customTimer,
      });
    } 
    finally 
    {
      setLoading(null);
    }
  };

  const cards: { dif: Dificuldade; emoji: string; bg: string; shadow: string }[] = 
  [
    { dif: 'EASY',   emoji: '🌍', bg: '#0e4f6e', shadow: 'rgba(6,182,212,0.35)'  },
    { dif: 'MEDIUM', emoji: '🚀', bg: '#1e3a8a', shadow: 'rgba(29,78,216,0.35)'  },
    { dif: 'HARD',   emoji: '👨‍🚀', bg: '#4c1d95', shadow: 'rgba(124,58,237,0.35)' },
  ];

  const tentativasCustom = calcTentativasCustom(customRange);

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0284c7, #0ea5e9)', boxShadow: '0 0 28px rgba(6,182,212,0.35)' }}>
          🔭
        </div>

        <h1 className="text-3xl font-black text-white mb-1">Operação Resgate</h1>
        <p className="text-slate-400 text-sm mb-3">Sintonize a frequência de resgate certa</p>

        {/* Timer info */}
        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {(['EASY', 'MEDIUM', 'HARD'] as Dificuldade[]).map((dif) => (
            <span key={dif} className="text-[11px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.25)', color: '#67e8f9' }}>
              ⏱ {DIF_LABEL[dif].split(' ').slice(1).join(' ')}: {TIMER_SOLO[dif]}s/tentativa
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-4">
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
              <span className="text-white/75 text-[11px]">{MAX_TENTATIVAS_SOLO[dif]} tent.</span>
              <span className="text-cyan-300/70 text-[10px]">⏱ {TIMER_SOLO[dif]}s</span>
            </button>
          ))}
        </div>

        {/* Custom mode toggle */}
        <button
          onClick={() => setShowCustom((v) => !v)}
          disabled={loading !== null}
          className="w-full max-w-lg rounded-2xl p-4 flex items-center justify-between transition-all hover:opacity-90 disabled:opacity-50"
          style={{
            background: showCustom ? 'rgba(251,146,60,0.15)' : 'rgba(255,255,255,0.04)',
            border: showCustom ? '1.5px solid rgba(251,146,60,0.50)' : '1.5px solid rgba(255,255,255,0.10)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div className="text-left">
              <p className="font-black text-sm" style={{ color: showCustom ? '#fb923c' : '#94a3b8' }}>
                Missão Livre
              </p>
              <p className="text-[11px] text-slate-500">Range e timer personalizáveis</p>
            </div>
          </div>
          <span className="text-slate-400 text-sm">{showCustom ? '▲' : '▼'}</span>
        </button>

        {/* Custom config panel */}
        {showCustom && (
          <div className="w-full max-w-lg mt-3 rounded-2xl p-5 space-y-5"
            style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.25)' }}>

            {/* Range */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
                Frequência máxima (range)
              </p>
              <div className="grid grid-cols-3 gap-2">
                {RANGE_PRESETS.map(({ label, value }) => 
                (
                  <button
                    key={value}
                    onClick={() => setCustomRange(value)}
                    className="py-2 rounded-xl text-xs font-bold transition-all"
                    style={customRange === value
                      ? { background: 'rgba(251,146,60,0.30)', border: '1.5px solid rgba(251,146,60,0.70)', color: '#fb923c' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: '#64748b' }
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
                Timer por tentativa
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TIMER_PRESETS.map(({ label, value }) => (
                  <button
                    key={label}
                    onClick={() => setCustomTimer(value)}
                    className="py-2 rounded-xl text-xs font-bold transition-all"
                    style={customTimer === value
                      ? { background: 'rgba(251,146,60,0.30)', border: '1.5px solid rgba(251,146,60,0.70)', color: '#fb923c' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: '#64748b' }
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="flex gap-3 text-center">
              <div className="flex-1 rounded-xl py-2 px-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] text-slate-500">Range</p>
                <p className="text-sm font-black text-orange-400">1–{customRange.toLocaleString('pt-BR')}</p>
              </div>
              <div className="flex-1 rounded-xl py-2 px-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] text-slate-500">Timer</p>
                <p className="text-sm font-black text-orange-400">{customTimer ? `${customTimer}s` : '∞'}</p>
              </div>
              <div className="flex-1 rounded-xl py-2 px-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] text-slate-500">Tentativas</p>
                <p className="text-sm font-black text-orange-400">{tentativasCustom}</p>
              </div>
            </div>

            <button
              onClick={handleCustomStart}
              disabled={loading !== null}
              className="w-full py-3.5 rounded-xl font-black text-white text-sm disabled:opacity-50 transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #c2410c, #fb923c)', boxShadow: '0 4px 16px rgba(251,146,60,0.35)' }}
            >
              {loading === 'custom' ? 'Iniciando...' : '🎯 DECOLAR MISSÃO LIVRE!'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


function MemoriaSetup({ onStart, onBack, onOpenRanking }: SetupProps) 
{
  const [loading, setLoading] = useState<Dificuldade | null>(null);

  const handleStart = async (dif: Dificuldade) => 
  {
    setLoading(dif);
    try 
    {
      await onStart({ dificuldade: dif, p1: 'Astronauta', p2: '' });
    } 
    finally 
    {
      setLoading(null);
    }
  };

  const cards: { dif: Dificuldade; emoji: string; bg: string; shadow: string }[] = 
  [
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
        <p className="text-slate-400 text-sm mb-3">Memorize as coordenadas estelares</p>

        {/* Timer info */}
        <div className="flex items-center gap-3 mb-8 px-4 py-2.5 rounded-xl"
          style={{ background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.25)' }}>
          <span className="text-indigo-400 font-black text-sm">⏱ {MEMORIA_TIMER_INICIAL}s</span>
          <span className="text-slate-500 text-xs">+{MEMORIA_BONUS_PAR}s por par · 0s = 💀 Game Over</span>
        </div>

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


function MemoriaVsSetup({ onStart, onBack, onOpenRanking }: SetupProps) 
{
  const [loading, setLoading] = useState<Dificuldade | null>(null);
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');

  const handleStart = async (dif: Dificuldade) => {
    setLoading(dif);
    try 
    {
      await onStart({
        dificuldade: dif,
        p1: p1.trim() || 'Astronauta 1',
        p2: p2.trim() || 'Astronauta 2',
      });
    } 
    finally 
    {
      setLoading(null);
    }
  };

  const cards: { dif: Dificuldade; emoji: string; bg: string; shadow: string }[] = 
  [
    { dif: 'EASY',   emoji: '🌕', bg: '#0e4f6e', shadow: 'rgba(6,182,212,0.35)'  },
    { dif: 'MEDIUM', emoji: '🪐', bg: '#1e3a8a', shadow: 'rgba(29,78,216,0.35)'  },
    { dif: 'HARD',   emoji: '🌌', bg: '#3b0764', shadow: 'rgba(124,58,237,0.35)' },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #6d28d9, #a855f7)', boxShadow: '0 0 28px rgba(168,85,247,0.4)' }}>
          ⚔️
        </div>

        <h1 className="text-3xl font-black text-white mb-1">Duelo de Mapas</h1>
        <p className="text-slate-400 text-sm mb-3">2 astronautas · timer progressivo · melhor tempo vence</p>

        {/* Timer info */}
        <div className="flex items-center gap-3 mb-6 px-4 py-2.5 rounded-xl"
          style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.25)' }}>
          <span className="text-purple-400 font-black text-sm">⏱ {MEMORIA_TIMER_INICIAL}s</span>
          <span className="text-slate-500 text-xs">+{MEMORIA_BONUS_PAR}s por par · 0s = 💀 Eliminado</span>
        </div>

        {/* Player names */}
        <div className="w-full max-w-md space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-lg"
              style={{ background: 'rgba(6,182,212,0.25)', border: '1px solid rgba(6,182,212,0.5)' }}>
              👨‍🚀
            </div>
            <input
              type="text" value={p1} onChange={(e) => setP1(e.target.value)}
              placeholder="Astronauta 1"
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none transition"
              style={{ background: '#0c1a35', border: '1px solid rgba(6,182,212,0.30)' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.70)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(6,182,212,0.30)')}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-lg"
              style={{ background: 'rgba(168,85,247,0.25)', border: '1px solid rgba(168,85,247,0.5)' }}>
              🚀
            </div>
            <input
              type="text" value={p2} onChange={(e) => setP2(e.target.value)}
              placeholder="Astronauta 2"
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none transition"
              style={{ background: '#0c1a35', border: '1px solid rgba(168,85,247,0.30)' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.70)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.30)')}
            />
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Tabuleiro da Batalha</p>
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

function LogicaSetup({ onStart, onBack, onOpenRanking }: SetupProps) {
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
    { dif: 'EASY',   emoji: '🌍', bg: '#0e3d1a', shadow: 'rgba(34,197,94,0.30)'   },
    { dif: 'MEDIUM', emoji: '🚀', bg: '#1a380d', shadow: 'rgba(132,204,22,0.28)'  },
    { dif: 'HARD',   emoji: '👨‍🚀', bg: '#0d2822', shadow: 'rgba(20,184,166,0.28)'  },
  ];

  const conectivos: { sym: string; nome: string }[] = [
    { sym: '∧', nome: 'E (conjunção)' },
    { sym: '∨', nome: 'OU (disjunção)' },
    { sym: '¬', nome: 'NÃO (negação)' },
    { sym: '→', nome: 'SE…ENTÃO (implicação)' },
    { sym: '↔', nome: 'SSE (equivalência)' },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #134e1e, #22c55e)', boxShadow: '0 0 28px rgba(34,197,94,0.35)' }}>
          🧠
        </div>

        <h1 className="text-3xl font-black text-white mb-1">Protocolo Lógico</h1>
        <p className="text-slate-400 text-sm mb-3">Decodifique as transmissões lógicas do cosmos</p>

        {/* Timer info */}
        <div className="flex gap-3 mb-4 flex-wrap justify-center">
          {(['EASY', 'MEDIUM', 'HARD'] as Dificuldade[]).map((dif) => (
            <span key={dif} className="text-[11px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
              ⏱ {DIF_LABEL[dif].split(' ').slice(1).join(' ')}: {TIMER_LOGICA[dif]}s/questão
            </span>
          ))}
        </div>

        {/* Legenda dos operadores */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-sm">
          {conectivos.map(({ sym, nome }) => (
            <span key={sym} className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
              <span className="font-black">{sym}</span> {nome}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
          {cards.map(({ dif, emoji, bg, shadow }) => {
            const { label, description } = LOGICA_CONFIG[dif];
            return (
              <button
                key={dif}
                onClick={() => handleStart(dif)}
                disabled={loading !== null}
                className="rounded-2xl p-5 flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-70"
                style={{ background: bg, border: '1px solid rgba(34,197,94,0.25)', boxShadow: `0 8px 24px ${shadow}` }}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="font-black text-white text-base mt-1">
                  {loading === dif ? '🛸 ...' : label}
                </span>
                <span className="text-white/65 text-[10px] text-center leading-tight mt-0.5">{description}</span>
                <span className="text-green-400/70 text-[10px] mt-1">⏱ {TIMER_LOGICA[dif]}s</span>
              </button>
            );
          })}
        </div>

        <p className="text-slate-600 text-xs mt-8 text-center max-w-sm">
          Cada transmissão tem um timer. Acertos em sequência ativam o 🔥 Streak Combo!
        </p>
      </div>
    </div>
  );
}


function PrecedenciaSetup({ onStart, onBack, onOpenRanking }: SetupProps) 
{
  const [loading, setLoading] = useState<Dificuldade | null>(null);

  const handleStart = async (dif: Dificuldade) => {
    setLoading(dif);
    try 
    {
      await onStart({ dificuldade: dif, p1: 'Astronauta', p2: '' });
    } 
    finally 
    {
      setLoading(null);
    }
  };

  const cards: { dif: Dificuldade; emoji: string; bg: string; shadow: string }[] = [
    { dif: 'EASY',   emoji: '🌍', bg: '#1e1040', shadow: 'rgba(139,92,246,0.30)'  },
    { dif: 'MEDIUM', emoji: '🚀', bg: '#2d1b69', shadow: 'rgba(139,92,246,0.35)'  },
    { dif: 'HARD',   emoji: '👨‍🚀', bg: '#3b0764', shadow: 'rgba(167,139,250,0.35)' },
  ];

  const operadores: { sym: string; nome: string }[] = [
    { sym: '∧', nome: 'E' },
    { sym: '∨', nome: 'OU' },
    { sym: '→', nome: 'SE…ENTÃO' },
    { sym: '↔', nome: 'SSE' },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #2d1b69, #7c3aed)', boxShadow: '0 0 28px rgba(139,92,246,0.40)' }}>
          ⚙️
        </div>

        <h1 className="text-3xl font-black text-white mb-1">Hierarquia de Comandos ⚙️</h1>
        <p className="text-slate-400 text-sm mb-3">Restaure a precedência dos operadores lógicos</p>

        {/* Timer info */}
        <div className="flex gap-3 mb-4 flex-wrap justify-center">
          {(['EASY', 'MEDIUM', 'HARD'] as Dificuldade[]).map((dif) => (
            <span key={dif} className="text-[11px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(167,139,250,0.25)', color: '#c4b5fd' }}>
              ⏱ {DIF_LABEL[dif].split(' ').slice(1).join(' ')}: {TIMER_PRECEDENCIA[dif]}s/expressão
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-sm">
          {operadores.map(({ sym, nome }) => (
            <span key={sym} className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(167,139,250,0.30)', color: '#c4b5fd' }}>
              <span className="font-black">{sym}</span> {nome}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
          {cards.map(({ dif, emoji, bg, shadow }) => {
            const { label, description } = PARENTESES_CONFIG[dif];
            return (
              <button
                key={dif}
                onClick={() => handleStart(dif)}
                disabled={loading !== null}
                className="rounded-2xl p-5 flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-70"
                style={{ background: bg, border: '1px solid rgba(167,139,250,0.25)', boxShadow: `0 8px 24px ${shadow}` }}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="font-black text-white text-base mt-1">
                  {loading === dif ? '🛸 ...' : label}
                </span>
                <span className="text-white/65 text-[10px] text-center leading-tight mt-0.5">{description}</span>
                <span className="text-violet-300/70 text-[10px] mt-1">⏱ {TIMER_PRECEDENCIA[dif]}s</span>
              </button>
            );
          })}
        </div>

        <p className="text-slate-600 text-xs mt-8 text-center max-w-sm">
          Adicione parênteses para restaurar a ordem correta. 🔥 Streak Combo para acertos consecutivos!
        </p>
      </div>
    </div>
  );
}

export function Setup(props: SetupProps) 
{
  if (props.modo === 'vs')         return <VsSetup {...props} />;
  if (props.modo === 'memoria')    return <MemoriaSetup {...props} />;
  if (props.modo === 'memoria-vs') return <MemoriaVsSetup {...props} />;
  if (props.modo === 'logica')     return <LogicaSetup {...props} />;
  if (props.modo === 'precedencia') return <PrecedenciaSetup {...props} />;
  return <SoloSetup {...props} />;
}
