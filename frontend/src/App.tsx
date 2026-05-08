import { useState, useCallback } from 'react';
import { Home } from './components/home';
import { Setup } from './components/setup';
import { Game } from './components/game';
import { Ranking } from './components/ranking';
import type { Tela, Modo, Dificuldade, ConfigJogo } from './types';
import { TOTAL_ROUNDS_VS } from './constants';

const API_URL = (window as any).API_BASE_URL ?? 'http://localhost:3001';

async function criarJogo(dificuldade: Dificuldade): Promise<string> {
  const res = await fetch(`${API_URL}/api/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty: dificuldade }),
  });
  const game = await res.json();
  return game.id;
}

export function App() {
  const [tela, setTela] = useState<Tela>('home');
  const [modo, setModo] = useState<Modo | null>(null);
  const [dificuldade, setDificuldade] = useState<Dificuldade | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [p1, setP1] = useState('Jogador 1');
  const [p2, setP2] = useState('Jogador 2');

  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const [finalScore, setFinalScore] = useState<{ p1: number; p2: number } | null>(null);

  const iniciarJogo = useCallback(async (config: ConfigJogo) => 
  {
    setDificuldade(config.dificuldade);
    setP1(config.p1 || 'Jogador 1');
    setP2(config.p2 || 'Jogador 2');
    setRound(1);
    setScore({ p1: 0, p2: 0 });
    setFinalScore(null);
    const id = await criarJogo(config.dificuldade);
    setGameId(id);
    setTela('game');
  }, []);

  const onRoundEnd = useCallback(async (winner: 1 | 2 | null) => 
  {
    const newScore = { ...score };
    if (winner === 1) newScore.p1++;
    if (winner === 2) newScore.p2++;
    setScore(newScore);

    if (round >= TOTAL_ROUNDS_VS) 
    {
      setFinalScore(newScore);
      setTela('result');
    } 
    
    else 
    {
      setRound((r) => r + 1);
      const id = await criarJogo(dificuldade!);
      setGameId(id);
    }
  }, [round, score, dificuldade]);


  const novoJogoSolo = useCallback(async () => 
  {
    const id = await criarJogo(dificuldade!);
    setGameId(id);
  }, [dificuldade]);

  const voltarParaHome = () => 
  {
    setTela('home');
    setModo(null);
    setDificuldade(null);
    setGameId(null);
    setRound(1);
    setScore({ p1: 0, p2: 0 });
    setFinalScore(null);
  };

  if (tela === 'ranking') 
  {
    return <Ranking onBack={() => setTela('home')} apiUrl={API_URL} />;
  }

  if (tela === 'result') 
  {
    const vencedor =
      finalScore!.p1 > finalScore!.p2 ? p1 :
      finalScore!.p2 > finalScore!.p1 ? p2 : null;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d1b2e 0%, #09111e 100%)' }}
      >
        <div className="max-w-sm w-full bg-[#131d31] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
          <div className="text-5xl mb-4">{vencedor ? '🏆' : '🤝'}</div>
          <h2 className="text-2xl font-black text-white mb-1">
            {vencedor ? `${vencedor} venceu!` : 'Empate!'}
          </h2>
          <p className="text-slate-400 text-sm mb-8">Resultado final após {TOTAL_ROUNDS_VS} rodadas</p>

          <div className="flex gap-3 mb-8">
            <div className="flex-1 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4">
              <div className="w-3 h-3 rounded-full bg-purple-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400 truncate">{p1}</p>
              <p className="text-3xl font-black text-purple-400">{finalScore!.p1}</p>
            </div>
            <div className="flex-1 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4">
              <div className="w-3 h-3 rounded-full bg-orange-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400 truncate">{p2}</p>
              <p className="text-3xl font-black text-orange-400">{finalScore!.p2}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => iniciarJogo({ dificuldade: dificuldade!, p1, p2 })}
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #6366f1, #f97316)' }}
            >
              ⚔️ Jogar Novamente
            </button>
            <button
              onClick={voltarParaHome}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-semibold text-sm text-slate-300 transition"
            >
              🏠 Menu Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (tela === 'setup') 
  {
    return (
      <Setup
        modo={modo!}
        onStart={iniciarJogo}
        onBack={() => setTela('home')}
        onOpenRanking={() => setTela('ranking')}
      />
    );
  }

  if (tela === 'game') 
  {
    return (
      <Game
        gameId={gameId!}
        modo={modo!}
        dificuldade={dificuldade!}
        p1={p1}
        p2={p2}
        round={round}
        score={score}
        apiUrl={API_URL}
        onBack={voltarParaHome}
        onOpenRanking={() => setTela('ranking')}
        onRoundEnd={onRoundEnd}
        onNovoJogo={novoJogoSolo}
      />
    );
  }

  return (
    <Home
      onSelectMode={(m) => { setModo(m); setTela('setup'); }}
      onOpenRanking={() => setTela('ranking')}
    />
  );
}
