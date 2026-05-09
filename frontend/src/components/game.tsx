import { useState, useRef, useEffect } from 'react';
import type { Dificuldade, Modo, Palpite, Direcao } from '../types';
import {
  RANGE_LABEL, DIF_LABEL, DIF_COLOR,
  MAX_TENTATIVAS_SOLO, MAX_TENTATIVAS_VS, TOTAL_ROUNDS_VS, RANGE_MAX,
  MEMORIA_GRID,
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

const BG = 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.10) 0%, transparent 55%), linear-gradient(180deg, #020818 0%, #0a0f1e 100%)';

const P1_COLOR = '#a855f7';
const P2_COLOR = '#f97316';

function direcaoLabel(d: Direcao): string
{
  if (d === 'higher') return '⬆️ Frequência mais alta!';
  if (d === 'lower')  return '⬇️ Frequência mais baixa!';
  return '📡 Sinal estabelecido!';
}

function feedbackLabel(fb: string): string
{
  if (fb.includes('acertou')) return '📡 Sinal estabelecido! Resgate a caminho!';
  if (fb.includes('pegando fogo')) return '🔭 Frequência muito próxima!';
  if (fb.includes('quente')) return '📶 Sinal detectado!';
  if (fb.includes('morno')) return '🌌 Interferência estática...';
  if (fb.includes('frio')) return '🔇 Sem sinal no espaço...';
  return fb;
}

function feedbackBg(fb: string): string 
{
  if (fb.includes('acertou')) return 'rgba(34,197,94,0.12)';
  if (fb.includes('pegando fogo')) return 'rgba(234,88,12,0.15)';
  if (fb.includes('quente')) return 'rgba(245,158,11,0.12)';
  if (fb.includes('morno')) return 'rgba(234,179,8,0.10)';
  if (fb.includes('frio')) return 'rgba(59,130,246,0.12)';
  return 'rgba(255,255,255,0.05)';
}

function feedbackBorder(fb: string): string 
{
  if (fb.includes('acertou')) return 'rgba(34,197,94,0.35)';
  if (fb.includes('pegando fogo')) return 'rgba(234,88,12,0.35)';
  if (fb.includes('quente')) return 'rgba(245,158,11,0.35)';
  if (fb.includes('morno')) return 'rgba(234,179,8,0.30)';
  if (fb.includes('frio')) return 'rgba(59,130,246,0.35)';
  return 'rgba(255,255,255,0.1)';
}

function feedbackTextColor(fb: string): string 
{
  if (fb.includes('acertou')) return '#4ade80';
  if (fb.includes('pegando fogo')) return '#fb923c';
  if (fb.includes('quente')) return '#fbbf24';
  if (fb.includes('morno')) return '#facc15';
  if (fb.includes('frio')) return '#93c5fd';
  return '#e2e8f0';
}


function GameHeader({ onBack, onOpenRanking }: { onBack: () => void; onOpenRanking: () => void }) 
{
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-white/5">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-300 px-4 py-2 rounded-full transition"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
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

  useEffect
(() => 
    {
      if (!roundOver) 
          inputRef.current?.focus();
    }, [jogadorAtual, roundOver]
);

  const enviarPalpite = async (e: React.FormEvent) => 
  {
    e.preventDefault();
    const valor = parseInt(palpite, 10);
    const max = RANGE_MAX[dificuldade];
    if 
      (isNaN(valor) || valor < 1 || valor > max) 
    {
      setErro(`Digite um número entre 1 e ${max}`);
      return;
    }
    setErro('');
    setLoading(true);

    try 
    {
      const resposta = await fetch
    (`${apiUrl}/api/games/${gameId}/guess`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: valor }),
      }
    );
      const dados = await resposta.json();
      if (dados.message) 
        { setErro(dados.message); setLoading(false); return; }

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
    } 
    catch 
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

  const displayScore = {
    p1: score.p1 + (roundOver?.winner === 1 ? 1 : 0),
    p2: score.p2 + (roundOver?.winner === 2 ? 1 : 0),
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Scoreboard */}
      <div className="flex items-center gap-2 px-5 py-3 flex-wrap">
        <span className="text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.25)' }}>
          📡 Rodada {round}/{TOTAL_ROUNDS_VS}
        </span>
        <span className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(6,182,212,0.12)', borderColor: 'rgba(6,182,212,0.35)', color: '#67e8f9' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#06b6d4' }} />
          {p1} &nbsp;<span className="text-white">{displayScore.p1}</span>
        </span>
        <span className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(99,102,241,0.12)', borderColor: 'rgba(99,102,241,0.35)', color: '#a5b4fc' }}>
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          {p2} &nbsp;<span className="text-white">{displayScore.p2}</span>
        </span>
      </div>

      <main className="flex-1 flex flex-col gap-4 px-4 pb-8 max-w-lg mx-auto w-full">

        {/* Turn card */}
        {!isRoundOver && 
        (
          <div
            className="rounded-2xl p-5 text-center border transition-all"
            style={{
              background: jogadorAtual === 1 ? 'rgba(6,182,212,0.10)' : 'rgba(99,102,241,0.12)',
              borderColor: jogadorAtual === 1 ? 'rgba(6,182,212,0.40)' : 'rgba(99,102,241,0.40)',
            }}
          >
            <p className="font-black text-lg flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: corAtual }} />
              <span style={{ color: corAtual }}>📡 Turno de {nomeAtual}!</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">
              {RANGE_LABEL[dificuldade]} · {tentativasUsadas}/{maxTentativas} tentativas usadas
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
            <p className="text-2xl mb-1">{roundOver.winner ? '📡' : '🔇'}</p>
            <p className="font-black text-base text-white">
              {roundOver.winner
                ? `${roundOver.winner === 1 ? p1 : p2} sintonizou a frequência!`
                : 'Sinal perdido — tentativas esgotadas!'}
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
              {roundOver.advancing ? 'Aguarde...' : round >= TOTAL_ROUNDS_VS ? '🛸 Ver resultado da missão' : `Rodada ${round + 1} →`}
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
        {historico.length > (lastPalpite && !isRoundOver ? 1 : 0) && 
        (
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

// ─── SAVE RANKING PANEL ───────────────────────────────────────────────────────

interface SaveRankingPanelProps 
{
  gameId: string;
  saveNome: string;
  setSaveNome: (v: string) => void;
  saving: boolean;
  savedPosition: { position: number; total: number } | null;
  saveErro: string;
  onSalvar: (e: React.FormEvent) => void;
  onOpenRanking: () => void;
}

function SaveRankingPanel({ saveNome, setSaveNome, saving, savedPosition, saveErro, onSalvar, onOpenRanking }: SaveRankingPanelProps)
{
  if (savedPosition) 
  {
    return (
      <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center">
        <p className="text-amber-300 font-bold text-sm">
          🏆 #{savedPosition.position} de {savedPosition.total} jogadores!
        </p>
        <button
          onClick={onOpenRanking}
          className="mt-2 text-xs text-amber-400 underline underline-offset-2 hover:text-amber-300 transition"
        >
          Ver ranking completo →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSalvar} className="mt-4">
      <p className="text-slate-400 text-xs mb-2">Salvar resultado no ranking:</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={saveNome}
          onChange={(e) => setSaveNome(e.target.value)}
          placeholder="Seu apelido"
          maxLength={30}
          className="flex-1 bg-white/5 border border-white/15 focus:border-amber-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none transition"
        />
        <button
          type="submit"
          disabled={saving || !saveNome.trim()}
          className="px-4 py-2 rounded-xl font-bold text-xs text-white disabled:opacity-40 transition hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
        >
          {saving ? '...' : '💾 Salvar'}
        </button>
      </div>
      {saveErro && <p className="text-red-400 text-xs mt-1">{saveErro}</p>}
    </form>
  );
}

// ─── SOLO GAME ────────────────────────────────────────────────────────────────

function SoloGame({ gameId, dificuldade, apiUrl, onBack, onOpenRanking, onNovoJogo }: GameProps) 
{
  const [palpite, setPalpite] = useState('');
  const [historico, setHistorico] = useState<Palpite[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingNovo, setLoadingNovo] = useState(false);
  const [erro, setErro] = useState('');
  const [ganhou, setGanhou] = useState(false);
  const [perdeu, setPerdeu] = useState(false);
  const [saveNome, setSaveNome] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedPosition, setSavedPosition] = useState<{ position: number; total: number } | null>(null);
  const [saveErro, setSaveErro] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const maxTentativas = MAX_TENTATIVAS_SOLO[dificuldade];
  const tentativasUsadas = historico.length;
  const restantes = maxTentativas - tentativasUsadas;
  const progresso = tentativasUsadas / maxTentativas;
  const lastPalpite = historico[0];
  const { bg: difBg, btn: difBtn } = DIF_COLOR[dificuldade];

  useEffect(() => 
    {
      if (!ganhou && !perdeu) inputRef.current?.focus();
    }, [ganhou, perdeu]);

  const enviarPalpite = async (e: React.FormEvent) => 
  {
    e.preventDefault();
    const valor = parseInt(palpite, 10);
    const max = RANGE_MAX[dificuldade];
    if (isNaN(valor) || valor < 1 || valor > max) {
      setErro(`Digite um número entre 1 e ${max}`);
      return;
    }
    setErro('');
    setLoading(true);

    try 
    {
      const res = await fetch(`${apiUrl}/api/games/${gameId}/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: valor }),
      });

      const dados = await res.json();
      if (dados.message) 
        { setErro(dados.message); setLoading(false); return; }

      const novo: Palpite = 
      {
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
    } 
    catch 
    {
      setErro('Erro de conexão');
    } 
    finally 
    {
      setLoading(false);
    }
  };

  const handleNovoJogo = async () => 
  {
    setLoadingNovo(true);
    setHistorico([]);
    setGanhou(false);
    setPerdeu(false);
    setPalpite('');
    setErro('');
    setSaveNome('');
    setSavedPosition(null);
    setSaveErro('');
    try 
    {
      await onNovoJogo();
    } 
    finally 
    {
      setLoadingNovo(false);
    }
  };

  const handleSalvar = async (e: React.FormEvent) => 
  {
    e.preventDefault();
    const nome = saveNome.trim();
    if (!nome) { setSaveErro('Digite um apelido'); return; }
    setSaving(true);
    setSaveErro('');
    try 
    {
      const res = await fetch(`${apiUrl}/api/games/${gameId}/save`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome }),
      });
      const data = await res.json();
      if (data.position != null) 
      {
        setSavedPosition({ position: data.position, total: data.total });
      } 
      else 
      {
        setSaveErro('Não foi possível salvar. Tente novamente.');
      }
    } 
    catch 
    {
      setSaveErro('Erro de conexão');
    } 
    finally 
    {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className={`${difBg} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
          {DIF_LABEL[dificuldade]} · {RANGE_LABEL[dificuldade]}
        </span>
        <button
          onClick={handleNovoJogo}
          disabled={loadingNovo}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-full transition disabled:opacity-50"
        >
          {loadingNovo ? '...' : '🔄 Nova missão'}
        </button>
      </div>

      <main className="flex-1 flex flex-col items-center justify-start px-4 pb-8 max-w-lg mx-auto w-full gap-4 pt-4">

        {/* Main card */}
        <div className="w-full border border-white/10 rounded-2xl p-6" style={{ background: '#080f1e' }}>
          {ganhou ? (
            <div className="text-center py-2">
              <div className="text-4xl mb-3">📡</div>
              <p className="font-black text-xl text-cyan-400">Resgate confirmado!</p>
              <p className="text-slate-400 text-sm mt-1">Em {tentativasUsadas} tentativa{tentativasUsadas !== 1 ? 's' : ''}</p>
              <button
                onClick={handleNovoJogo}
                className={`mt-5 px-6 py-3 rounded-xl font-bold text-white text-sm transition hover:opacity-90 ${difBtn}`}
              >
                🔄 Nova missão
              </button>
              <SaveRankingPanel
                gameId={gameId}
                saveNome={saveNome}
                setSaveNome={setSaveNome}
                saving={saving}
                savedPosition={savedPosition}
                saveErro={saveErro}
                onSalvar={handleSalvar}
                onOpenRanking={onOpenRanking}
              />
            </div>
          ) : perdeu ? (
            <div className="text-center py-2">
              <div className="text-4xl mb-3">🔇</div>
              <p className="font-black text-xl text-red-400">Sinal perdido!</p>
              <p className="text-slate-400 text-sm mt-1">Frequências esgotadas</p>
              <button
                onClick={handleNovoJogo}
                className={`mt-5 px-6 py-3 rounded-xl font-bold text-white text-sm transition hover:opacity-90 ${difBtn}`}
              >
                🔄 Tentar novamente
              </button>
              <SaveRankingPanel
                gameId={gameId}
                saveNome={saveNome}
                setSaveNome={setSaveNome}
                saving={saving}
                savedPosition={savedPosition}
                saveErro={saveErro}
                onSalvar={handleSalvar}
                onOpenRanking={onOpenRanking}
              />
            </div>
          ) : (
            <>
              <div className="text-center mb-5">
                <span className="text-3xl">📡</span>
                <h2 className="font-black text-lg text-white mt-2">Qual é a frequência de resgate?</h2>
                <p className="text-slate-400 text-sm">{RANGE_LABEL[dificuldade]}</p>
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
                      background: restantes <= 2 ? '#ef4444' : restantes <= 4 ? '#f97316' : '#06b6d4',
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

// ─── MEMORIA GAME ─────────────────────────────────────────────────────────────

function MemoriaGame({ gameId, dificuldade, p1, apiUrl, onBack, onOpenRanking, onNovoJogo }: GameProps)
{
  const { cols, rows, label, pairs: totalPairs } = MEMORIA_GRID[dificuldade];
  const totalCards = cols * rows;

  const gerarCartas = () =>
  {
    const nums = Array.from({ length: totalPairs }, (_, i) => i + 1);
    const pares = [...nums, ...nums];
    for (let i = pares.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    return pares;
  };

  const [cartas, setCartas] = useState<number[]>(() => gerarCartas());
  const [reveladas, setReveladas] = useState<Set<number>>(new Set());
  const [viradas, setViradas] = useState<number[]>([]);
  const [erros, setErros] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [ganhou, setGanhou] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [iniciou, setIniciou] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [saveNome, setSaveNome] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedPosition, setSavedPosition] = useState<{ position: number; total: number } | null>(null);
  const [saveErro, setSaveErro] = useState('');
  const finishCalledRef = useRef(false);

  useEffect(() => 
  {
    if (iniciou && !ganhou) 
    {
      timerRef.current = setInterval(() => setTempo((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [iniciou, ganhou]);

  const paresEncontrados = reveladas.size / 2;

  const handleClique = (idx: number) => 
  {
    if (bloqueado || viradas.includes(idx) || reveladas.has(idx) || ganhou) return;
    if (!iniciou) setIniciou(true);

    const novasViradas = [...viradas, idx];
    setViradas(novasViradas);

    if (novasViradas.length === 2) 
    {
      setBloqueado(true);
      const [a, b] = novasViradas;
      if (cartas[a] === cartas[b]) 
      {
        const novasReveladas = new Set(reveladas);
        novasReveladas.add(a);
        novasReveladas.add(b);
        setReveladas(novasReveladas);
        setViradas([]);
        setBloqueado(false);
        if (novasReveladas.size === totalCards)
        {
          setGanhou(true);
          clearInterval(timerRef.current);
          if (!finishCalledRef.current)
          {
            finishCalledRef.current = true;
            fetch(`${apiUrl}/api/games/${gameId}/finish`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ won: true }),
            }).catch(() => {});
          }
        }
      } 
      else 
      {
        setErros((e) => e + 1);
        setTimeout(() => 
        {
          setViradas([]);
          setBloqueado(false);
        }, 900);
      }
    }
  };

  const handleNovo = async () =>
  {
    clearInterval(timerRef.current);
    setCartas(gerarCartas());
    setReveladas(new Set());
    setViradas([]);
    setErros(0);
    setBloqueado(false);
    setGanhou(false);
    setTempo(0);
    setIniciou(false);
    setSaveNome('');
    setSaving(false);
    setSavedPosition(null);
    setSaveErro('');
    finishCalledRef.current = false;
    await onNovoJogo();
  };

  const handleSalvar = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    const nome = saveNome.trim();
    if (!nome) { setSaveErro('Digite um apelido'); return; }
    setSaving(true);
    setSaveErro('');
    try
    {
      const res = await fetch(`${apiUrl}/api/games/${gameId}/save`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome }),
      });
      const data = await res.json();
      if (data.position != null)
        setSavedPosition({ position: data.position, total: data.total });
      else
        setSaveErro('Não foi possível salvar. Tente novamente.');
    }
    catch
    {
      setSaveErro('Erro de conexão');
    }
    finally
    {
      setSaving(false);
    }
  };

  const formatTempo = (s: number) => 
  {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Stats bar */}
      <div className="flex items-center gap-2 px-5 py-3 flex-wrap">
        <span className="bg-white/10 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full">
          ⏱ {formatTempo(tempo)}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(6,182,212,0.15)', borderColor: 'rgba(6,182,212,0.4)', color: '#67e8f9' }}>
          🌕 {paresEncontrados}/{totalPairs} coordenadas
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={erros > 0
            ? { background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.35)', color: '#f87171' }
            : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>
          ❌ {erros} erro{erros !== 1 ? 's' : ''}
        </span>
        <span className="bg-white/5 border border-white/10 text-slate-400 text-xs font-bold px-3 py-1.5 rounded-full ml-auto">
          {label}
        </span>
      </div>

      {/* Win banner */}
      {ganhou && 
      (
        <div className="mx-4 mb-2 rounded-2xl p-5 text-center border"
          style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.35)' }}>
          <p className="text-3xl mb-2">🛸</p>
          <p className="font-black text-lg text-cyan-400">Missão cumprida, {p1}!</p>
          <p className="text-slate-400 text-sm mt-1">
            {formatTempo(tempo)} &nbsp;·&nbsp; {erros} erro{erros !== 1 ? 's' : ''} &nbsp;·&nbsp; {totalPairs} coordenadas
          </p>
          <button
            onClick={handleNovo}
            className="mt-4 px-6 py-2.5 rounded-xl font-bold text-white text-sm transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #0284c7, #06b6d4)' }}
          >
            🔄 Nova missão
          </button>
          <SaveRankingPanel
            gameId={gameId}
            saveNome={saveNome}
            setSaveNome={setSaveNome}
            saving={saving}
            savedPosition={savedPosition}
            saveErro={saveErro}
            onSalvar={handleSalvar}
            onOpenRanking={onOpenRanking}
          />
        </div>
      )}

      {/* Grid */}
      <main className="flex-1 px-4 pb-8 flex items-start justify-center pt-2">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: cols >= 6 ? '6px' : '10px',
            maxWidth: cols >= 6 ? '480px' : '380px',
            width: '100%',
          }}
        >
          {cartas.map((num, idx) => {
            const isVirada = viradas.includes(idx);
            const isRevelada = reveladas.has(idx);
            const mostrar = isVirada || isRevelada;
            return (
              <button
                key={idx}
                onClick={() => handleClique(idx)}
                className="transition-all duration-150 active:scale-90 rounded-xl flex items-center justify-center font-black select-none"
                style={{
                  aspectRatio: '1',
                  fontSize: cols >= 6 ? '13px' : '18px',
                  background: isRevelada
                    ? 'rgba(16,185,129,0.22)'
                    : isVirada
                    ? 'rgba(99,102,241,0.35)'
                    : '#1a2d45',
                  border: isRevelada
                    ? '1.5px solid rgba(16,185,129,0.5)'
                    : isVirada
                    ? '1.5px solid rgba(99,102,241,0.6)'
                    : '1.5px solid rgba(255,255,255,0.07)',
                  color: isRevelada ? '#4ade80' : isVirada ? '#a5b4fc' : 'transparent',
                  cursor: isRevelada || ganhou ? 'default' : 'pointer',
                  transform: mostrar ? 'scale(1)' : 'scale(1)',
                }}
              >
                {mostrar
                  ? num
                  : <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: cols >= 6 ? '11px' : '14px' }}>?</span>
                }
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ─── VS RESULT SCREEN ─────────────────────────────────────────────────────────

interface VsResultScreenProps
{
  p1: string;
  p2: string;
  finalScore: { p1: number; p2: number };
  vsRoundResults: { gameId: string; winner: 1 | 2 | null }[];
  apiUrl: string;
  onJogarNovamente: () => void;
  onVoltarHome: () => void;
  onOpenRanking: () => void;
}

export function VsResultScreen({ p1, p2, finalScore, vsRoundResults, apiUrl, onJogarNovamente, onVoltarHome, onOpenRanking }: VsResultScreenProps)
{
  const vencedor =
    finalScore.p1 > finalScore.p2 ? p1 :
    finalScore.p2 > finalScore.p1 ? p2 : null;

  const gameIdP1 = vsRoundResults.find((r) => r.winner === 1)?.gameId ?? vsRoundResults[0]?.gameId ?? '';
  const p2Fallback = vsRoundResults.find((r) => r.gameId !== gameIdP1);
  const gameIdP2 = vsRoundResults.find((r) => r.winner === 2)?.gameId ?? p2Fallback?.gameId ?? vsRoundResults[1]?.gameId ?? '';

  const [saveNomeP1, setSaveNomeP1] = useState('');
  const [savingP1, setSavingP1] = useState(false);
  const [savedPositionP1, setSavedPositionP1] = useState<{ position: number; total: number } | null>(null);
  const [saveErroP1, setSaveErroP1] = useState('');

  const [saveNomeP2, setSaveNomeP2] = useState('');
  const [savingP2, setSavingP2] = useState(false);
  const [savedPositionP2, setSavedPositionP2] = useState<{ position: number; total: number } | null>(null);
  const [saveErroP2, setSaveErroP2] = useState('');

  const handleSalvarP1 = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    const nome = saveNomeP1.trim();
    if (!nome) { setSaveErroP1('Digite um apelido'); return; }
    if (!gameIdP1) { setSaveErroP1('Nenhuma partida disponível'); return; }
    setSavingP1(true);
    setSaveErroP1('');
    try
    {
      const res = await fetch(`${apiUrl}/api/games/${gameIdP1}/save`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome }),
      });
      const data = await res.json();
      if (data.position != null)
        setSavedPositionP1({ position: data.position, total: data.total });
      else
        setSaveErroP1('Não foi possível salvar. Tente novamente.');
    }
    catch
    {
      setSaveErroP1('Erro de conexão');
    }
    finally
    {
      setSavingP1(false);
    }
  };

  const handleSalvarP2 = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    const nome = saveNomeP2.trim();
    if (!nome) { setSaveErroP2('Digite um apelido'); return; }
    if (!gameIdP2) { setSaveErroP2('Nenhuma partida disponível'); return; }
    setSavingP2(true);
    setSaveErroP2('');
    try
    {
      const res = await fetch(`${apiUrl}/api/games/${gameIdP2}/save`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome }),
      });
      const data = await res.json();
      if (data.position != null)
        setSavedPositionP2({ position: data.position, total: data.total });
      else
        setSaveErroP2('Não foi possível salvar. Tente novamente.');
    }
    catch
    {
      setSaveErroP2('Erro de conexão');
    }
    finally
    {
      setSavingP2(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-sm w-full bg-[#131d31] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
        <div className="text-5xl mb-4">{vencedor ? '👨‍🚀' : '🤝'}</div>
        <h2 className="text-2xl font-black text-white mb-1">
          {vencedor ? `${vencedor} conquistou a missão!` : 'Missão empatada!'}
        </h2>
        <p className="text-slate-400 text-sm mb-6">Resultado final após {TOTAL_ROUNDS_VS} rodadas</p>

        {/* Score */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 rounded-2xl p-4"
            style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.30)' }}>
            <div className="text-center text-lg mb-1">👨‍🚀</div>
            <p className="text-xs text-slate-400 truncate text-center">{p1}</p>
            <p className="text-3xl font-black text-center" style={{ color: '#06b6d4' }}>{finalScore.p1}</p>
          </div>
          <div className="flex-1 rounded-2xl p-4"
            style={{ background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.30)' }}>
            <div className="text-center text-lg mb-1">🚀</div>
            <p className="text-xs text-slate-400 truncate text-center">{p2}</p>
            <p className="text-3xl font-black text-center text-indigo-400">{finalScore.p2}</p>
          </div>
        </div>

        {/* Save panels por jogador */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="rounded-xl p-3 text-left" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.20)' }}>
            <p className="text-xs font-bold mb-2" style={{ color: '#67e8f9' }}>
              👨‍🚀 {p1}
            </p>
            <SaveRankingPanel
              gameId={gameIdP1}
              saveNome={saveNomeP1}
              setSaveNome={setSaveNomeP1}
              saving={savingP1}
              savedPosition={savedPositionP1}
              saveErro={saveErroP1}
              onSalvar={handleSalvarP1}
              onOpenRanking={onOpenRanking}
            />
          </div>
          <div className="rounded-xl p-3 text-left" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.20)' }}>
            <p className="text-xs font-bold text-indigo-300 mb-2">
              🚀 {p2}
            </p>
            <SaveRankingPanel
              gameId={gameIdP2}
              saveNome={saveNomeP2}
              setSaveNome={setSaveNomeP2}
              saving={savingP2}
              savedPosition={savedPositionP2}
              saveErro={saveErroP2}
              onSalvar={handleSalvarP2}
              onOpenRanking={onOpenRanking}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onJogarNovamente}
            className="w-full py-3 rounded-xl font-bold text-sm text-white transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #0284c7, #06b6d4)', boxShadow: '0 4px 16px rgba(6,182,212,0.30)' }}
          >
            📡 Nova Missão
          </button>
          <button
            onClick={onVoltarHome}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-semibold text-sm text-slate-300 transition"
          >
            🏠 Menu Principal
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export function Game(props: GameProps)
{
  if (props.modo === 'vs') return <VsGame {...props} />;
  if (props.modo === 'memoria') return <MemoriaGame {...props} />;
  return <SoloGame {...props} />;
}
