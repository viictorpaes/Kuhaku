import { useState, useRef, useEffect } from 'react';
import type { Dificuldade, Modo, Palpite, Direcao } from '../types';
import
{
  RANGE_LABEL, DIF_LABEL, DIF_COLOR,
  MAX_TENTATIVAS_SOLO, MAX_TENTATIVAS_VS, TOTAL_ROUNDS_VS, RANGE_MAX,
  MEMORIA_GRID, LOGICA_CONFIG, PARENTESES_CONFIG,
} from '../constants';

// ─── MOTOR DE LÓGICA PROPOSICIONAL ────────────────────────────────────────────

type Expr =
  | { tipo: 'atomo'; nome: 'P' | 'Q' | 'R' }
  | { tipo: 'nao'; expr: Expr }
  | { tipo: 'e' | 'ou' | 'implica' | 'sse'; esq: Expr; dir: Expr };

type Vals = { P: boolean; Q: boolean; R: boolean };

function avaliar(e: Expr, v: Vals): boolean {
  switch (e.tipo) {
    case 'atomo':   return v[e.nome];
    case 'nao':     return !avaliar(e.expr, v);
    case 'e':       return avaliar(e.esq, v) && avaliar(e.dir, v);
    case 'ou':      return avaliar(e.esq, v) || avaliar(e.dir, v);
    case 'implica': return !avaliar(e.esq, v) || avaliar(e.dir, v);
    case 'sse':     return avaliar(e.esq, v) === avaliar(e.dir, v);
  }
}

type Classificacao = 'TAUTOLOGIA' | 'CONTRADIÇÃO' | 'CONTINGÊNCIA';

function classificar(e: Expr): Classificacao {
  let temVerd = false, temFalso = false;
  for (const P of [false, true])
    for (const Q of [false, true])
      for (const R of [false, true]) {
        if (avaliar(e, { P, Q, R })) temVerd = true;
        else temFalso = true;
      }
  if (!temFalso) return 'TAUTOLOGIA';
  if (!temVerd)  return 'CONTRADIÇÃO';
  return 'CONTINGÊNCIA';
}

// ── construtores ──────────────────────────────────────────────────────────────
const P: Expr = { tipo: 'atomo', nome: 'P' };
const Q: Expr = { tipo: 'atomo', nome: 'Q' };
const R: Expr = { tipo: 'atomo', nome: 'R' };
const NAO  = (x: Expr): Expr                 => ({ tipo: 'nao',     expr: x    });
const E    = (l: Expr, r: Expr): Expr        => ({ tipo: 'e',       esq: l, dir: r });
const OU   = (l: Expr, r: Expr): Expr        => ({ tipo: 'ou',      esq: l, dir: r });
const IMP  = (l: Expr, r: Expr): Expr        => ({ tipo: 'implica', esq: l, dir: r });
const SSE  = (l: Expr, r: Expr): Expr        => ({ tipo: 'sse',     esq: l, dir: r });

// ── banco de questões ─────────────────────────────────────────────────────────
interface ModeloQuestao {
  formula: string;
  expr: Expr;
  usaR: boolean;
  topico: string;
  conectivos: string;
}

const MODELOS: ModeloQuestao[] = [
  // FÁCIL — P, Q com ∧ ∨ ¬
  { formula: 'P ∧ Q',      expr: E(P,Q),             usaR: false, topico: 'Conjunção (∧)',                 conectivos: '∧' },
  { formula: 'P ∨ Q',      expr: OU(P,Q),             usaR: false, topico: 'Disjunção (∨)',                 conectivos: '∨' },
  { formula: '¬P',          expr: NAO(P),              usaR: false, topico: 'Negação (¬)',                   conectivos: '¬' },
  { formula: '¬Q',          expr: NAO(Q),              usaR: false, topico: 'Negação (¬)',                   conectivos: '¬' },
  { formula: '¬P ∧ Q',      expr: E(NAO(P),Q),        usaR: false, topico: 'Conjunção com Negação',         conectivos: '∧ ¬' },
  { formula: 'P ∨ ¬Q',      expr: OU(P,NAO(Q)),       usaR: false, topico: 'Disjunção com Negação',         conectivos: '∨ ¬' },
  { formula: '¬P ∨ ¬Q',     expr: OU(NAO(P),NAO(Q)),  usaR: false, topico: 'Disjunção de Negações',         conectivos: '∨ ¬' },
  { formula: '¬(P ∧ Q)',    expr: NAO(E(P,Q)),         usaR: false, topico: 'Negação de Conjunção',          conectivos: '¬ ∧' },
  { formula: '¬(P ∨ Q)',    expr: NAO(OU(P,Q)),        usaR: false, topico: 'Negação de Disjunção',          conectivos: '¬ ∨' },
  { formula: '¬P ∧ ¬Q',     expr: E(NAO(P),NAO(Q)),   usaR: false, topico: 'Conjunção de Negações',         conectivos: '∧ ¬' },
  { formula: 'P ∧ ¬P',      expr: E(P,NAO(P)),         usaR: false, topico: 'Contradição Clássica',          conectivos: '∧ ¬' },
  { formula: 'P ∨ ¬P',      expr: OU(P,NAO(P)),        usaR: false, topico: 'Tautologia Clássica',           conectivos: '∨ ¬' },
  // MÉDIO — adiciona R e →
  { formula: 'P → Q',        expr: IMP(P,Q),                      usaR: false, topico: 'Implicação (→)',              conectivos: '→' },
  { formula: '¬P → Q',       expr: IMP(NAO(P),Q),                 usaR: false, topico: 'Implicação com Negação',      conectivos: '→ ¬' },
  { formula: 'P → ¬Q',       expr: IMP(P,NAO(Q)),                 usaR: false, topico: 'Implicação com Negação',      conectivos: '→ ¬' },
  { formula: '¬P → ¬Q',      expr: IMP(NAO(P),NAO(Q)),            usaR: false, topico: 'Inversão da Implicação',      conectivos: '→ ¬' },
  { formula: 'P → P',        expr: IMP(P,P),                      usaR: false, topico: 'Tautologia por Implicação',   conectivos: '→' },
  { formula: '(P ∧ Q) → P',  expr: IMP(E(P,Q),P),                 usaR: false, topico: 'Simplificação (Tautologia)',  conectivos: '→ ∧' },
  { formula: '(P ∧ Q) → R',  expr: IMP(E(P,Q),R),                 usaR: true,  topico: 'Implicação com Conjunção',    conectivos: '→ ∧' },
  { formula: 'P → (Q ∨ R)',  expr: IMP(P,OU(Q,R)),                usaR: true,  topico: 'Implicação com Disjunção',    conectivos: '→ ∨' },
  { formula: 'P ∧ (Q ∨ R)',  expr: E(P,OU(Q,R)),                  usaR: true,  topico: 'Distributividade',            conectivos: '∧ ∨' },
  { formula: '(P ∨ Q) ∧ R',  expr: E(OU(P,Q),R),                  usaR: true,  topico: 'Distributividade',            conectivos: '∨ ∧' },
  // DIFÍCIL — adiciona ↔ e aninhamentos
  { formula: 'P ↔ Q',                          expr: SSE(P,Q),                                       usaR: false, topico: 'Bicondicional (↔)',              conectivos: '↔' },
  { formula: 'P ↔ ¬Q',                         expr: SSE(P,NAO(Q)),                                  usaR: false, topico: 'Bicondicional com Negação',       conectivos: '↔ ¬' },
  { formula: 'P ↔ ¬P',                         expr: SSE(P,NAO(P)),                                  usaR: false, topico: 'Contradição Bicondicional',       conectivos: '↔ ¬' },
  { formula: '(P → Q) ↔ (¬Q → ¬P)',            expr: SSE(IMP(P,Q),IMP(NAO(Q),NAO(P))),               usaR: false, topico: 'Contrapositiva (Tautologia)',      conectivos: '↔ → ¬' },
  { formula: '(P → Q) ↔ (¬P ∨ Q)',             expr: SSE(IMP(P,Q),OU(NAO(P),Q)),                    usaR: false, topico: 'Implicação Material (Tautologia)', conectivos: '↔ → ∨ ¬' },
  { formula: '(P ↔ Q) ↔ ((P → Q) ∧ (Q → P))', expr: SSE(SSE(P,Q),E(IMP(P,Q),IMP(Q,P))),            usaR: false, topico: 'Equivalência Lógica (Tautologia)', conectivos: '↔ → ∧' },
  { formula: '(P → Q) ∧ (Q → R)',              expr: E(IMP(P,Q),IMP(Q,R)),                          usaR: true,  topico: 'Transitividade da Implicação',     conectivos: '→ ∧' },
  { formula: 'P ∧ (P → Q)',                    expr: E(P,IMP(P,Q)),                                 usaR: false, topico: 'Modus Ponens (parcial)',           conectivos: '∧ →' },
];

