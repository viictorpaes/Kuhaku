// src/components/Game.tsx
import React, { useState } from 'react';
import { Dificuldade, ModoJogo } from '../types';

interface GameProps 
{
  modo: ModoJogo;
  dificuldade: Dificuldade;
  p1: string;
  p2: string;
  aoVoltarParaMenu: () => void;
}

export function Game({ modo, dificuldade, p1, p2, aoVoltarParaMenu }: GameProps) 
{
  const [palpite, setPalpite] = useState('');
  const [tentativasUsadas, setTentativasUsadas] = useState(0);
  const [jogadorAtual, setJogadorAtual] = useState(1);
  const [mensagem, setMensagem] = useState('');

  const API_BASE_URL = (window as any).API_BASE_URL || 'http://localhost:3001';

  const enviarPalpite = async (e: React.FormEvent) => 
    {
    e.preventDefault();

    try 
    {
      const resposta = await fetch
      (
        `${API_BASE_URL}/guess`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guess: Number(palpite), difficulty: dificuldade }),
        }
      );
      
      const dados = await resposta.json();
      setMensagem(dados.hint || 'Palpite enviado com sucesso! ✅');
      
    } 
    catch (err) 
    {
      setMensagem('Erro de conexão com o servidor! ❌');
    }

    setTentativasUsadas((prev) => prev + 1);
    setJogadorAtual(jogadorAtual === 1 ? 2 : 1);
    setPalpite('');
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white flex flex-col justify-between p-8">
      <header className="flex justify-between items-center max-w-6xl w-full mx-auto">
        <button 
          onClick={aoVoltarParaMenu} 
          className="bg-slate-900/80 border border-slate-800 text-xs text-slate-400 hover:text-white px-4 py-2.5 rounded-lg transition"
        >
          Menu
        </button>
        <span className="font-bold text-xs tracking-widest text-slate-500">
          CesarNumber
        </span>
        <button className="text-xs font-semibold bg-amber-600/10 border border-amber-600/30 text-amber-300 px-4 py-2.5 rounded-lg">
          🏆 Ranking
        </button>
      </header>

      <main className="max-w-md w-full mx-auto text-center bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-[10px] tracking-widest text-indigo-400 uppercase font-bold">
            Modo {modo === 'vs' ? 'VS Adivinhação' : 'Solo'}
          </span>
          <h2 className={`text-2xl font-extrabold mt-2 ${jogadorAtual === 1 ? 'text-indigo-400' : 'text-orange-400'}`}>
            Vez de {jogadorAtual === 1 ? p1 : p2}!
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dificuldade: <span className="capitalize font-semibold">{dificuldade}</span> • {tentativasUsadas} tentativas
          </p>
        </div>

        <form onSubmit={enviarPalpite} className="space-y-4">
          <div>
            <input 
              type="number" 
              value={palpite}
              onChange={(e) => setPalpite(e.target.value)}
              placeholder="Digite seu palpite"
              className="w-full bg-[#0b1229] border border-slate-800 rounded-xl p-5 text-center text-xl font-extrabold text-white focus:outline-none focus:border-indigo-500 transition" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold py-4 rounded-xl shadow-xl hover:shadow-indigo-500/20 transition"
          >
            Tentar!
          </button>
        </form>

        {mensagem && 
        (
          <div className="mt-6 p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-indigo-300">
            {mensagem}
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-slate-600">
        Criado com o Figma Make
      </footer>
    </div>
  );
}