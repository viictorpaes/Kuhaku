import { useState, useRef, useEffect } from 'react';
import type { Dificuldade, Modo, Palpite, Direcao } from '../types';
import {
  RANGE_LABEL, DIF_LABEL, DIF_COLOR,
  MAX_TENTATIVAS_SOLO, MAX_TENTATIVAS_VS, TOTAL_ROUNDS_VS, RANGE_MAX,
} from '../constants';

interface GameProps 
{
  gameId: string;
  modo: Modo;
  dificuldade: Dificuldade;
  p1: string;
  p2: string;
  round: number;
  score: { p1: number; p2: number };
  apiUrl: string;

  onBack: () => void;
  onOpenRanking: () => void;
  onRoundEnd: (winner: 1 | 2 | null) => Promise<void>;
  onNovoJogo: () => Promise<void>;
}

const BG = 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 50%), linear-gradient(180deg, #0d1b2e 0%, #09111e 100%)';

const P1_COLOR = '#a855f7';
const P2_COLOR = '#f97316';

function direcaoLabel(d: Direcao): string 
{
  if (d === 'higher') return '↑ Muito maior!';
  if (d === 'lower')  return '↓ Muito menor!';
  return '✓ Acertou!';
}

function feedbackLabel(fb: string): string 
{
  if (fb.includes('acertou'))      return '✅ Acertou!';
  if (fb.includes('pegando fogo')) return '🔥 Pegando fogo!';
  if (fb.includes('quente'))       return '🌡️ Quente!';
  if (fb.includes('morno'))        return '☔ Morno...';
  if (fb.includes('frio'))         return '❄️ Frio';
  return fb;
}

function feedbackBg(fb: string): string 
{
  if (fb.includes('acertou'))      return 'rgba(34,197,94,0.12)';
  if (fb.includes('pegando fogo')) return 'rgba(234,88,12,0.15)';
  if (fb.includes('quente'))       return 'rgba(245,158,11,0.12)';
  if (fb.includes('morno'))        return 'rgba(234,179,8,0.10)';
  if (fb.includes('frio'))         return 'rgba(59,130,246,0.12)';
  return 'rgba(255,255,255,0.05)';
}

function feedbackBorder(fb: string): string 
{
  if (fb.includes('acertou'))      return 'rgba(34,197,94,0.35)';
  if (fb.includes('pegando fogo')) return 'rgba(234,88,12,0.35)';
  if (fb.includes('quente'))       return 'rgba(245,158,11,0.35)';
  if (fb.includes('morno'))        return 'rgba(234,179,8,0.30)';
  if (fb.includes('frio'))         return 'rgba(59,130,246,0.35)';
  return 'rgba(255,255,255,0.1)';
}

function feedbackTextColor(fb: string): string 
{
  if (fb.includes('acertou'))      return '#4ade80';
  if (fb.includes('pegando fogo')) return '#fb923c';
  if (fb.includes('quente'))       return '#fbbf24';
  if (fb.includes('morno'))        return '#facc15';
  if (fb.includes('frio'))         return '#93c5fd';
  return '#e2e8f0';
}


function GameHeader({ onBack, onOpenRanking }: { onBack: () => void; onOpenRanking: () => void }) 
{
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-white/5">
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

// ─── VS GAME ──────────────────────────────────────────────────────────────────

function VsGame({ gameId, dificuldade, p1, p2, round, score, apiUrl, onBack, onOpenRanking, onRoundEnd }: GameProps) 
{
  const [palpite, setPalpite] = useState('');
  const [historico, setHistorico] = useState<Palpite[]>([]);
  const [jogadorAtual, setJogadorAtual] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [roundOver, setRoundOver] = useState<{ winner: 1 | 2 | null; advancing: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const tentativasUsadas = historico.length;
  const maxTentativas = MAX_TENTATIVAS_VS;
  const nomeAtual = jogadorAtual === 1 ? p1 : p2;
  const corAtual = jogadorAtual === 1 ? P1_COLOR : P2_COLOR;

  useEffect(() => 
    {
    if (!roundOver) inputRef.current?.focus();
  }, [jogadorAtual, roundOver]);

  const enviarPalpite = async (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseInt(palpite, 10);
    const max = RANGE_MAX[dificuldade];
    if (isNaN(valor) || valor < 1 || valor > max) 
    {
      setErro(`Digite um número entre 1 e ${max}`);
      return;
    }
    setErro('');
    setLoading(true);

    try 
    {
      const res = await fetch(`${apiUrl}/api/games/${gameId}/guess`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: valor }),
      }
    );
      const dados = await res.json();
      if (dados.message) { setErro(dados.message); setLoading(false); return; }

      const novo: Palpite = 
      {
        valor,
        feedback: dados.feedback,
        direcao: dados.direction as Direcao,
        jogador: jogadorAtual,
      };

      const novoHistorico = [novo, ...historico];
      setHistorico(novoHistorico);
      setPalpite('');

      if (dados.direction === 'correct') 
        {
        setRoundOver({ winner: jogadorAtual, advancing: false });
        return;
      }

      if (novoHistorico.length >= maxTentativas) 
        {
        setRoundOver({ winner: null, advancing: false });
        return;
      }

      setJogadorAtual(jogadorAtual === 1 ? 2 : 1);
    } catch 
    
    {
      setErro('Erro de conexão');
    } 
    
    finally 
    {
      setLoading(false);
    }
  };

  const handleAvançar = async () => 
    {
    if (!roundOver || roundOver.advancing) return;
    setRoundOver((r) => r ? { ...r, advancing: true } : r);
    await onRoundEnd(roundOver.winner);
  };

  const isRoundOver = roundOver !== null;
  const lastPalpite = historico[0];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Scoreboard */}
      <div className="flex items-center gap-2 px-5 py-3 flex-wrap">
        <span className="bg-white/10 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full">
          Rodada {round}/{TOTAL_ROUNDS_VS}
        </span>
        <span className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(168,85,247,0.12)', borderColor: 'rgba(168,85,247,0.35)', color: '#c084fc' }}>
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          {p1} &nbsp;<span className="text-white">{score.p1}</span>
        </span>
        <span className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(249,115,22,0.12)', borderColor: 'rgba(249,115,22,0.35)', color: '#fb923c' }}>
          <span className="w-2 h-2 rounded-full bg-orange-400" />
          {p2} &nbsp;<span className="text-white">{score.p2}</span>
        </span>
      </div>

      <main className="flex-1 flex flex-col gap-4 px-4 pb-8 max-w-lg mx-auto w-full">

        {/* Turn card */}
        {!isRoundOver && 
        (
          <div
            className="rounded-2xl p-5 text-center border transition-all"
            style={{
              background: jogadorAtual === 1 ? 'rgba(99,102,241,0.13)' : 'rgba(154,52,18,0.25)',
              borderColor: jogadorAtual === 1 ? 'rgba(168,85,247,0.4)' : 'rgba(249,115,22,0.4)',
            }}
          >
            <p className="font-black text-lg flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: corAtual }} />
              <span style={{ color: corAtual }}>Vez de {nomeAtual}!</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Número entre {RANGE_LABEL[dificuldade]} · {tentativasUsadas}/{maxTentativas} tentativas usadas
            </p>
          </div>
        )}

        {/* Round over card */}
        {isRoundOver && 
        (
          <div className="rounded-2xl p-5 text-center border"
            style={{
              background: roundOver.winner ? 'rgba(34,197,94,0.1)' : 'rgba(100,116,139,0.1)',
              borderColor: roundOver.winner ? 'rgba(34,197,94,0.35)' : 'rgba(100,116,139,0.3)',
            }}
          >
            <p className="text-2xl mb-1">{roundOver.winner ? '🎉' : '⏱️'}</p>
            <p className="font-black text-base text-white">
              {roundOver.winner
                ? `${roundOver.winner === 1 ? p1 : p2} acertou a rodada!`
                : 'Tentativas esgotadas!'}
            </p>
            <p className="text-slate-400 text-xs mt-1">
              {round < TOTAL_ROUNDS_VS ? `Próxima: Rodada ${round + 1}/${TOTAL_ROUNDS_VS}` : 'Última rodada!'}
            </p>
            <button
              onClick={handleAvançar}
              disabled={roundOver.advancing}
              className="mt-4 px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 transition hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1, #f97316)' }}
            >
              {roundOver.advancing ? 'Aguarde...' : round >= TOTAL_ROUNDS_VS ? 'Ver resultado final' : `Rodada ${round + 1} →`}
            </button>
          </div>
        )}

        {/* Feedback from last guess */}
        {lastPalpite && !isRoundOver && (
          <div
            className="rounded-2xl p-4 text-center border"
            style={{ background: feedbackBg(lastPalpite.feedback), borderColor: feedbackBorder(lastPalpite.feedback) }}
          >
            <p className="font-black text-xl" style={{ color: feedbackTextColor(lastPalpite.feedback) }}>
              {feedbackLabel(lastPalpite.feedback)}
            </p>
            <p className="text-slate-400 text-sm mt-1">{direcaoLabel(lastPalpite.direcao)}</p>
          </div>
        )}

        {/* Input */}
        {!isRoundOver && (
          <form onSubmit={enviarPalpite} className="flex gap-3">
            <input
              ref={inputRef}
              type="number"
              min={1}
              max={RANGE_MAX[dificuldade]}
              value={palpite}
              onChange={(e) => setPalpite(e.target.value)}
              placeholder={RANGE_LABEL[dificuldade]}
              disabled={loading}
              className="flex-1 rounded-xl px-5 py-4 text-center text-xl font-black text-white focus:outline-none transition"
              style={{
                background: jogadorAtual === 1 ? 'rgba(99,102,241,0.15)' : 'rgba(154,52,18,0.25)',
                border: `1.5px solid ${jogadorAtual === 1 ? 'rgba(168,85,247,0.5)' : 'rgba(249,115,22,0.5)'}`,
              }}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !palpite}
              className="px-5 py-4 rounded-xl font-black text-white text-sm disabled:opacity-40 transition hover:opacity-90 active:scale-95 whitespace-nowrap"
              style={{ background: corAtual }}
            >
              {loading ? '...' : 'Tentar!'}
            </button>
          </form>
        )}

        {erro && <p className="text-red-400 text-xs text-center">{erro}</p>}

        {/* Historical */}
        {historico.length > (lastPalpite && !isRoundOver ? 1 : 0) && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Histórico</p>
            <div className="flex flex-wrap gap-2">
              {(lastPalpite && !isRoundOver ? historico.slice(1) : historico).map((p, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border"
                  style={{
                    background: p.jogador === 1 ? 'rgba(168,85,247,0.15)' : 'rgba(249,115,22,0.15)',
                    borderColor: p.jogador === 1 ? 'rgba(168,85,247,0.35)' : 'rgba(249,115,22,0.35)',
                    color: p.jogador === 1 ? '#c084fc' : '#fb923c',
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: p.jogador === 1 ? P1_COLOR : P2_COLOR }} />
                  {p.direcao === 'higher' ? '↑' : p.direcao === 'lower' ? '↓' : '✓'} {p.valor}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── SOLO GAME ────────────────────────────────────────────────────────────────

function SoloGame({ gameId, dificuldade, p1, apiUrl, onBack, onOpenRanking, onNovoJogo }: GameProps) {
  const [palpite, setPalpite] = useState('');
  const [historico, setHistorico] = useState<Palpite[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingNovo, setLoadingNovo] = useState(false);
  const [erro, setErro] = useState('');
  const [ganhou, setGanhou] = useState(false);
  const [perdeu, setPerdeu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxTentativas = MAX_TENTATIVAS_SOLO[dificuldade];
  const tentativasUsadas = historico.length;
  const restantes = maxTentativas - tentativasUsadas;
  const progresso = tentativasUsadas / maxTentativas;
  const lastPalpite = historico[0];
  const { bg: difBg, btn: difBtn } = DIF_COLOR[dificuldade];

  useEffect(() => {
    if (!ganhou && !perdeu) inputRef.current?.focus();
  }, [ganhou, perdeu]);

  const enviarPalpite = async (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseInt(palpite, 10);
    const max = RANGE_MAX[dificuldade];
    if (isNaN(valor) || valor < 1 || valor > max) {
      setErro(`Digite um número entre 1 e ${max}`);
      return;
    }
    setErro('');
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/games/${gameId}/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: valor }),
      });
      const dados = await res.json();
      if (dados.message) { setErro(dados.message); setLoading(false); return; }

      const novo: Palpite = {
        valor,
        feedback: dados.feedback,
        direcao: dados.direction as Direcao,
        jogador: 1,
      };
      const novoHistorico = [novo, ...historico];
      setHistorico(novoHistorico);
      setPalpite('');

      if (dados.direction === 'correct') { setGanhou(true); return; }
      if (novoHistorico.length >= maxTentativas) { setPerdeu(true); return; }
    } catch {
      setErro('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleNovoJogo = async () => {
    setLoadingNovo(true);
    setHistorico([]);
    setGanhou(false);
    setPerdeu(false);
    setPalpite('');
    setErro('');
    try {
      await onNovoJogo();
    } finally {
      setLoadingNovo(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className={`${difBg} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
          {DIF_LABEL[dificuldade]}: {RANGE_LABEL[dificuldade]}
        </span>
        <button
          onClick={handleNovoJogo}
          disabled={loadingNovo}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-full transition disabled:opacity-50"
        >
          {loadingNovo ? '...' : '🔄 Novo jogo'}
        </button>
      </div>

      <main className="flex-1 flex flex-col items-center justify-start px-4 pb-8 max-w-lg mx-auto w-full gap-4 pt-4">

        {/* Main card */}
        <div className="w-full bg-[#131d31] border border-white/10 rounded-2xl p-6">
          {ganhou ? (
            <div className="text-center py-2">
              <div className="text-4xl mb-3">🎉</div>
              <p className="font-black text-xl text-emerald-400">Você acertou!</p>
              <p className="text-slate-400 text-sm mt-1">Em {tentativasUsadas} tentativa{tentativasUsadas !== 1 ? 's' : ''}</p>
              <button
                onClick={handleNovoJogo}
                className={`mt-5 px-6 py-3 rounded-xl font-bold text-white text-sm transition hover:opacity-90 ${difBtn}`}
              >
                🔄 Jogar novamente
              </button>
            </div>
          ) : perdeu ? (
            <div className="text-center py-2">
              <div className="text-4xl mb-3">😔</div>
              <p className="font-black text-xl text-red-400">Você perdeu!</p>
              <p className="text-slate-400 text-sm mt-1">Tentativas esgotadas</p>
              <button
                onClick={handleNovoJogo}
                className={`mt-5 px-6 py-3 rounded-xl font-bold text-white text-sm transition hover:opacity-90 ${difBtn}`}
              >
                🔄 Tentar novamente
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-5">
                <span className="text-3xl">🤔</span>
                <h2 className="font-black text-lg text-white mt-2">Qual é o número secreto?</h2>
                <p className="text-slate-400 text-sm">Entre {RANGE_LABEL[dificuldade]}</p>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
                  <span>{tentativasUsadas} tentativas</span>
                  <span>{restantes} restantes</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${progresso * 100}%`,
                      background: restantes <= 2 ? '#ef4444' : restantes <= 4 ? '#f97316' : '#6366f1',
                    }}
                  />
                </div>
              </div>

              {/* Feedback */}
              {lastPalpite && 
              (
                <div
                  className="rounded-xl p-3 text-center border mb-4"
                  style={{ background: feedbackBg(lastPalpite.feedback), borderColor: feedbackBorder(lastPalpite.feedback) }}
                >
                  <p className="font-black text-base" style={{ color: feedbackTextColor(lastPalpite.feedback) }}>
                    {feedbackLabel(lastPalpite.feedback)}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">{direcaoLabel(lastPalpite.direcao)}</p>
                </div>
              )}

              {/* Input + button */}
              <form onSubmit={enviarPalpite} className="flex gap-3">
                <input
                  ref={inputRef}
                  type="number"
                  min={1}
                  max={RANGE_MAX[dificuldade]}
                  value={palpite}
                  onChange={(e) => setPalpite(e.target.value)}
                  placeholder={RANGE_LABEL[dificuldade]}
                  disabled={loading}
                  className="flex-1 bg-white/5 border border-white/15 focus:border-indigo-500 rounded-xl px-4 py-3.5 text-center text-xl font-black text-white focus:outline-none transition"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={loading || !palpite}
                  className={`px-5 py-3.5 rounded-xl font-black text-white text-sm disabled:opacity-40 transition hover:opacity-90 active:scale-95 ${difBtn}`}
                >
                  {loading ? '...' : 'Tentar!'}
                </button>
              </form>

              {erro && <p className="text-red-400 text-xs text-center mt-2">{erro}</p>}
            </>
          )}
        </div>

        {/* Historical */}
        {historico.length > 0 && 
        (
          <div className="w-full">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Histórico</p>
            <div className="flex flex-wrap gap-2">
              {historico.map((p, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold border"
                  style={{
                    background: feedbackBg(p.feedback),
                    borderColor: feedbackBorder(p.feedback),
                    color: feedbackTextColor(p.feedback),
                  }}
                >
                  {p.direcao === 'higher' ? '↑' : p.direcao === 'lower' ? '↓' : '✓'} {p.valor}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export function Game(props: GameProps) 
{
  return props.modo === 'vs' ? <VsGame {...props} /> : <SoloGame {...props} />;
}