const FACIL_MAX  = 12;
const MEDIO_MAX  = 22;

interface Questao {
  modelo: ModeloQuestao;
  vals: Vals;
  resposta: boolean;
  classificacao: Classificacao;
}

function embaralhar<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function gerarQuestoes(dificuldade: Dificuldade): Questao[] {
  const total = LOGICA_CONFIG[dificuldade].count;
  const maxIdx = dificuldade === 'EASY' ? FACIL_MAX : dificuldade === 'MEDIUM' ? MEDIO_MAX : MODELOS.length;
  const selecionados = embaralhar(MODELOS.slice(0, maxIdx)).slice(0, total);
  return selecionados.map((modelo) => {
    const vals: Vals = { P: Math.random() < 0.5, Q: Math.random() < 0.5, R: Math.random() < 0.5 };
    return { modelo, vals, resposta: avaliar(modelo.expr, vals), classificacao: classificar(modelo.expr) };
  });
}

const META_CLASSE: Record<Classificacao, { cor: string; borda: string; fundo: string; rotulo: string; emoji: string; dica: string }> = {
  TAUTOLOGIA:   { cor: '#fbbf24', borda: 'rgba(251,191,36,0.35)',  fundo: 'rgba(251,191,36,0.08)',  rotulo: 'TAUTOLOGIA',   emoji: '🌟', dica: 'Sinal sempre ATIVO no cosmos — verdadeiro em qualquer frequência' },
  CONTRADIÇÃO:  { cor: '#f87171', borda: 'rgba(248,113,113,0.35)', fundo: 'rgba(248,113,113,0.08)', rotulo: 'CONTRADIÇÃO',  emoji: '🕳️', dica: 'Buraco negro lógico — sinal sempre INATIVO em qualquer frequência' },
  CONTINGÊNCIA: { cor: '#4ade80', borda: 'rgba(74,222,128,0.35)',  fundo: 'rgba(74,222,128,0.08)',  rotulo: 'CONTINGÊNCIA', emoji: '🪐', dica: 'Sinal variável — depende das frequências de P, Q e R'               },
};

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
  onOpenRanking: (filter?: string) => void;
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
      {
        if (dados.message.includes('concluído'))
          setRoundOver({ winner: null, advancing: false });
        else
          setErro(dados.message);
        setLoading(false);
        return;
      }

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

      if (dados.gameOver || novoHistorico.length >= maxTentativas)
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

  const displayScore = 
  {
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
            style=
            {
              {
                background: jogadorAtual === 1 ? 'rgba(6,182,212,0.10)' : 'rgba(99,102,241,0.12)',
                borderColor: jogadorAtual === 1 ? 'rgba(6,182,212,0.40)' : 'rgba(99,102,241,0.40)',
              }
            }
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
            style=
            {
              {
                background: roundOver.winner ? 'rgba(34,197,94,0.1)' : 'rgba(100,116,139,0.1)',
                borderColor: roundOver.winner ? 'rgba(34,197,94,0.35)' : 'rgba(100,116,139,0.3)',
              }
            }>

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
        {!isRoundOver && 
        (
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
  savedPosition: { position: number | null; total: number } | null;
  saveErro: string;
  onSalvar: (e: React.FormEvent) => void;
  onOpenRanking: () => void;
}

function SaveRankingPanel({ saveNome, setSaveNome, saving, savedPosition, saveErro, onSalvar, onOpenRanking }: SaveRankingPanelProps)
{
  if (savedPosition)
  {
    if (savedPosition.position != null)
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
      <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center">
        <p className="text-emerald-300 font-bold text-sm">✅ Resultado salvo!</p>
        <p className="text-slate-400 text-xs mt-1">Vença uma rodada para aparecer no ranking.</p>
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
  const [savedPosition, setSavedPosition] = useState<{ position: number | null; total: number } | null>(null);
  const [saveErro, setSaveErro] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const maxTentativas = MAX_TENTATIVAS_SOLO[dificuldade];
  const tentativasUsadas = historico.length;
  const restantes = maxTentativas - tentativasUsadas;
  const progresso = tentativasUsadas / maxTentativas;
  const lastPalpite = historico[0];
  const { bg: difBg, btn: difBtn } = DIF_COLOR[dificuldade];

  useEffect
  (() => 
    {
      if (!ganhou && !perdeu) inputRef.current?.focus();
    }, [ganhou, perdeu]
  );

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
      if (data.saved)
        setSavedPosition({ position: data.position ?? null, total: data.total });
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
  const [savedPosition, setSavedPosition] = useState<{ position: number | null; total: number } | null>(null);
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
    if (!nome) { setSaveErro('Digite um apelid: '); return; }
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
      if (data.saved)
      {
        setSavedPosition({ position: data.position ?? null, total: data.total });
        onOpenRanking('CARD_GUESS');
      }
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
  const [savedPositionP1, setSavedPositionP1] = useState<{ position: number | null; total: number } | null>(null);
  const [saveErroP1, setSaveErroP1] = useState('');

  const [saveNomeP2, setSaveNomeP2] = useState('');
  const [savingP2, setSavingP2] = useState(false);
  const [savedPositionP2, setSavedPositionP2] = useState<{ position: number | null; total: number } | null>(null);
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
      if (data.saved)
        setSavedPositionP1({ position: data.position ?? null, total: data.total });
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
      if (data.saved)
        setSavedPositionP2({ position: data.position ?? null, total: data.total });
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

// ─── PROTOCOLO LÓGICO — JOGO DE LÓGICA PROPOSICIONAL ────────────────────────

function LogicaGame({ gameId, dificuldade, p1, apiUrl, onBack, onOpenRanking, onNovoJogo }: GameProps)
{
  const [questoes] = useState<Questao[]>(() => gerarQuestoes(dificuldade));
  const [atual, setAtual] = useState(0);
  const [respondido, setRespondido] = useState<boolean | null>(null);
  const [erros, setErros] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [encerrado, setEncerrado] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const [saveNome, setSaveNome] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedPosition, setSavedPosition] = useState<{ position: number | null; total: number } | null>(null);
  const [saveErro, setSaveErro] = useState('');
  const finishRef = useRef(false);

  const questao = questoes[atual];
  const total = questoes.length;
  const meta = META_CLASSE[questao?.classificacao ?? 'CONTINGÊNCIA'];

  const acertou = respondido !== null && respondido === questao.resposta;

  const responder = (escolha: boolean) => {
    if (respondido !== null) return;
    setRespondido(escolha);
    if (escolha !== questao.resposta) setErros((e) => e + 1);
    else setAcertos((a) => a + 1);
  };

  const proximo = async () => {
    if (atual + 1 >= total) {
      setEncerrado(true);
      if (!finishRef.current) {
        finishRef.current = true;
        const totalErros = erros + (respondido !== questao.resposta ? 1 : 0);
        fetch(`${apiUrl}/api/games/${gameId}/finish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ won: true, mistakes: totalErros }),
        }).catch(() => {});
      }
    } else {
      setAtual((i) => i + 1);
      setRespondido(null);
    }
  };

  const handleNovo = async () => {
    setFinalizando(true);
    try { await onNovoJogo(); } finally { setFinalizando(false); }
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const nome = saveNome.trim();
    if (!nome) { setSaveErro('Digite um apelido de astronauta'); return; }
    setSaving(true);
    setSaveErro('');
    try {
      const res = await fetch(`${apiUrl}/api/games/${gameId}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome }),
      });
      const data = await res.json();
      if (data.saved) {
        setSavedPosition({ position: data.position ?? null, total: data.total });
        onOpenRanking('LOGIC_PUZZLE');
      } else {
        setSaveErro('Não foi possível salvar. Tente novamente.');
      }
    } catch {
      setSaveErro('Erro de conexão com a estação');
    } finally {
      setSaving(false);
    }
  };

  const vLabel = (b: boolean) => b ? 'VERDADEIRA' : 'FALSA';
  const vColor = (b: boolean) => b ? '#4ade80' : '#f87171';

  // ── Tela de missão concluída ───────────────────────────────────────────────
  if (encerrado) {
    const falhas = erros;
    const decodificadas = acertos;
    const perfeita = falhas === 0;
    return (
      <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md bg-[#0c1729] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
            <div className="text-5xl mb-4">{perfeita ? '🏆' : decodificadas >= total / 2 ? '🛸' : '📡'}</div>
            <h2 className="text-2xl font-black text-white mb-1">
              {perfeita ? 'Missão Perfeita, Astronauta!' : 'Protocolo Concluído!'}
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              {p1} · {LOGICA_CONFIG[dificuldade].label} · Protocolo Lógico
            </p>

            <div className="flex gap-3 mb-6">
              <div className="flex-1 rounded-2xl p-4" style={{ background: 'rgba(74,222,128,0.10)', border: '1px solid rgba(74,222,128,0.30)' }}>
                <p className="text-3xl font-black text-green-400">{decodificadas}</p>
                <p className="text-xs text-slate-400 mt-1">📡 Decodificadas</p>
              </div>
              <div className="flex-1 rounded-2xl p-4"
                style={falhas > 0
                  ? { background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.30)' }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <p className="text-3xl font-black" style={{ color: falhas > 0 ? '#f87171' : '#94a3b8' }}>{falhas}</p>
                <p className="text-xs text-slate-400 mt-1">🔇 Falhas</p>
              </div>
              <div className="flex-1 rounded-2xl p-4" style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.25)' }}>
                <p className="text-3xl font-black text-green-300">{total}</p>
                <p className="text-xs text-slate-400 mt-1">🌌 Transmissões</p>
              </div>
            </div>

            <button
              onClick={handleNovo}
              disabled={finalizando}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition hover:opacity-90 mb-3 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #134e1e, #22c55e)', boxShadow: '0 4px 16px rgba(34,197,94,0.25)' }}
            >
              {finalizando ? '🛸 Iniciando...' : '🔄 Nova missão lógica'}
            </button>

            {savedPosition ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center">
                {savedPosition.position != null
                  ? <><p className="text-amber-300 font-bold text-sm">🏆 #{savedPosition.position} de {savedPosition.total} astronautas!</p>
                     <button onClick={() => onOpenRanking('LOGIC_PUZZLE')} className="mt-1 text-xs text-amber-400 underline underline-offset-2 hover:text-amber-300 transition">Ver ranking completo →</button></>
                  : <p className="text-emerald-300 font-bold text-sm">✅ Resultado salvo na base espacial!</p>
                }
              </div>
            ) : (
              <form onSubmit={handleSalvar}>
                <p className="text-slate-400 text-xs mb-2">Registrar no Hall da Fama:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={saveNome}
                    onChange={(e) => setSaveNome(e.target.value)}
                    placeholder="Apelido do astronauta"
                    maxLength={30}
                    className="flex-1 bg-white/5 border border-white/15 focus:border-green-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none transition"
                  />
                  <button
                    type="submit"
                    disabled={saving || !saveNome.trim()}
                    className="px-4 py-2 rounded-xl font-bold text-xs text-white disabled:opacity-40 transition hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #134e1e, #22c55e)' }}
                  >
                    {saving ? '...' : '💾 Salvar'}
                  </button>
                </div>
                {saveErro && <p className="text-red-400 text-xs mt-1">{saveErro}</p>}
              </form>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ── Transmissão atual ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Barra de progresso */}
      <div className="flex items-center gap-3 px-5 py-3 flex-wrap">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.30)', color: '#4ade80' }}>
          📡 Transmissão {atual + 1}/{total}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(74,222,128,0.10)', borderColor: 'rgba(74,222,128,0.25)', color: '#4ade80' }}>
          🛰️ {acertos} decodificadas
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={erros > 0
            ? { background: 'rgba(248,113,113,0.10)', borderColor: 'rgba(248,113,113,0.30)', color: '#f87171' }
            : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)', color: '#94a3b8' }}>
          🔇 {erros} falhas
        </span>
        <div className="ml-auto flex-1 max-w-[120px] h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${(atual / total) * 100}%`, background: '#22c55e' }} />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center px-4 pb-8 pt-2 max-w-lg mx-auto w-full gap-4">

        {/* Tipo de sinal cósmico */}
        <div className="w-full rounded-2xl p-4 border" style={{ background: meta.fundo, borderColor: meta.borda }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{meta.emoji}</span>
            <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: meta.borda, color: meta.cor }}>
              {meta.rotulo}
            </span>
            <span className="text-xs font-medium"
              style={{ color: questao.modelo.conectivos.includes('↔') ? '#a78bfa' : questao.modelo.conectivos.includes('→') ? '#c084fc' : '#67e8f9' }}>
              {questao.modelo.topico}
            </span>
          </div>
          <p className="text-xs mt-1 font-medium" style={{ color: meta.cor }}>
            {meta.dica}
          </p>
        </div>

        {/* Frequências das proposições */}
        <div className="w-full rounded-2xl p-4 border border-white/10" style={{ background: '#080f1e' }}>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">
            🔭 Frequências das Proposições
          </p>
          <div className="flex gap-3 flex-wrap">
            {(['P', 'Q', ...(questao.modelo.usaR ? ['R'] : [])] as ('P' | 'Q' | 'R')[]).map((v) => (
              <div key={v} className="flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{
                  background: questao.vals[v] ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.10)',
                  borderColor: questao.vals[v] ? 'rgba(74,222,128,0.35)' : 'rgba(248,113,113,0.30)',
                }}>
                <span className="font-black text-white text-sm">{v}</span>
                <span className="text-[10px] font-bold" style={{ color: vColor(questao.vals[v]) }}>= {vLabel(questao.vals[v])}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sinal cifrado */}
        <div className="w-full rounded-2xl p-6 border border-white/10 text-center" style={{ background: '#0a1428' }}>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">
            🌌 Sinal Cifrado
          </p>
          <p className="text-3xl font-black tracking-wide" style={{ color: '#e2e8f0', fontFamily: 'monospace' }}>
            {questao.modelo.formula}
          </p>
          <p className="text-xs text-slate-500 mt-2">Operadores lógicos: {questao.modelo.conectivos}</p>
        </div>

        {/* Decisão do astronauta */}
        {respondido === null ? (
          <div className="w-full">
            <p className="text-center text-sm text-slate-400 mb-3">
              Astronauta, esta transmissão é:
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => responder(true)}
                className="flex-1 py-4 rounded-2xl font-black text-base transition-all hover:scale-[1.03] active:scale-95 flex flex-col items-center gap-1"
                style={{ background: 'rgba(74,222,128,0.15)', border: '2px solid rgba(74,222,128,0.50)', color: '#4ade80' }}
              >
                <span className="text-xl">📡</span>
                <span>VERDADEIRA</span>
              </button>
              <button
                onClick={() => responder(false)}
                className="flex-1 py-4 rounded-2xl font-black text-base transition-all hover:scale-[1.03] active:scale-95 flex flex-col items-center gap-1"
                style={{ background: 'rgba(248,113,113,0.15)', border: '2px solid rgba(248,113,113,0.50)', color: '#f87171' }}
              >
                <span className="text-xl">🔇</span>
                <span>FALSA</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {/* Feedback espacial */}
            <div className="rounded-2xl p-4 mb-3 text-center border"
              style={acertou
                ? { background: 'rgba(74,222,128,0.10)', borderColor: 'rgba(74,222,128,0.40)' }
                : { background: 'rgba(248,113,113,0.10)', borderColor: 'rgba(248,113,113,0.40)' }}>
              <p className="text-xl font-black mb-1" style={{ color: acertou ? '#4ade80' : '#f87171' }}>
                {acertou ? '📡 Sinal decodificado!' : '🔇 Falha na decodificação!'}
              </p>
              <p className="text-sm text-slate-300">
                A transmissão é{' '}
                <span className="font-black" style={{ color: vColor(questao.resposta) }}>{vLabel(questao.resposta)}</span>
                {questao.classificacao === 'TAUTOLOGIA' && (
                  <span className="block text-xs text-yellow-400 mt-1">
                    🌟 Tautologia — sinal sempre ativo, verdadeiro em qualquer frequência!
                  </span>
                )}
                {questao.classificacao === 'CONTRADIÇÃO' && (
                  <span className="block text-xs text-red-400 mt-1">
                    🕳️ Contradição — buraco negro lógico, falso em qualquer frequência!
                  </span>
                )}
                {questao.classificacao === 'CONTINGÊNCIA' && (
                  <span className="block text-xs text-slate-400 mt-1">
                    🪐 Contingência — substitua P, Q{questao.modelo.usaR ? ', R' : ''} e avalie passo a passo
                  </span>
                )}
              </p>
            </div>

            <button
              onClick={proximo}
              className="w-full py-4 rounded-2xl font-black text-white text-base transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #134e1e, #22c55e)', boxShadow: '0 4px 16px rgba(34,197,94,0.20)' }}
            >
              {atual + 1 >= total ? '🏁 Ver resultado da missão' : '🛸 Próxima transmissão →'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── HIERARQUIA DE COMANDOS — JOGO DE PRECEDÊNCIA DE OPERADORES ───────────────

interface ExercicioParenteses {
  flat: string[];
  correta: string;
  dica: string;
}

const POOL_EASY: ExercicioParenteses[] = [
  { flat: ['P', '∧', 'Q', '∨', 'R'],         correta: '(P ∧ Q) ∨ R',       dica: '∧ tem maior precedência que ∨ — conjunção agrupa antes da disjunção.' },
  { flat: ['P', '∨', 'Q', '∧', 'R'],         correta: 'P ∨ (Q ∧ R)',       dica: '∧ tem maior precedência que ∨ — conjunção agrupa antes da disjunção.' },
  { flat: ['P', '∧', 'Q', '∧', 'R'],         correta: '(P ∧ Q) ∧ R',       dica: '∧ é associativo à esquerda — agrupa da esquerda para a direita.' },
  { flat: ['P', '∨', 'Q', '∨', 'R'],         correta: '(P ∨ Q) ∨ R',       dica: '∨ é associativo à esquerda — agrupa da esquerda para a direita.' },
  { flat: ['¬P', '∧', 'Q', '∨', 'R'],        correta: '(¬P ∧ Q) ∨ R',      dica: '¬P é atômico. ∧ agrupa antes de ∨.' },
  { flat: ['P', '∨', '¬Q', '∧', 'R'],        correta: 'P ∨ (¬Q ∧ R)',      dica: '¬Q é atômico. ∧ tem maior precedência que ∨.' },
  { flat: ['¬P', '∨', 'Q', '∧', '¬R'],       correta: '¬P ∨ (Q ∧ ¬R)',     dica: '∧ tem maior precedência que ∨.' },
  { flat: ['¬P', '∧', 'Q', '∧', 'R'],        correta: '(¬P ∧ Q) ∧ R',      dica: '∧ é associativo à esquerda.' },
];

const POOL_MEDIUM: ExercicioParenteses[] = [
  { flat: ['P', '∧', 'Q', '→', 'R'],                        correta: '(P ∧ Q) → R',          dica: '∧ tem maior precedência que → — conjunção agrupa antes da implicação.' },
  { flat: ['P', '→', 'Q', '∧', 'R'],                        correta: 'P → (Q ∧ R)',          dica: '∧ tem maior precedência que → — conjunção agrupa antes da implicação.' },
  { flat: ['P', '∨', 'Q', '→', 'R'],                        correta: '(P ∨ Q) → R',          dica: '∨ tem maior precedência que → — disjunção agrupa antes da implicação.' },
  { flat: ['P', '→', 'Q', '∨', 'R'],                        correta: 'P → (Q ∨ R)',          dica: '∨ tem maior precedência que →.' },
  { flat: ['¬P', '∧', 'Q', '→', 'R'],                       correta: '(¬P ∧ Q) → R',         dica: '∧ tem maior precedência que →.' },
  { flat: ['P', '∧', 'Q', '→', 'R', '∨', '¬P'],            correta: '(P ∧ Q) → (R ∨ ¬P)',   dica: '∧ e ∨ agrupam antes de →. Ambos os lados da implicação precisam de parênteses.' },
  { flat: ['¬P', '∨', 'Q', '→', 'R', '∧', 'P'],            correta: '(¬P ∨ Q) → (R ∧ P)',   dica: '∧ e ∨ têm maior precedência que →.' },
  { flat: ['P', '→', 'Q', '→', 'R'],                        correta: 'P → (Q → R)',           dica: '→ é associativo à direita — agrupa da direita para a esquerda.' },
  { flat: ['P', '∧', '¬Q', '→', 'R', '∨', 'P'],            correta: '(P ∧ ¬Q) → (R ∨ P)',   dica: '∧ e ∨ agrupam antes de →.' },
  { flat: ['P', '∨', '¬Q', '→', '¬R', '∧', 'Q'],           correta: '(P ∨ ¬Q) → (¬R ∧ Q)',  dica: '∧ e ∨ têm maior precedência que →.' },
];

const POOL_HARD: ExercicioParenteses[] = [
  { flat: ['P', '∧', 'Q', '↔', 'R'],                                       correta: '(P ∧ Q) ↔ R',                     dica: '∧ tem maior precedência que ↔.' },
  { flat: ['P', '↔', 'Q', '∧', 'R'],                                       correta: 'P ↔ (Q ∧ R)',                     dica: '∧ tem maior precedência que ↔.' },
  { flat: ['P', '→', 'Q', '↔', 'R'],                                       correta: '(P → Q) ↔ R',                     dica: '→ tem maior precedência que ↔.' },
  { flat: ['P', '↔', 'Q', '→', 'R'],                                       correta: 'P ↔ (Q → R)',                     dica: '→ tem maior precedência que ↔.' },
  { flat: ['P', '∧', 'Q', '→', 'R', '↔', '¬P'],                           correta: '((P ∧ Q) → R) ↔ ¬P',             dica: '∧ agrupa antes de →, e → agrupa antes de ↔.' },
  { flat: ['¬P', '∧', 'Q', '∨', 'R', '→', 'P', '↔', 'Q'],                correta: '(((¬P ∧ Q) ∨ R) → P) ↔ Q',       dica: '∧ > ∨ > → > ↔ — aplique em ordem de maior para menor precedência.' },
  { flat: ['P', '∧', 'Q', '∨', '¬R', '→', '¬P', '↔', 'Q'],               correta: '(((P ∧ Q) ∨ ¬R) → ¬P) ↔ Q',      dica: '∧ > ∨ > → > ↔.' },
  { flat: ['¬P', '∨', 'Q', '∧', 'R', '→', 'P', '↔', '¬Q'],               correta: '((¬P ∨ (Q ∧ R)) → P) ↔ ¬Q',      dica: '∧ agrupa antes de ∨, depois → e por fim ↔.' },
  { flat: ['P', '∨', 'Q', '∧', 'R', '↔', 'P', '→', '¬Q'],                correta: '(P ∨ (Q ∧ R)) ↔ (P → ¬Q)',        dica: '∧ agrupa antes de ∨, e → agrupa antes de ↔.' },
  { flat: ['¬P', '∧', 'Q', '→', 'P', '∨', 'R', '↔', 'Q'],                correta: '((¬P ∧ Q) → (P ∨ R)) ↔ Q',        dica: '∧ e ∨ agrupam antes de →, que agrupa antes de ↔.' },
  { flat: ['P', '∧', '¬Q', '∨', 'R', '→', 'P', '↔', '¬Q'],               correta: '(((P ∧ ¬Q) ∨ R) → P) ↔ ¬Q',      dica: '∧ > ∨ > → > ↔.' },
  { flat: ['¬P', '∨', '¬Q', '∧', 'R', '→', '¬P', '↔', 'R'],              correta: '((¬P ∨ (¬Q ∧ R)) → ¬P) ↔ R',     dica: '∧ agrupa antes de ∨, depois → e por fim ↔.' },
];

const POOL_PREC: Record<Dificuldade, ExercicioParenteses[]> = {
  EASY: POOL_EASY,
  MEDIUM: POOL_MEDIUM,
  HARD: POOL_HARD,
};

function normalizar(s: string) { return s.replace(/\s+/g, ''); }

function gerarExerciciosPrecedencia(dif: Dificuldade): ExercicioParenteses[] {
  const pool = [...POOL_PREC[dif]].sort(() => Math.random() - 0.5);
  return pool.slice(0, PARENTESES_CONFIG[dif].count);
}

function PrecedenciaGame({ gameId, dificuldade, p1, apiUrl, onBack, onOpenRanking, onNovoJogo }: GameProps)
{
  const [exercicios] = useState<ExercicioParenteses[]>(() => gerarExerciciosPrecedencia(dificuldade));
  const [atual, setAtual] = useState(0);
  const [tokens, setTokens] = useState<string[]>(() => [...exercicios[0].flat]);
  const [history, setHistory] = useState<string[][]>([]);
  const [selStart, setSelStart] = useState<number | null>(null);
  const [selEnd, setSelEnd] = useState<number | null>(null);
  const [resultado, setResultado] = useState<'correto' | 'errado' | null>(null);
  const [erros, setErros] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [encerrado, setEncerrado] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const [saveNome, setSaveNome] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedPosition, setSavedPosition] = useState<{ position: number | null; total: number } | null>(null);
  const [saveErro, setSaveErro] = useState('');
  const finishRef = useRef(false);

  const exercicio = exercicios[atual];
  const total = exercicios.length;

  const handleTokenClick = (index: number) => {
    if (resultado !== null) return;
    if (selStart === null) {
      setSelStart(index);
      setSelEnd(null);
    } else if (selEnd !== null) {
      setSelStart(index);
      setSelEnd(null);
    } else {
      if (index === selStart) {
        setSelStart(null);
      } else if (index > selStart) {
        setSelEnd(index);
      } else {
        setSelStart(index);
      }
    }
  };

  const addParens = () => {
    if (selStart === null || selEnd === null || selEnd <= selStart) return;
    const newTokens = [
      ...tokens.slice(0, selStart),
      '(',
      ...tokens.slice(selStart, selEnd + 1),
      ')',
      ...tokens.slice(selEnd + 1),
    ];
    setHistory(h => [...h, tokens]);
    setTokens(newTokens);
    setSelStart(null);
    setSelEnd(null);
  };

  const undo = () => {
    if (history.length === 0) return;
    setTokens(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
    setSelStart(null);
    setSelEnd(null);
  };

  const resetExpr = () => {
    setTokens([...exercicio.flat]);
    setHistory([]);
    setSelStart(null);
    setSelEnd(null);
  };

  const verificar = () => {
    if (resultado !== null) return;
    const resposta = normalizar(tokens.join(''));
    const esperada = normalizar(exercicio.correta);
    const correto = resposta === esperada;
    setResultado(correto ? 'correto' : 'errado');
    if (correto) setAcertos(a => a + 1);
    else setErros(e => e + 1);
  };

  const proximo = async () => {
    if (atual + 1 >= total) {
      setEncerrado(true);
      if (!finishRef.current) {
        finishRef.current = true;
        fetch(`${apiUrl}/api/games/${gameId}/finish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ won: true, mistakes: erros }),
        }).catch(() => {});
      }
    } else {
      const next = atual + 1;
      setAtual(next);
      setTokens([...exercicios[next].flat]);
      setHistory([]);
      setSelStart(null);
      setSelEnd(null);
      setResultado(null);
    }
  };

  const handleNovo = async () => {
    setFinalizando(true);
    try { await onNovoJogo(); } finally { setFinalizando(false); }
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const nome = saveNome.trim();
    if (!nome) { setSaveErro('Digite um apelido de astronauta'); return; }
    setSaving(true);
    setSaveErro('');
    try {
      const res = await fetch(`${apiUrl}/api/games/${gameId}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome }),
      });
      const data = await res.json();
      if (data.saved) {
        setSavedPosition({ position: data.position ?? null, total: data.total });
        onOpenRanking('PRECEDENCE_PUZZLE');
      } else {
        setSaveErro('Não foi possível salvar. Tente novamente.');
      }
    } catch {
      setSaveErro('Erro de conexão com a estação');
    } finally {
      setSaving(false);
    }
  };

  // ── Tela de missão concluída ───────────────────────────────────────────────
  if (encerrado) {
    const perfeita = erros === 0;
    return (
      <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md bg-[#0c1729] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
            <div className="text-5xl mb-4">{perfeita ? '🏆' : acertos >= total / 2 ? '⚙️' : '🪐'}</div>
            <h2 className="text-2xl font-black text-white mb-1">
              {perfeita ? 'Hierarquia Restaurada!' : 'Sistemas Recalibrados!'}
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              {p1} · {PARENTESES_CONFIG[dificuldade].label} · Hierarquia de Comandos
            </p>
            <div className="flex gap-3 mb-6">
              <div className="flex-1 rounded-2xl p-4" style={{ background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.30)' }}>
                <p className="text-3xl font-black" style={{ color: '#a78bfa' }}>{acertos}</p>
                <p className="text-xs text-slate-400 mt-1">⚙️ Corretas</p>
              </div>
              <div className="flex-1 rounded-2xl p-4"
                style={erros > 0
                  ? { background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.30)' }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <p className="text-3xl font-black" style={{ color: erros > 0 ? '#f87171' : '#94a3b8' }}>{erros}</p>
                <p className="text-xs text-slate-400 mt-1">🔇 Erros</p>
              </div>
              <div className="flex-1 rounded-2xl p-4" style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)' }}>
                <p className="text-3xl font-black" style={{ color: '#8b5cf6' }}>{total}</p>
                <p className="text-xs text-slate-400 mt-1">🪐 Expressões</p>
              </div>
            </div>
            <button
              onClick={handleNovo}
              disabled={finalizando}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition hover:opacity-90 mb-3 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #3b1fa8, #7c3aed)', boxShadow: '0 4px 16px rgba(139,92,246,0.25)' }}
            >
              {finalizando ? '🪐 Iniciando...' : '🔄 Nova missão de precedência'}
            </button>
            {savedPosition ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center">
                {savedPosition.position != null
                  ? <><p className="text-amber-300 font-bold text-sm">🏆 #{savedPosition.position} de {savedPosition.total} astronautas!</p>
                     <button onClick={() => onOpenRanking('PRECEDENCE_PUZZLE')} className="mt-1 text-xs text-amber-400 underline underline-offset-2 hover:text-amber-300 transition">Ver ranking completo →</button></>
                  : <p className="text-violet-300 font-bold text-sm">✅ Resultado salvo na base espacial!</p>
                }
              </div>
            ) : (
              <form onSubmit={handleSalvar}>
                <p className="text-slate-400 text-xs mb-2">Registrar no Hall da Fama:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={saveNome}
                    onChange={(e) => setSaveNome(e.target.value)}
                    placeholder="Apelido do astronauta"
                    maxLength={30}
                    className="flex-1 bg-white/5 border border-white/15 focus:border-violet-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none transition"
                  />
                  <button
                    type="submit"
                    disabled={saving || !saveNome.trim()}
                    className="px-4 py-2 rounded-xl font-bold text-xs text-white disabled:opacity-40 transition hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #3b1fa8, #7c3aed)' }}
                  >
                    {saving ? '...' : '💾 Salvar'}
                  </button>
                </div>
                {saveErro && <p className="text-red-400 text-xs mt-1">{saveErro}</p>}
              </form>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ── Tela de jogo ──────────────────────────────────────────────────────────
  const canAddParens = selStart !== null && selEnd !== null && selEnd > selStart;

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Barra de progresso */}
      <div className="flex items-center gap-3 px-5 py-3 flex-wrap">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(167,139,250,0.30)', color: '#a78bfa' }}>
          ⚙️ Expressão {atual + 1}/{total}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(167,139,250,0.10)', borderColor: 'rgba(167,139,250,0.25)', color: '#a78bfa' }}>
          ✅ {acertos} corretas
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={erros > 0
            ? { background: 'rgba(248,113,113,0.10)', borderColor: 'rgba(248,113,113,0.30)', color: '#f87171' }
            : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)', color: '#94a3b8' }}>
          ❌ {erros} erros
        </span>
        <div className="ml-auto flex-1 max-w-[120px] h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${(atual / total) * 100}%`, background: '#7c3aed' }} />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center px-4 pb-8 pt-2 max-w-2xl mx-auto w-full gap-4">

        {/* Referência de precedência */}
        <div className="w-full rounded-2xl p-4 border" style={{ background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(167,139,250,0.25)' }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: '#a78bfa' }}>
            🪐 Ordem de Precedência (maior → menor)
          </p>
          <div className="flex gap-2 flex-wrap items-center text-xs font-mono">
            <span className="px-2 py-1 rounded-lg font-black text-white" style={{ background: 'rgba(167,139,250,0.20)', border: '1px solid rgba(167,139,250,0.40)' }}>¬</span>
            <span className="text-slate-500">›</span>
            <span className="px-2 py-1 rounded-lg font-black text-white" style={{ background: 'rgba(139,92,246,0.20)', border: '1px solid rgba(139,92,246,0.40)' }}>∧</span>
            <span className="text-slate-500">›</span>
            <span className="px-2 py-1 rounded-lg font-black text-white" style={{ background: 'rgba(109,40,217,0.20)', border: '1px solid rgba(109,40,217,0.40)' }}>∨</span>
            <span className="text-slate-500">›</span>
            <span className="px-2 py-1 rounded-lg font-black text-white" style={{ background: 'rgba(91,33,182,0.25)', border: '1px solid rgba(91,33,182,0.45)' }}>→</span>
            <span className="text-slate-500">›</span>
            <span className="px-2 py-1 rounded-lg font-black text-white" style={{ background: 'rgba(76,29,149,0.30)', border: '1px solid rgba(76,29,149,0.50)' }}>↔</span>
            <span className="text-slate-400 ml-2 text-[10px]">· → associa à direita · demais associam à esquerda</span>
          </div>
        </div>

        {/* Expressão interativa */}
        <div className="w-full rounded-2xl p-6 border border-white/10" style={{ background: '#0a1428' }}>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">
            ⚙️ Expressão — clique no 1º e no último token do agrupamento
          </p>
          <div className="flex flex-wrap gap-2 items-center justify-center min-h-[52px]">
            {tokens.map((tok, i) => {
              const isParen = tok === '(' || tok === ')';
              const isStart = selStart === i;
              const isEnd = selEnd === i;
              const inRange = selStart !== null && selEnd !== null && i > selStart && i < selEnd;

              let style: React.CSSProperties;
              let cls = 'px-3 py-2 rounded-xl font-mono font-black text-base cursor-pointer select-none transition-all duration-100 ';

              if (resultado !== null) {
                cls += 'cursor-default ';
                if (isParen) {
                  style = { background: resultado === 'correto' ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.12)', border: `1px solid ${resultado === 'correto' ? 'rgba(74,222,128,0.30)' : 'rgba(248,113,113,0.25)'}`, color: resultado === 'correto' ? '#4ade80' : '#f87171' };
                } else {
                  style = { background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#c4b5fd' };
                }
              } else if (isStart) {
                cls += 'scale-110 ';
                style = { background: 'rgba(251,191,36,0.30)', border: '2px solid rgba(251,191,36,0.80)', color: '#fbbf24' };
              } else if (isEnd) {
                cls += 'scale-110 ';
                style = { background: 'rgba(251,146,60,0.30)', border: '2px solid rgba(251,146,60,0.80)', color: '#fb923c' };
              } else if (inRange) {
                style = { background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.40)', color: '#fde68a' };
              } else if (isParen) {
                style = { background: 'rgba(100,116,139,0.15)', border: '1px solid rgba(100,116,139,0.30)', color: '#94a3b8' };
              } else {
                cls += 'hover:scale-105 ';
                style = { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.35)', color: '#e2e8f0' };
              }

              return (
                <span
                  key={i}
                  className={cls}
                  style={style}
                  onClick={() => handleTokenClick(i)}
                >
                  {tok}
                </span>
              );
            })}
          </div>

          {/* Instrução de seleção */}
          <p className="text-center text-xs mt-3" style={{ color: '#64748b' }}>
            {resultado !== null
              ? ''
              : selStart === null
                ? 'Clique no 1º token do agrupamento'
                : selEnd === null
                  ? 'Agora clique no último token do agrupamento'
                  : 'Pronto! Clique em  ( )  para adicionar os parênteses'}
          </p>
        </div>

        {/* Controles */}
        {resultado === null && (
          <div className="w-full flex gap-2">
            <button
              onClick={addParens}
              disabled={!canAddParens}
              className="flex-1 py-3 rounded-xl font-black text-sm transition hover:opacity-90 disabled:opacity-30"
              style={{ background: canAddParens ? 'linear-gradient(135deg, #3b1fa8, #7c3aed)' : 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.40)', color: '#e2e8f0', boxShadow: canAddParens ? '0 4px 16px rgba(139,92,246,0.25)' : 'none' }}
            >
              ( ) Agrupar
            </button>
            <button
              onClick={undo}
              disabled={history.length === 0}
              className="px-4 py-3 rounded-xl font-bold text-sm transition hover:opacity-90 disabled:opacity-30"
              style={{ background: 'rgba(100,116,139,0.15)', border: '1px solid rgba(100,116,139,0.30)', color: '#94a3b8' }}
            >
              ↩ Desfazer
            </button>
            <button
              onClick={resetExpr}
              disabled={history.length === 0}
              className="px-4 py-3 rounded-xl font-bold text-sm transition hover:opacity-90 disabled:opacity-30"
              style={{ background: 'rgba(100,116,139,0.15)', border: '1px solid rgba(100,116,139,0.30)', color: '#94a3b8' }}
            >
              ⟳ Limpar
            </button>
            <button
              onClick={verificar}
              className="flex-1 py-3 rounded-xl font-black text-sm transition hover:opacity-90"
              style={{ background: 'rgba(139,92,246,0.20)', border: '2px solid rgba(167,139,250,0.50)', color: '#a78bfa' }}
            >
              ✓ Verificar
            </button>
          </div>
        )}

        {/* Feedback */}
        {resultado !== null && (
          <div className="w-full">
            <div className="rounded-2xl p-5 mb-3 border"
              style={resultado === 'correto'
                ? { background: 'rgba(74,222,128,0.10)', borderColor: 'rgba(74,222,128,0.40)' }
                : { background: 'rgba(248,113,113,0.10)', borderColor: 'rgba(248,113,113,0.40)' }}>
              <p className="text-xl font-black mb-2" style={{ color: resultado === 'correto' ? '#4ade80' : '#f87171' }}>
                {resultado === 'correto' ? '⚙️ Hierarquia restaurada!' : '🔇 Sequência incorreta!'}
              </p>
              {resultado === 'errado' && (
                <div className="mb-3">
                  <p className="text-xs text-slate-400 mb-1">Resposta correta:</p>
                  <p className="font-mono font-black text-base" style={{ color: '#c4b5fd' }}>{exercicio.correta}</p>
                </div>
              )}
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="font-bold" style={{ color: '#a78bfa' }}>💡 </span>
                {exercicio.dica}
              </p>
            </div>
            <button
              onClick={proximo}
              className="w-full py-4 rounded-2xl font-black text-white text-base transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #3b1fa8, #7c3aed)', boxShadow: '0 4px 16px rgba(139,92,246,0.20)' }}
            >
              {atual + 1 >= total ? '🏁 Ver resultado da missão' : '🪐 Próxima expressão →'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export function Game(props: GameProps)
{
  if (props.modo === 'vs') return <VsGame {...props} />;
  if (props.modo === 'memoria') return <MemoriaGame {...props} />;
  if (props.modo === 'logica') return <LogicaGame {...props} />;
  if (props.modo === 'precedencia') return <PrecedenciaGame {...props} />;
  return <SoloGame {...props} />;
}
