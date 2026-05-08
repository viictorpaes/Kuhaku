import { useState } from 'react';
import type { Modo, Dificuldade, ConfigJogo } from '../types';
import { RANGE_LABEL, DIF_LABEL, MAX_TENTATIVAS_SOLO } from '../constants';

interface SetupProps {
  modo: Modo;
  onStart: (config: ConfigJogo) => Promise<void>;
  onBack: () => void;
  onOpenRanking: () => void;
}

const BG = 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d1b2e 0%, #09111e 100%)';

/** Shared page header */
function GameHeader({ onBack, onOpenRanking }: { onBack: () => void; onOpenRanking: () => void }) {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-slate-300 px-4 py-2 rounded-full transition"
      >
        🏠 Menu
      </button>
      <span className="font-black text-sm">
        <span className="text-white">🎮 Kuha</span><span style={{ color: '#f97316' }}>ku</span>
      </span>
      <button
        onClick={onOpenRanking}
        className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium px-4 py-2 rounded-full transition"
      >
        🏆 Ranking
      </button>
    </header>
  );
}

/** VS Adivinhação setup */
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
      await onStart({ dificuldade, p1: p1.trim() || 'Jogador 1', p2: p2.trim() || 'Jogador 2' });
    } catch {
      setErro('Erro ao criar jogo. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
          ⚔️
        </div>

        <h1 className="text-3xl font-black text-white mb-1">VS Adivinhação</h1>
        <p className="text-slate-400 text-sm mb-8">2 jogadores · 3 rodadas</p>

        <div className="w-full max-w-md space-y-4 mb-8">
          {/* Player 1 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500 shrink-0 flex items-center justify-center shadow-lg shadow-purple-500/30" />
            <input
              type="text"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              placeholder="Jogador 1"
              className="flex-1 bg-[#1a2540] border border-purple-500/40 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 transition"
            />
          </div>
          {/* Player 2 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-400 shrink-0 flex items-center justify-center shadow-lg shadow-orange-400/30" />
            <input
              type="text"
              value={p2}
              onChange={(e) => setP2(e.target.value)}
              placeholder="Jogador 2"
              className="flex-1 bg-[#1a2540] border border-orange-500/40 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-400 transition"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div className="w-full max-w-md mb-8">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Dificuldade</p>
          <div className="grid grid-cols-3 gap-3">
            {(['EASY', 'MEDIUM', 'HARD'] as Dificuldade[]).map((dif) => (
              <button
                key={dif}
                onClick={() => setDificuldade(dif)}
                className={`py-3 rounded-xl border transition-all ${
                  dificuldade === dif
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <p className={`font-bold text-sm ${dificuldade === dif ? 'text-amber-400' : ''}`}>{DIF_LABEL[dif]}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{RANGE_LABEL[dif]}</p>
              </button>
            ))}
          </div>
        </div>

        {erro && <p className="text-red-400 text-xs mb-4">{erro}</p>}

        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full max-w-md py-4 rounded-2xl font-black text-white text-base disabled:opacity-50 transition hover:opacity-90 active:scale-[0.98] shadow-xl"
          style={{ background: 'linear-gradient(135deg, #6366f1, #f97316)' }}
        >
          {loading ? 'Iniciando...' : '⚔️ COMEÇAR A BATALHA!'}
        </button>
      </div>
    </div>
  );
}

/** Adivinhe o Número (solo) setup — difficulty cards */
function SoloSetup({ onStart, onBack, onOpenRanking }: SetupProps) {
  const [loading, setLoading] = useState<Dificuldade | null>(null);

  const handleStart = async (dif: Dificuldade) => {
    setLoading(dif);
    try {
      await onStart({ dificuldade: dif, p1: 'Jogador 1', p2: '' });
    } finally {
      setLoading(null);
    }
  };

  const cards: { dif: Dificuldade; emoji: string; bg: string; shadow: string }[] = [
    { dif: 'EASY',   emoji: '🌱', bg: '#16a34a', shadow: 'rgba(22,163,74,0.35)' },
    { dif: 'MEDIUM', emoji: '🌡️', bg: '#d97706', shadow: 'rgba(217,119,6,0.35)'  },
    { dif: 'HARD',   emoji: '💀', bg: '#dc2626', shadow: 'rgba(220,38,38,0.35)'  },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          🌡️
        </div>

        <h1 className="text-3xl font-black text-white mb-1">Adivinhe o Número</h1>
        <p className="text-slate-400 text-sm mb-10">Escolha a dificuldade para começar</p>

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

export function Setup(props: SetupProps) {
  return props.modo === 'vs' ? <VsSetup {...props} /> : <SoloSetup {...props} />;
}
