import type { Modo } from '../types';

interface HomeProps
{
  onSelectMode: (modo: Modo) => void;
  onOpenRanking: () => void;
}

const SPACE_BG = 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.14) 0%, transparent 55%), linear-gradient(180deg, #020818 0%, #0a0f1e 100%)';

export function Home({ onSelectMode, onOpenRanking }: HomeProps)
{
  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: SPACE_BG, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Decorative stars */}
      <span className="pointer-events-none select-none absolute left-6 top-1/4 text-[120px] font-black leading-none" style={{ color: 'rgba(6,182,212,0.04)' }}>★</span>
      <span className="pointer-events-none select-none absolute right-10 top-1/3 text-[80px] font-black leading-none" style={{ color: 'rgba(6,182,212,0.05)' }}>✦</span>
      <span className="pointer-events-none select-none absolute left-1/3 bottom-1/5 text-[60px] font-black leading-none" style={{ color: 'rgba(6,182,212,0.04)' }}>★</span>
      <span className="pointer-events-none select-none absolute right-4 bottom-1/3 text-[100px] font-black leading-none" style={{ color: 'rgba(99,102,241,0.04)' }}>✦</span>

      {/* Logo + title */}
      <div className="flex flex-col items-center mb-10 z-10">
        <div
          className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', boxShadow: '0 0 32px rgba(6,182,212,0.35)' }}
        >
          👨‍🚀
        </div>
        <h1 className="text-5xl font-black tracking-tight leading-none">
          <span className="text-white">Kuha</span><span style={{ color: '#06b6d4' }}>ku</span>
        </h1>
        <p className="text-slate-400 mt-3 text-sm">Astronauta, escolha sua missão!</p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-2xl z-10 flex flex-col gap-4">

        {/* VS card — full width */}
        <button
          onClick={() => onSelectMode('vs')}
          className="w-full text-left rounded-3xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 40%, #06b6d4 70%, #0891b2 100%)', boxShadow: '0 8px 32px rgba(6,182,212,0.25)' }}
        >
          <div className="p-6 flex gap-4 items-start">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              📡
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  🚀 MISSÃO
                </span>
                <span className="inline-flex items-center bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                  2 Astronautas
                </span>
              </div>
              <h2 className="text-xl font-black text-white">Batalha de Sinais 📡</h2>
              <p className="text-white/80 text-sm mt-1 leading-relaxed">
                Dois astronautas, mesma frequência secreta. Alternando palpites — quem sintonizar primeiro vence a rodada!
              </p>
              <p className="text-white/70 text-xs mt-3 font-medium">
                + 3 Rodadas &nbsp;·&nbsp; + Cadete / Piloto / Comandante &nbsp;·&nbsp; + Placar ao vivo
              </p>
            </div>
          </div>
        </button>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-4">

          {/* Operação Resgate */}
          <button
            onClick={() => onSelectMode('solo')}
            className="text-left rounded-3xl overflow-hidden p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.99]"
            style={{ background: '#0c1a35', border: '1px solid rgba(6,182,212,0.25)', boxShadow: '0 4px 20px rgba(6,182,212,0.1)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-lg mb-4" style={{ border: '1px solid rgba(6,182,212,0.4)' }}>
              🔭
            </div>
            <h2 className="text-base font-black text-white leading-tight">Operação Resgate</h2>
            <p className="text-slate-400 text-xs mt-1">Solo · frequência secreta · 3 patentes</p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ border: '1px solid rgba(6,182,212,0.3)' }}>
                📡 Sistema de sinal inteligente
              </span>
            </div>
          </button>

          {/* Mapas Estelares */}
          <button
            onClick={() => onSelectMode('memoria')}
            className="text-left rounded-3xl overflow-hidden p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.99]"
            style={{ background: '#081428', border: '1px solid rgba(99,102,241,0.25)', boxShadow: '0 4px 20px rgba(99,102,241,0.1)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg mb-4" style={{ border: '1px solid rgba(99,102,241,0.4)' }}>
              🌕
            </div>
            <h2 className="text-base font-black text-white leading-tight">Mapas Estelares</h2>
            <p className="text-slate-400 text-xs mt-1">Solo · pares de coordenadas · 4×4 / 4×5 / 6×6</p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ border: '1px solid rgba(99,102,241,0.3)' }}>
                ⭐ Pontuação por velocidade
              </span>
            </div>
          </button>
        </div>

        {/* Protocolo Lógico — full width */}
        <button
          onClick={() => onSelectMode('logica')}
          className="w-full text-left rounded-3xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #0d2b16 0%, #1a3a0d 50%, #0e2f1a 100%)', border: '1px solid rgba(34,197,94,0.30)', boxShadow: '0 8px 32px rgba(34,197,94,0.15)' }}
        >
          <div className="p-6 flex gap-4 items-start">
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(34,197,94,0.20)', border: '1px solid rgba(34,197,94,0.40)' }}>
              🧠
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide" style={{ background: 'rgba(34,197,94,0.20)' }}>
                  🌌 PROTOCOLO LÓGICO
                </span>
                <span className="inline-flex items-center text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                  ∧ ∨ ¬ → ↔
                </span>
                <span className="inline-flex items-center text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                  Solo
                </span>
              </div>
              <h2 className="text-xl font-black text-white">Protocolo Lógico 🧠</h2>
              <p className="text-white/75 text-sm mt-1 leading-relaxed">
                A base espacial intercepta transmissões cifradas do cosmos. Decodifique cada sinal lógico — identifique Tautologias, Contradições e Contingências — e determine se a fórmula é VERDADEIRA ou FALSA!
              </p>
              <p className="text-white/55 text-xs mt-3 font-medium">
                🌟 Tautologia &nbsp;·&nbsp; 🕳️ Contradição &nbsp;·&nbsp; 🪐 Contingência &nbsp;·&nbsp; Implicação &nbsp;·&nbsp; Equivalência
              </p>
            </div>
          </div>
        </button>

        {/* Hierarquia de Comandos — full width */}
        <button
          onClick={() => onSelectMode('precedencia')}
          className="w-full text-left rounded-3xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #1e1040 0%, #2d1b69 50%, #1a0f3e 100%)', border: '1px solid rgba(167,139,250,0.30)', boxShadow: '0 8px 32px rgba(139,92,246,0.15)' }}
        >
          <div className="p-6 flex gap-4 items-start">
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(139,92,246,0.20)', border: '1px solid rgba(167,139,250,0.40)' }}>
              ⚙️
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide" style={{ background: 'rgba(139,92,246,0.20)' }}>
                  🪐 HIERARQUIA DE COMANDOS
                </span>
                <span className="inline-flex items-center text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(167,139,250,0.25)' }}>
                  ∧ ∨ → ↔
                </span>
                <span className="inline-flex items-center text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(167,139,250,0.25)' }}>
                  Solo
                </span>
              </div>
              <h2 className="text-xl font-black text-white">Hierarquia de Comandos ⚙️</h2>
              <p className="text-white/75 text-sm mt-1 leading-relaxed">
                O computador da nave perdeu os parênteses das equações lógicas! Adicione os parênteses corretos para restaurar a ordem de precedência dos operadores e salvar os sistemas críticos.
              </p>
              <p className="text-white/55 text-xs mt-3 font-medium">
                ( ) Parênteses &nbsp;·&nbsp; ∧ antes de ∨ &nbsp;·&nbsp; ∨ antes de → &nbsp;·&nbsp; → antes de ↔ &nbsp;·&nbsp; Associatividade
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Ranking button */}
      <button
        onClick={onOpenRanking}
        className="mt-10 z-10 flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition"
        style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', color: '#67e8f9' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(6,182,212,0.15)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(6,182,212,0.08)')}
      >
        🏆 Ver Ranking da Missão &nbsp;
      </button>

      <p className="mt-6 z-10 text-slate-600 text-xs">@ Cesar School, 2026.1</p>
    </div>
  );
}
