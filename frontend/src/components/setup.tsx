// src/components/Setup.tsx
import React, { useState } from 'react';
import { ModoJogo, Dificuldade } from '../types';

interface SetupProps {
  modo: ModoJogo;
  aoIniciarJogo: (config: { dificuldade: Dificuldade; p1: string; p2: string }) => void;
  aoVoltar: () => void;
}

export function Setup({ modo, aoIniciarJogo, aoVoltar }: SetupProps) {
  const [dificuldade, setDificuldade] = useState<Dificuldade>('medio');
  const [p1, setP1] = useState('Jogador 1');
  const [p2, setP2] = useState('Jogador 2');

  const obterIntervaloDificuldade = (dif: Dificuldade) => {
    if (dif === 'facil') return '1–50';
    if (dif === 'medio') return '1–100';
    return '1–500';
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <button onClick={aoVoltar} className="text-sm text-indigo-400 hover:text-indigo-300 mb-6 flex items-center gap-1 transition">
          ← Voltar
        </button>

        <div className="text-center mb-8">
          <span className="text-4xl">⚔️</span>
          <h1 className="text-2xl font-bold mt-3 text-slate-100">Configurações de Batalha</h1>
          <p className="text-slate-400 text-xs mt-1">2 jogadores • 3 rodadas</p>
        </div>

        {modo === 'vs' && (
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-2 font-bold tracking-wider">Jogador 1</label>
              <input 
                type="text" 
                value={p1} 
                onChange={(e) => setP1(e.target.value)} 
                className="w-full bg-[#0b1229] border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                placeholder="Nome do Jogador 1"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-2 font-bold tracking-wider">Jogador 2</label>
              <input 
                type="text" 
                value={p2} 
                onChange={(e) => setP2(e.target.value)} 
                className="w-full bg-[#0b1229] border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                placeholder="Nome do Jogador 2"
              />
            </div>
          </div>
        )}

        <div className="mb-8">
          <label className="block text-[10px] uppercase text-slate-400 mb-4 font-bold tracking-wider text-center">
            Selecione a Dificuldade
          </label>
          <div className="grid grid-cols-3 gap-4">
            {(['facil', 'medio', 'dificil'] as Dificuldade[]).map((dif) => (
              <button
                key={dif}
                onClick={() => setDificuldade(dif)}
                className={`py-4 rounded-xl flex flex-col items-center justify-center border transition-all ${
                  dificuldade === dif 
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/10' 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                }`}
              >
                <span className="font-bold capitalize text-sm text-slate-100">{dif}</span>
                <span className="text-[10px] mt-1 text-slate-400">{obterIntervaloDificuldade(dif)}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => aoIniciarJogo({ dificuldade, p1, p2 })}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg transition-all"
        >
          ⚔️ Começar a Batalha!
        </button>
      </div>
    </div>
  );
}