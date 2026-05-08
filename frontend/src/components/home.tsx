import type { Modo } from '../types';

interface HomeProps 
{
  onSelectMode: (modo: Modo) => void;
  onOpenRanking: () => void;
}

export function Home({ onSelectMode, onOpenRanking }: HomeProps) 
{
  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style=
    {
        {
          background:
            'radial-gradient(ellipse at 50% 10%, rgba(99,102,241,0.13) 0%, transparent 55%), linear-gradient(180deg, #0d1b2e 0%, #09111e 100%)',
          fontFamily: "'Inter', system-ui, sans-serif",
        }
    }
    >
      {/* Decorative background numbers */}
      <span className="pointer-events-none select-none absolute left-4 top-1/3 text-[160px] font-black text-white/[0.03] leading-none">42</span>
      <span className="pointer-events-none select-none absolute right-8 bottom-1/4 text-[120px] font-black text-white/[0.03] leading-none">×</span>

      {/* Logo + title */}
      <div className="flex flex-col items-center mb-10 z-10">
        <div className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
          🎮
        </div>
        <h1 className="text-5xl font-black tracking-tight leading-none">
          <span className="text-white">Kuha</span><span style={{ color: '#f97316' }}>ku</span>
        </h1>
        <p className="text-slate-400 mt-3 text-sm">Escolha um modo de jogo para começar!</p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-2xl z-10 flex flex-col gap-4">

        {/* VS card — full width, gradient */}
        <button
          onClick={() => onSelectMode('vs')}
          className="w-full text-left rounded-3xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.99]"
          style=
          {
            { background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 35%, #ec4899 65%, #f97316 100%)' 
            }
          }
        >
          <div className="p-6 flex gap-4 items-start">
            {/* Icon */}
            <div className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              ⚔️
            </div>
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  🔥 NOVO
                </span>
                <span className="inline-flex items-center bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  2 Jogadores
                </span>
              </div>
              <h2 className="text-xl font-black text-white">VS Adivinhação ⚔️</h2>
              <p className="text-white/80 text-sm mt-1 leading-relaxed">
                Dois jogadores, mesmo número secreto. Alternando palpites — quem acertar primeiro vence a rodada!
              </p>
              <p className="text-white/70 text-xs mt-3 font-medium">
                + 3 Rodadas &nbsp;·&nbsp; + Fácil / Médio / Difícil &nbsp;·&nbsp; + Placar ao vivo
              </p>
            </div>
          </div>
        </button>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-4">

          {/* Adivinhe o Número */}
          <button
            onClick={() => onSelectMode('solo')}
            className="text-left rounded-3xl overflow-hidden p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.99]"
            style={{ background: '#3730a3' }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg mb-4 font-black text-white">
              #
            </div>
            <h2 className="text-base font-black text-white leading-tight">Adivinhe o Número</h2>
            <p className="text-white/70 text-xs mt-1">Solo · dicas quente/frio · 3 dificuldades</p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1 bg-white/15 text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-full">
                ⚡ Sistema de dicas inteligente
              </span>
            </div>
          </button>

          {/* Jogo da Memória */}
          <button
            onClick={() => onSelectMode('memoria')}
            className="text-left rounded-3xl overflow-hidden p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.99]"
            style={{ background: '#0f766e' }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg mb-4">
              🧠
            </div>
            <h2 className="text-base font-black text-white leading-tight">Jogo da Memória</h2>
            <p className="text-white/70 text-xs mt-1">Solo · pares de números · 4×4 / 4×5 / 6×6</p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1 bg-white/15 text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-full">
                ⭐ Pontuação por velocidade
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Ranking button */}
      <button
        onClick={onOpenRanking}
        className="mt-10 z-10 flex items-center gap-2 border border-white/15 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-full font-semibold text-sm transition"
      >
        🏆 Ver Ranking Global &nbsp;
      </button>

      <p className="mt-6 z-10 text-slate-600 text-xs">Inspirado em Kahoot &amp; Baamboozle</p>
    </div>
  );
}
