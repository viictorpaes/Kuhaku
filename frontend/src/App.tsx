import { useState, useCallback, useEffect } from 'react';
import { Home } from './components/home';
import { Setup } from './components/setup';
import { Game, VsResultScreen } from './components/game';
import { Ranking } from './components/ranking';
import type { GameTypeFilter } from './components/ranking';
import type { Tela, Modo, Dificuldade, ConfigJogo } from './types';
import { TOTAL_ROUNDS_VS } from './constants';
import { starWarsTheme } from './ts/audio';

const API_URL = (window as any).API_BASE_URL ?? 'http://localhost:3001';

async function criarJogo(dificuldade: Dificuldade, gameType?: string, customRange?: number): Promise<string>
{
  const res = await fetch(`${API_URL}/api/games`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      difficulty: dificuldade,
      ...(gameType    && { gameType }),
      ...(customRange && { customRange }),
    }),
  });

  const game = await res.json();
  return game.id;
}

export function App()
{
  const [tela, setTela] = useState<Tela>('home');
  const [modo, setModo] = useState<Modo | null>(null);
  const [dificuldade, setDificuldade] = useState<Dificuldade | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [p1, setP1] = useState('Jogador 1');
  const [p2, setP2] = useState('Jogador 2');

  const [timerSegundos, setTimerSegundos] = useState<number | null | undefined>(undefined);
  const [rangeMaxCustom, setRangeMaxCustom] = useState<number | undefined>(undefined);

  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const [finalScore, setFinalScore] = useState<{ p1: number; p2: number } | null>(null);
  const [vsRoundResults, setVsRoundResults] = useState<{ gameId: string; winner: 1 | 2 | null }[]>([]);
  const [rankingFilter, setRankingFilter] = useState<GameTypeFilter | undefined>(undefined);

  const iniciarJogo = useCallback(async (config: ConfigJogo) =>
  {
    setDificuldade(config.dificuldade);
    setP1(config.p1 || 'Jogador 1');
    setP2(config.p2 || 'Jogador 2');
    setRound(1);
    setScore({ p1: 0, p2: 0 });
    setFinalScore(null);
    setVsRoundResults([]);
    setTimerSegundos(config.timerSegundos);
    setRangeMaxCustom(config.rangeMax);

    const isVs         = modo === 'vs';
    const isMemoria    = modo === 'memoria';
    const isMemoriaVs  = modo === 'memoria-vs';
    const isLogica     = modo === 'logica';
    const isPrecedencia = modo === 'precedencia';

    const gameType =
      isVs          ? 'VS_GUESS' :
      isMemoria     ? 'CARD_GUESS' :
      isMemoriaVs   ? 'CARD_GUESS_VS' :
      isLogica      ? 'LOGIC_PUZZLE' :
      isPrecedencia ? 'PRECEDENCE_PUZZLE' : undefined;

    const id = await criarJogo(config.dificuldade, gameType, config.rangeMax);
    setGameId(id);
    setTela('game');
  }, [modo]);

  const onRoundEnd = useCallback(async (winner: 1 | 2 | null) =>
  {
    setVsRoundResults((prev) => [...prev, { gameId: gameId!, winner }]);

    const newScore = { ...score };

    if (winner === 1) 
      newScore.p1++;
    if (winner === 2) 
      newScore.p2++;

    setScore(newScore);

    if (round >= TOTAL_ROUNDS_VS)
    {
      setFinalScore(newScore);
      setTela('result');
    }

    else
    {
      setRound((r) => r + 1);
      const id = await criarJogo(dificuldade!, 'VS_GUESS');
      setGameId(id);
    }

  }, [round, score, dificuldade, gameId]);

  const novoJogoSolo = useCallback(async () =>
  {
    const gameType =
      modo === 'memoria'    ? 'CARD_GUESS' :
      modo === 'memoria-vs' ? 'CARD_GUESS_VS' :
      modo === 'logica'     ? 'LOGIC_PUZZLE' :
      modo === 'precedencia'? 'PRECEDENCE_PUZZLE' : undefined;
    const id = await criarJogo(dificuldade!, gameType, rangeMaxCustom);
    setGameId(id);
  }, [dificuldade, modo, rangeMaxCustom]);

  useEffect(() => 
  {
    if (tela === 'game' || tela === 'result') 
    {
      starWarsTheme.stop();
    } 
    else 
    {
      starWarsTheme.start();
    }
  }, [tela]);

  const voltarParaHome = () =>
  {
    setTela('home');
    setModo(null);
    setDificuldade(null);
    setGameId(null);
    setRound(1);
    setScore({ p1: 0, p2: 0 });
    setFinalScore(null);
    setVsRoundResults([]);
    setTimerSegundos(undefined);
    setRangeMaxCustom(undefined);
  };

  if (tela === 'ranking')
  {
    return <Ranking onBack={() => { setRankingFilter(undefined); setTela('home'); }} apiUrl={API_URL} initialFilter={rankingFilter} />;
  }

  if (tela === 'result')
  {
    return (
      <VsResultScreen
        p1={p1}
        p2={p2}
        finalScore={finalScore!}
        vsRoundResults={vsRoundResults}
        apiUrl={API_URL}
        onJogarNovamente={() => iniciarJogo({ dificuldade: dificuldade!, p1, p2 })}
        onVoltarHome={voltarParaHome}
        onOpenRanking={() => setTela('ranking')}
      />
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
        key={gameId!}
        gameId={gameId!}
        modo={modo!}
        dificuldade={dificuldade!}
        p1={p1}
        p2={p2}
        round={round}
        score={score}
        apiUrl={API_URL}
        timerSegundos={timerSegundos}
        rangeMax={rangeMaxCustom}
        onBack={voltarParaHome}
        onOpenRanking={(filter) => { setRankingFilter(filter as GameTypeFilter | undefined); setTela('ranking'); }}
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
