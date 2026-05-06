// src/components/Home.tsx
import React from 'react';
import { ModoJogo } from '../types';

interface HomeProps 
{
  aoSelecionarModo: (modo: ModoJogo) => void;
  aoAbrirRanking: () => void;
}

export function Home({ aoSelecionarModo, aoAbrirRanking }: HomeProps) 
{
  return (
    <div className="min-h-screen bg-[#05070d] text-white flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center mb-12">
        <span className="text-4xl mb-2 animate-bounce">🎮</span>
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          CesarNumber
        </h1>
        <p className="text-slate-400 mt-2 text-sm">Escolha um modo de jogo para começar!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Modo VS Adivinhação */}
        <button 
          onClick={() => aoSelecionarModo('vs')}
          className="group bg-gradient-to-br from-indigo-600 to-orange-600 p-[1px] rounded-2xl shadow-xl transition-all hover:-translate-y-1 text-left"
        >
          <div className="bg-[#0b1229] p-8 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <span className="bg-indigo-600/50 text-indigo-200 px-3 py-1 text-[10px] font-bold tracking-wider rounded-full">🔥 NOVO</span>
              <h2 className="text-2xl font-bold mt-5 mb-3 text-slate-100">
                ⚔️ VS Adivinhação
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Dois jogadores, mesmo número secreto. Alternando palpites — quem acertar primeiro vence a rodada!
              </p>
            </div>
            <div className="mt-8 text-[11px] text-orange-400 font-medium">
              + 3 Rodadas • Fácil / Médio / Difícil • Placar ao vivo
            </div>
          </div>
        </button>

        {/* Modo Adivinhe o Número */}
        <button 
          onClick={() => aoSelecionarModo('guess')}
          className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl shadow-xl transition-all hover:-translate-y-1 text-left hover:border-indigo-500/50"
        >
          <span className="text-3xl">#</span>
          <h2 className="text-xl font-bold mt-4 mb-2 text-slate-200">Adivinhe o Número</h2>
          <p className="text-slate-400 text-sm mb-6">
            Solo • dicas quente/frio • 3 dificuldades
          </p>
          <span className="text-xs text-purple-400 font-medium bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-900/30">
            ✨ Dicas inteligentes
          </span>
        </button>

        {/* Modo Jogo da Memória */}
        <button 
          onClick={() => aoSelecionarModo('memory')}
          className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl shadow-xl transition-all hover:-translate-y-1 text-left hover:border-emerald-500/50"
        >
          <span className="text-3xl">🧠</span>
          <h2 className="text-xl font-bold mt-4 mb-2 text-slate-200">Jogo da Memória</h2>
          <p className="text-slate-400 text-sm mb-6">
            Solo • pares de números • 4x4 / 4x5 / 6x6
          </p>
          <span className="text-xs text-emerald-400 font-medium bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-900/30">
            ⭐ Pontuação extra
          </span>
        </button>
      </div>

      <button 
        onClick={aoAbrirRanking}
        className="mt-16 flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-3 rounded-full font-semibold text-xs text-slate-950 shadow-lg hover:brightness-110 transition"
      >
        🏆 Ver Ranking Global
      </button>
    </div>
  );
}