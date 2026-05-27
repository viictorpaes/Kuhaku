import { useState, useRef, useEffect, useCallback } from 'react';
import type { Dificuldade, Modo, Palpite, Direcao } from '../types';
import { starWarsTheme, playArcadeError, playArcadeCorrect } from '../ts/audio';
import
{
  RANGE_LABEL, DIF_LABEL, DIF_COLOR,
  MAX_TENTATIVAS_SOLO, MAX_TENTATIVAS_VS, TOTAL_ROUNDS_VS, RANGE_MAX,
  MEMORIA_GRID, LOGICA_CONFIG, PARENTESES_CONFIG,
  TIMER_VS_TURNO, TIMER_LOGICA, TIMER_PRECEDENCIA,
  MEMORIA_TIMER, MEMORIA_BONUS_PAR, TIMER_PENALIDADE, TIMER_BONUS_ACERTO, TIMER_MAX,
} from '../constants';


type Expr =
  | { tipo: 'atomo'; nome: 'P' | 'Q' | 'R' }
  | { tipo: 'nao'; expr: Expr }
  | { tipo: 'e' | 'ou' | 'implica' | 'sse'; esq: Expr; dir: Expr };

type Vals = { P: boolean; Q: boolean; R: boolean };

function avaliar(e: Expr, v: Vals): boolean 
{
  switch (e.tipo) 
  {
    case 'atomo':   return v[e.nome];
    case 'nao':     return !avaliar(e.expr, v);
    case 'e':       return avaliar(e.esq, v) && avaliar(e.dir, v);
    case 'ou':      return avaliar(e.esq, v) || avaliar(e.dir, v);
    case 'implica': return !avaliar(e.esq, v) || avaliar(e.dir, v);
    case 'sse':     return avaliar(e.esq, v) === avaliar(e.dir, v);
  }
}

type Classificacao = 'TAUTOLOGIA' | 'CONTRADIÇÃO' | 'CONTINGÊNCIA';

function classificar(e: Expr): Classificacao
{
  let temVerd = false, temFalso = false;
  for (const P of [false, true])
    for (const Q of [false, true])
      for (const R of [false, true]) 
      {
        if (avaliar(e, { P, Q, R })) 
          temVerd = true;
        else 
          temFalso = true;
      }
  if (!temFalso)  
    return 'TAUTOLOGIA';
  if (!temVerd) 
    return 'CONTRADIÇÃO';
  return 'CONTINGÊNCIA';
}

const P: Expr = { tipo: 'atomo', nome: 'P' };
const Q: Expr = { tipo: 'atomo', nome: 'Q' };
const R: Expr = { tipo: 'atomo', nome: 'R' };
const NAO  = (x: Expr): Expr                 => ({ tipo: 'nao',     expr: x    });
const E    = (l: Expr, r: Expr): Expr        => ({ tipo: 'e',       esq: l, dir: r });
const OU   = (l: Expr, r: Expr): Expr        => ({ tipo: 'ou',      esq: l, dir: r });
const IMP  = (l: Expr, r: Expr): Expr        => ({ tipo: 'implica', esq: l, dir: r });
const SSE  = (l: Expr, r: Expr): Expr        => ({ tipo: 'sse',     esq: l, dir: r });

interface ModeloQuestao 
{
  formula: string;
  expr: Expr;
  usaR: boolean;
  topico: string;
  conectivos: string;
}

const MODELOS: ModeloQuestao[] = 
[
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

interface Questao 
{
  modelo: ModeloQuestao;
  vals: Vals;
  resposta: boolean;
  classificacao: Classificacao;
}

function embaralhar<T>(arr: T[]): T[] 
{
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) 
  {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function gerarQuestoes(dificuldade: Dificuldade): Questao[]
{
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
  timerSegundos?: number | null;
  rangeMax?: number;

  onBack: () => void;
  onOpenRanking: (filter?: string) => void;
  onRoundEnd: (winner: 1 | 2 | null) => Promise<void>;
  onNovoJogo: () => Promise<void>;
}


function TimerBar({ seconds, maxSeconds }: { seconds: number; maxSeconds: number })
{
  const pct = Math.min(100, Math.max(0, (seconds / maxSeconds))) * 100;
  const cor = seconds <= 5 ? '#ef4444' : seconds <= 10 ? '#f97316' : seconds <= Math.ceil(maxSeconds * 0.4) ? '#eab308' : '#22c55e';
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">⏱ Tempo</span>
        <span className={`text-sm font-black ${seconds <= 5 ? 'text-red-400' : 'text-white'}`}
          style={{ animation: seconds <= 5 ? 'pulse 0.5s infinite' : undefined }}>
          {seconds}s
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-linear" style={{ width: `${pct}%`, background: cor }} />
      </div>
    </div>
  );
}

function StreakBadge({ streak }: { streak: number }) 
{
  if (streak < 3) 
    return null;
  
  const { emojis, label } =
    streak >= 10 ? { emojis: '🔥🔥🔥', label: `${streak}× LENDÁRIO` } :
    streak >= 5  ? { emojis: '🔥🔥',   label: `${streak}× EM CHAMAS` } :
                   { emojis: '🔥',     label: `${streak}× Sequência` };
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{ background: 'rgba(251,146,60,0.18)', border: '1px solid rgba(251,146,60,0.45)' }}>
      <span className="text-sm">{emojis}</span>
      <span className="text-orange-300 font-black text-xs">{label}</span>
    </div>
  );
}

interface ResultadoFase {
  fase: number;
  acertos: number;
  erros: number;
}

function NameSearchInput({ value, onChange, apiUrl, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  apiUrl: string;
  placeholder?: string;
})
{
  const [suggestions, setSuggestions] = useState<{ id: string; name: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() =>
  {
    if (debounceRef.current !== undefined) clearTimeout(debounceRef.current);
    if (value.length < 2) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () =>
    {
      try
      {
        const res = await fetch(`${apiUrl}/api/players/search?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      }
      catch { setSuggestions([]); }
    }, 300);
    return () => { if (debounceRef.current !== undefined) clearTimeout(debounceRef.current); };
  }, [value, apiUrl]);

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setShowSuggestions(true); }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder={placeholder ?? 'Seu apelido de astronauta'}
        maxLength={30}
        className="w-full bg-white/5 border border-white/15 focus:border-cyan-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none transition"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-[#0c1729] border border-white/15 rounded-xl overflow-hidden shadow-xl">
          {suggestions.map((s) => (
            <button
              key={s.id}
              type="button"
              onMouseDown={() => { onChange(s.name); setShowSuggestions(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/10 transition flex items-center gap-2"
            >
              <span className="text-xs">👤</span> {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProximaFaseModal({ fase, resultado, passou, onContinuar, onEncerrar, carregando, apiUrl, onSalvar }: {
  fase: number;
  resultado: ResultadoFase;
  passou: boolean;
  onContinuar: () => void;
  onEncerrar: () => void;
  carregando?: boolean;
  apiUrl?: string;
  onSalvar?: (nome: string) => Promise<{ saved: boolean; position?: number | null; total?: number }>;
})
{
  const [saveNome, setSaveNome] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedPos, setSavedPos] = useState<{ position: number | null; total: number } | null>(null);
  const [saveErro, setSaveErro] = useState('');

  const handleSalvar = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    const nome = saveNome.trim();
    if (!nome) { setSaveErro('Digite seu apelido'); return; }
    if (!onSalvar) return;
    setSaving(true); setSaveErro('');
    try
    {
      const data = await onSalvar(nome);
      if (data?.saved) setSavedPos({ position: data.position ?? null, total: data.total ?? 0 });
      else setSaveErro('Não foi possível salvar.');
    }
    catch { setSaveErro('Erro de conexão'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(2,8,24,0.90)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-sm bg-[#0c1729] border border-white/12 rounded-3xl p-8 text-center shadow-2xl">
        <div className="text-5xl mb-3">{passou ? '🚀' : '🚨'}</div>
        <h2 className="text-2xl font-black text-white mb-1">
          {passou ? `Fase ${fase} Completa!` : 'Acesso Bloqueado!'}
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          {passou
            ? 'Missão concluída, Astronauta!'
            : 'A estação está lotada — outro piloto assume a posição.'}
        </p>

        <div className="flex gap-3 mb-3">
          <div className="flex-1 rounded-2xl p-3"
            style={{ background: 'rgba(74,222,128,0.10)', border: '1px solid rgba(74,222,128,0.30)' }}>
            <p className="text-2xl font-black text-green-400">{resultado.acertos}</p>
            <p className="text-xs text-slate-400 mt-1">✅ Acertos</p>
          </div>
          <div className="flex-1 rounded-2xl p-3"
            style={resultado.erros > 0
              ? { background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.30)' }
              : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <p className="text-2xl font-black" style={{ color: resultado.erros > 0 ? '#f87171' : '#94a3b8' }}>{resultado.erros}</p>
            <p className="text-xs text-slate-400 mt-1">❌ Erros</p>
          </div>
        </div>

        <div className={`rounded-xl px-3 py-2 text-xs font-bold text-center mb-4 ${
          passou
            ? 'border border-emerald-500/30 text-emerald-400'
            : 'border border-red-500/30 text-red-400'
        }`}
          style={{ background: passou ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)' }}>
          {passou
            ? '✅ Acertos > Erros — vaga garantida na fila!'
            : '🚫 Erros ≥ Acertos — próximo piloto na fila!'}
        </div>

        {onSalvar && apiUrl && (
          savedPos ? (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center mb-4">
              {savedPos.position != null
                ? <p className="text-amber-300 font-bold text-sm">🏆 Prêmio salvo! #{savedPos.position} de {savedPos.total}</p>
                : <p className="text-emerald-300 font-bold text-sm">✅ Prêmio salvo!</p>
              }
            </div>
          ) : (
            <form onSubmit={handleSalvar} className="mb-4 text-left">
              <p className="text-slate-400 text-xs mb-1.5">💾 Resgatar prêmio agora:</p>
              <div className="flex gap-2">
                <NameSearchInput value={saveNome} onChange={setSaveNome} apiUrl={apiUrl} placeholder="Seu apelido" />
                <button type="submit" disabled={saving || !saveNome.trim()}
                  className="px-3 py-2 rounded-xl font-bold text-xs text-white disabled:opacity-40 transition hover:opacity-90 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}>
                  {saving ? '...' : '💾'}
                </button>
              </div>
              {saveErro && <p className="text-red-400 text-xs mt-1">{saveErro}</p>}
            </form>
          )
        )}

        {passou && (
          <button
            onClick={onContinuar}
            disabled={carregando}
            className="w-full py-3 rounded-xl font-bold text-white mb-2 transition hover:opacity-90 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}
          >
            {carregando ? 'Preparando missão...' : `⚡ Fase ${fase + 1} →`}
          </button>
        )}
        <button
          onClick={onEncerrar}
          className="w-full py-3 rounded-xl font-semibold text-sm text-slate-300 transition hover:bg-white/10"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          {passou ? '🏁 Ver Pontuação Final' : '📊 Ver Resultado Final'}
        </button>
      </div>
    </div>
  );
}

const RESUMO_BG = 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.10) 0%, transparent 55%), linear-gradient(180deg, #020818 0%, #0a0f1e 100%)';

function ResumoFases({ historico, onNovoJogo, onBack, onOpenRanking, gameIdFinal, apiUrl }: {
  historico: ResultadoFase[];
  onNovoJogo: () => Promise<void>;
  onBack: () => void;
  onOpenRanking: (filter?: string) => void;
  gameIdFinal?: string;
  apiUrl?: string;
})
{
  const [loadingNovo, setLoadingNovo] = useState(false);
  const [saveNome, setSaveNome] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedPosition, setSavedPosition] = useState<{ position: number | null; total: number } | null>(null);
  const [saveErro, setSaveErro] = useState('');

  const totalAcertos = historico.reduce((s, f) => s + f.acertos, 0);
  const totalErros   = historico.reduce((s, f) => s + f.erros,   0);
  const fases        = historico.length;
  const precisao     = totalAcertos + totalErros > 0
    ? Math.round((totalAcertos / (totalAcertos + totalErros)) * 100)
    : 0;

  const handleNovo = async () =>
  {
    setLoadingNovo(true);
    try { await onNovoJogo(); } finally { setLoadingNovo(false); }
  };

  const handleSalvar = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    const nome = saveNome.trim();
    if (!nome) { setSaveErro('Digite um apelido'); return; }
    if (!gameIdFinal || !apiUrl) { setSaveErro('Sem partida disponível'); return; }
    setSaving(true); setSaveErro('');
    try
    {
      const res = await fetch(`${apiUrl}/api/games/${gameIdFinal}/save`,
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
    catch { setSaveErro('Erro de conexão'); }
    finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4"
      style={{ background: RESUMO_BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-md bg-[#0c1729] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🏁</div>
          <h2 className="text-2xl font-black text-white mb-1">Missão Encerrada</h2>
          <p className="text-slate-400 text-sm">
            {fases} fase{fases !== 1 ? 's' : ''} · {precisao}% de precisão
          </p>
        </div>

        <div className="flex gap-3 mb-5">
          <div className="flex-1 rounded-2xl p-3 text-center"
            style={{ background: 'rgba(74,222,128,0.10)', border: '1px solid rgba(74,222,128,0.25)' }}>
            <p className="text-2xl font-black text-green-400">{totalAcertos}</p>
            <p className="text-xs text-slate-400 mt-1">✅ Acertos</p>
          </div>
          <div className="flex-1 rounded-2xl p-3 text-center"
            style={{ background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.25)' }}>
            <p className="text-2xl font-black text-red-400">{totalErros}</p>
            <p className="text-xs text-slate-400 mt-1">❌ Erros</p>
          </div>
          <div className="flex-1 rounded-2xl p-3 text-center"
            style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.25)' }}>
            <p className="text-2xl font-black text-cyan-400">{fases}</p>
            <p className="text-xs text-slate-400 mt-1">🚀 Fases</p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 mb-5">
          <div className="grid grid-cols-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 px-4 py-2"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            <span>Fase</span>
            <span className="text-center">✅ Acertos</span>
            <span className="text-center">❌ Erros</span>
          </div>
          {historico.map((f) => (
            <div key={f.fase} className="grid grid-cols-3 px-4 py-2.5 border-t border-white/5">
              <span className="text-slate-300 font-bold text-sm">Fase {f.fase}</span>
              <span className="text-center text-green-400 font-bold text-sm">{f.acertos}</span>
              <span className="text-center font-bold text-sm"
                style={{ color: f.erros > 0 ? '#f87171' : '#94a3b8' }}>{f.erros}</span>
            </div>
          ))}
        </div>

        {gameIdFinal && apiUrl && (
          savedPosition ? (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center mb-4">
              {savedPosition.position != null
                ? <><p className="text-amber-300 font-bold text-sm">🏆 #{savedPosition.position} de {savedPosition.total}!</p>
                   <button onClick={() => onOpenRanking()} className="mt-1 text-xs text-amber-400 underline underline-offset-2 hover:text-amber-300 transition">Ver ranking →</button></>
                : <p className="text-emerald-300 font-bold text-sm">✅ Resultado salvo!</p>
              }
            </div>
          ) : (
            <form onSubmit={handleSalvar} className="mb-4">
              <p className="text-slate-400 text-xs mb-2">Salvar no ranking:</p>
              <div className="flex gap-2">
                <NameSearchInput value={saveNome} onChange={setSaveNome} apiUrl={apiUrl!} placeholder="Seu apelido de astronauta" />
                <button type="submit" disabled={saving || !saveNome.trim()}
                  className="px-4 py-2 rounded-xl font-bold text-xs text-white disabled:opacity-40 transition hover:opacity-90 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}>
                  {saving ? '...' : '💾'}
                </button>
              </div>
              {saveErro && <p className="text-red-400 text-xs mt-1">{saveErro}</p>}
            </form>
          )
        )}

        <div className="flex gap-3">
          <button onClick={onBack}
            className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            🏠 Menu
          </button>
          <button onClick={handleNovo} disabled={loadingNovo}
            className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition hover:opacity-90 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}>
            {loadingNovo ? '...' : '🔄 Nova Missão'}
          </button>
        </div>
      </div>
    </div>
  );
}

const BG = 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.10) 0%, transparent 55%), linear-gradient(180deg, #020818 0%, #0a0f1e 100%)';

const P1_COLOR = '#a855f7';
const P2_COLOR = '#f97316';

function direcaoLabel(d: Direcao): string
{
  if (d === 'higher') 
    return '⬆️ Frequência mais alta!';
  if (d === 'lower')  
    return '⬇️ Frequência mais baixa!';

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
  const [muted, setMuted] = useState(() => starWarsTheme.muted);

  const handleMute = () =>
  {
    if (muted) { starWarsTheme.unmute(); setMuted(false); }
    else        { starWarsTheme.mute();   setMuted(true);  }
  };

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
      <div className="flex items-center gap-2">
        <button
          onClick={handleMute}
          title={muted ? 'Ativar música' : 'Silenciar música'}
          className="flex items-center justify-center w-9 h-9 rounded-full transition"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: muted ? '#475569' : '#94a3b8' }}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <button
          onClick={onOpenRanking}
          className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition"
          style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.30)', color: '#67e8f9' }}
        >
          🏆 Ranking
        </button>
      </div>
    </header>
  );
}


function VsGame({ gameId, dificuldade, p1, p2, round, score, apiUrl, onBack, onOpenRanking, onRoundEnd }: GameProps)
{
  const [palpite, setPalpite] = useState('');
  const [historico, setHistorico] = useState<Palpite[]>([]);
  const [jogadorAtual, setJogadorAtual] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [roundOver, setRoundOver] = useState<{ winner: 1 | 2 | null; advancing: boolean } | null>(null);
  const [turnoTimer, setTurnoTimer] = useState(TIMER_VS_TURNO);
  const turnoTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const tentativasUsadas = historico.length;
  const maxTentativas = MAX_TENTATIVAS_VS;
  const nomeAtual = jogadorAtual === 1 ? p1 : p2;
  const corAtual = jogadorAtual === 1 ? P1_COLOR : P2_COLOR;

  useEffect(() => 
  {
    if (!roundOver) 
      inputRef.current?.focus();
  }, [jogadorAtual, roundOver]);

  useEffect(() => 
  {
    if (roundOver) { clearInterval(turnoTimerRef.current); return; }
    setTurnoTimer(TIMER_VS_TURNO);
    turnoTimerRef.current = setInterval(() => {
      setTurnoTimer((t) => 
      {
        if (t <= 1) 
        {
          clearInterval(turnoTimerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(turnoTimerRef.current);
  }, [jogadorAtual, roundOver]);

  useEffect(() => 
  {
    if (turnoTimer !== 0 || roundOver) return;
    const timeout: Palpite = { valor: -1, feedback: 'tempo esgotado ⏱️', direcao: 'timeout', jogador: jogadorAtual };
    setHistorico((prev) =>
    {
      const novoHistorico = [timeout, ...prev];
      if (novoHistorico.length >= maxTentativas)
      {
        setRoundOver({ winner: null, advancing: false });
      }
      else
      {
        setJogadorAtual((j) => (j === 1 ? 2 : 1));
      }
      return novoHistorico;
    });
    setErro('');
  }, [turnoTimer, roundOver, jogadorAtual, maxTentativas]);

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
        playArcadeCorrect();
        setRoundOver({ winner: jogadorAtual, advancing: false });
        return;
      }

      if (dados.gameOver || novoHistorico.length >= maxTentativas)
      {
        playArcadeError();
        setRoundOver({ winner: null, advancing: false });
        return;
      }

      playArcadeError();
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
        {!isRoundOver && (
          <span className={`ml-auto text-xs font-black px-3 py-1.5 rounded-full border ${turnoTimer <= 5 ? 'animate-pulse' : ''}`}
            style={turnoTimer <= 5
              ? { background: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.40)', color: '#f87171' }
              : turnoTimer <= 8
              ? { background: 'rgba(249,115,22,0.12)', borderColor: 'rgba(249,115,22,0.35)', color: '#fb923c' }
              : { background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.20)', color: '#86efac' }}>
            ⏱ {turnoTimer}s
          </span>
        )}
      </div>

      {/* Timer bar */}
      {!isRoundOver && (
        <div className="px-5 pb-2">
          <TimerBar seconds={turnoTimer} maxSeconds={TIMER_VS_TURNO} />
        </div>
      )}

      <main className="flex-1 flex flex-col gap-4 px-4 pb-8 max-w-lg mx-auto w-full">

        {/* Turn card */}
        {!isRoundOver &&
        (
          <div className="rounded-2xl p-4 border transition-all"
            style={{
              background: jogadorAtual === 1 ? 'rgba(6,182,212,0.10)' : 'rgba(99,102,241,0.12)',
              borderColor: jogadorAtual === 1 ? 'rgba(6,182,212,0.40)' : 'rgba(99,102,241,0.40)',
            }}
          >
            <p className="font-black text-lg flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: corAtual }} />
              <span style={{ color: corAtual }}>📡 Turno de {nomeAtual}!</span>
            </p>
            <p className="text-slate-400 text-xs mt-1.5 text-center">
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
        {lastPalpite && !isRoundOver && 
        (
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
                  {p.direcao === 'timeout' ? '⏱' : p.direcao === 'higher' ? '↑' : p.direcao === 'lower' ? '↓' : '✓'} {p.direcao === 'timeout' ? 'tempo' : p.valor}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

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

function SoloGame({ gameId, dificuldade, apiUrl, onBack, onOpenRanking, onNovoJogo, timerSegundos, rangeMax }: GameProps)
{
  const [palpite, setPalpite] = useState('');
  const [historico, setHistorico] = useState<Palpite[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingNovo, setLoadingNovo] = useState(false);
  const [erro, setErro] = useState('');
  const [ganhou, setGanhou] = useState(false);
  const [tentativaTimer, setTentativaTimer] = useState<number>(timerSegundos ?? 0);
  const tentativaTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const [faseAtual, setFaseAtual] = useState(1);
  const [historicoDeFases, setHistoricoDeFases] = useState<ResultadoFase[]>([]);
  const [mostrandoProximaFase, setMostrandoProximaFase] = useState(false);
  const [mostrandoResumo, setMostrandoResumo] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(gameId);
  const [carregandoFase, setCarregandoFase] = useState(false);
  const [fasePassou, setFasePassou] = useState(false);

  const effectiveRangeMax = rangeMax ?? RANGE_MAX[dificuldade];
  const maxTentativas = rangeMax
    ? Math.max(3, Math.ceil(Math.log2(rangeMax) * 1.5))
    : MAX_TENTATIVAS_SOLO[dificuldade];
  const tentativasUsadas = historico.length;
  const restantes = maxTentativas - tentativasUsadas;
  const progresso = tentativasUsadas / maxTentativas;
  const lastPalpite = historico[0];
  const { bg: difBg, btn: difBtn } = DIF_COLOR[dificuldade];
  const rangeLabel = rangeMax ? `Canal 1-${rangeMax.toLocaleString('pt-BR')}` : RANGE_LABEL[dificuldade];

  // Timer persistente: pausa durante requisição de rede e retoma ao terminar
  useEffect(() =>
  {
    if (!timerSegundos || ganhou || mostrandoProximaFase || mostrandoResumo || loading)
    {
      clearInterval(tentativaTimerRef.current);
      return;
    }
    clearInterval(tentativaTimerRef.current);
    const id = setInterval(() =>
    {
      setTentativaTimer((t) =>
      {
        if (t <= 1) { clearInterval(id); return 0; }
        return t - 1;
      });
    }, 1000);
    tentativaTimerRef.current = id;
    return () => clearInterval(id);
  }, [ganhou, mostrandoProximaFase, mostrandoResumo, timerSegundos, loading]);

  // Timer chegou a 0 → encerra fase com derrota
  useEffect(() =>
  {
    if (!timerSegundos || tentativaTimer !== 0 || ganhou || mostrandoProximaFase || mostrandoResumo) return;
    clearInterval(tentativaTimerRef.current);
    const errosEstaFase = historico.filter(p => p.direcao !== 'correct').length;
    setHistoricoDeFases(prev => [...prev, { fase: faseAtual, acertos: 0, erros: errosEstaFase + 1 }]);
    setMostrandoResumo(true);
  }, [tentativaTimer, ganhou, mostrandoProximaFase, mostrandoResumo, timerSegundos, faseAtual, historico]);

  useEffect(() =>
  {
    if (!ganhou && !mostrandoProximaFase && !mostrandoResumo)
      inputRef.current?.focus();
  }, [ganhou, mostrandoProximaFase, mostrandoResumo]);

  const enviarPalpite = async (e: React.FormEvent) => 
  {
    e.preventDefault();
    const valor = parseInt(palpite, 10);
    if (isNaN(valor) || valor < 1 || valor > effectiveRangeMax) {
      setErro(`Digite um número entre 1 e ${effectiveRangeMax.toLocaleString('pt-BR')}`);
      return;
    }
    setErro('');
    setLoading(true);

    try
    {
      const res = await fetch(`${apiUrl}/api/games/${currentGameId}/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: valor }),
      });

      const dados = await res.json();
      if (dados.message) { setErro(dados.message); setLoading(false); return; }

      const novo: Palpite = { valor, feedback: dados.feedback, direcao: dados.direction as Direcao, jogador: 1 };
      const novoHistorico = [novo, ...historico];
      setHistorico(novoHistorico);
      setPalpite('');

      if (dados.direction === 'correct')
      {
        playArcadeCorrect();
        if (timerSegundos) setTentativaTimer(t => Math.min(t + TIMER_BONUS_ACERTO[dificuldade], TIMER_MAX[dificuldade]));
        const errosEstaFase = novoHistorico.filter(p => p.direcao !== 'correct').length;
        const acertosEstaFase = maxTentativas - errosEstaFase;
        setFasePassou(acertosEstaFase > errosEstaFase);
        setHistoricoDeFases(prev => [...prev, { fase: faseAtual, acertos: acertosEstaFase, erros: errosEstaFase }]);
        setGanhou(true);
        setMostrandoProximaFase(true);
        return;
      }

      if (timerSegundos) setTentativaTimer(t => Math.max(1, t - TIMER_PENALIDADE));
      playArcadeError();

      if (novoHistorico.length >= maxTentativas)
      {
        const errosEstaFase = novoHistorico.filter(p => p.direcao !== 'correct').length;
        setHistoricoDeFases(prev => [...prev, { fase: faseAtual, acertos: 0, erros: errosEstaFase }]);
        setMostrandoResumo(true);
        return;
      }
    }
    catch { setErro('Erro de conexão'); }
    finally { setLoading(false); }
  };

  const handleContinuarFase = async () =>
  {
    setCarregandoFase(true);
    try
    {
      const res = await fetch(`${apiUrl}/api/games`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty: dificuldade, ...(rangeMax && { customRange: rangeMax }) }),
      });
      const g = await res.json();
      setCurrentGameId(g.id);
      setHistorico([]);
      setGanhou(false);
      setPalpite('');
      setErro('');
      if (timerSegundos) setTentativaTimer(timerSegundos);
      setFaseAtual(f => f + 1);
      setMostrandoProximaFase(false);
    }
    catch { setErro('Erro ao iniciar próxima fase'); }
    finally { setCarregandoFase(false); }
  };

  const handleEncerrarMissao = () =>
  {
    setMostrandoProximaFase(false);
    setMostrandoResumo(true);
  };

  const handleSalvarFase = async (nome: string) =>
  {
    const res = await fetch(`${apiUrl}/api/games/${currentGameId}/save`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nome }),
    });
    return res.json();
  };

  const handleNovoJogo = async () =>
  {
    setLoadingNovo(true);
    try { await onNovoJogo(); }
    finally { setLoadingNovo(false); }
  };

  if (mostrandoResumo)
  {
    return (
      <ResumoFases
        historico={historicoDeFases}
        onNovoJogo={onNovoJogo}
        onBack={onBack}
        onOpenRanking={onOpenRanking}
        gameIdFinal={currentGameId}
        apiUrl={apiUrl}
      />
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {mostrandoProximaFase && historicoDeFases.length > 0 && (
        <ProximaFaseModal
          fase={faseAtual}
          resultado={historicoDeFases[historicoDeFases.length - 1]}
          passou={fasePassou}
          onContinuar={handleContinuarFase}
          onEncerrar={handleEncerrarMissao}
          carregando={carregandoFase}
          apiUrl={apiUrl}
          onSalvar={handleSalvarFase}
        />
      )}

      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className={`${difBg} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
          {DIF_LABEL[dificuldade]} · {rangeLabel}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.20)', color: '#67e8f9' }}>
          🚀 Fase {faseAtual}
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
          <div className="text-center mb-5">
            <span className="text-3xl">📡</span>
            <h2 className="font-black text-lg text-white mt-2">Qual é a frequência de resgate?</h2>
            <p className="text-slate-400 text-sm">{rangeLabel}</p>
          </div>

          {timerSegundos && (
            <div className="mb-4">
              <TimerBar seconds={tentativaTimer} maxSeconds={timerSegundos} />
            </div>
          )}

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

          {lastPalpite && (
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

          <form onSubmit={enviarPalpite} className="flex gap-3">
            <input
              ref={inputRef}
              type="number"
              min={1}
              max={effectiveRangeMax}
              value={palpite}
              onChange={(e) => setPalpite(e.target.value)}
              placeholder={rangeLabel}
              disabled={loading || ganhou}
              className="flex-1 bg-white/5 border border-white/15 focus:border-indigo-500 rounded-xl px-4 py-3.5 text-center text-xl font-black text-white focus:outline-none transition"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !palpite || ganhou}
              className={`px-5 py-3.5 rounded-xl font-black text-white text-sm disabled:opacity-40 transition hover:opacity-90 active:scale-95 ${difBtn}`}
            >
              {loading ? '...' : 'Tentar!'}
            </button>
          </form>

          {erro && <p className="text-red-400 text-xs text-center mt-2">{erro}</p>}
        </div>

        {historico.length > 0 && (
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

function MemoriaGame({ gameId, dificuldade, p1: _p1, apiUrl, onBack, onOpenRanking, onNovoJogo }: GameProps)
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
  const [paresErrados, setParesErrados] = useState<number[]>([]);
  const [erros, setErros] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [ganhou, setGanhou] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timerRestante, setTimerRestante] = useState(MEMORIA_TIMER[dificuldade]);
  const [iniciou, setIniciou] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const finishCalledRef = useRef(false);

  const [faseAtual, setFaseAtual] = useState(1);
  const [historicoDeFases, setHistoricoDeFases] = useState<ResultadoFase[]>([]);
  const [mostrandoProximaFase, setMostrandoProximaFase] = useState(false);
  const [mostrandoResumo, setMostrandoResumo] = useState(false);
  const [carregandoFase, setCarregandoFase] = useState(false);
  const [fasePassou, setFasePassou] = useState(false);

  useEffect(() =>
  {
    if (!iniciou || ganhou || gameOver) return;
    timerRef.current = setInterval(() =>
    {
      setTimerRestante((t: number) =>
      {
        if (t <= 1) { clearInterval(timerRef.current); setGameOver(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [iniciou, ganhou, gameOver]);

  useEffect(() =>
  {
    if (!gameOver || mostrandoResumo) return;
    setHistoricoDeFases((prev) => [...prev, { fase: faseAtual, acertos: Math.floor(reveladas.size / 2), erros }]);
    setMostrandoResumo(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const paresEncontrados = reveladas.size / 2;

  const handleClique = (idx: number) =>
  {
    if (bloqueado || viradas.includes(idx) || reveladas.has(idx) || ganhou || gameOver) return;
    if (!iniciou)
      setIniciou(true);

    const novasViradas = [...viradas, idx];
    setViradas(novasViradas);

    if (novasViradas.length === 2)
    {
      setBloqueado(true);
      const [a, b] = novasViradas;
      if (cartas[a] === cartas[b])
      {
        playArcadeCorrect();
        const novasReveladas = new Set(reveladas);
        novasReveladas.add(a);
        novasReveladas.add(b);
        setReveladas(novasReveladas);
        setViradas([]);
        setBloqueado(false);
        setTimerRestante((t: number) => Math.min(t + MEMORIA_BONUS_PAR[dificuldade], TIMER_MAX[dificuldade]));
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
              body: JSON.stringify({ won: true, mistakes: erros }),
            }).catch(() => {});
          }
          const passou = totalPairs > erros;
          setFasePassou(passou);
          setHistoricoDeFases((prev) => [...prev, { fase: faseAtual, acertos: totalPairs, erros }]);
          setMostrandoProximaFase(true);
        }
      }
      else
      {
        playArcadeError();
        setErros((e) => e + 1);
        setParesErrados([a, b]);
        setTimerRestante((t: number) => Math.max(1, t - TIMER_PENALIDADE));

        setTimeout(() =>
        {
          setViradas([]);
          setParesErrados([]);
          setBloqueado(false);
        }, 900);
      }
    }
  };

  const handleContinuarFase = () =>
  {
    setCarregandoFase(true);
    clearInterval(timerRef.current);
    setCartas(gerarCartas());
    setReveladas(new Set());
    setViradas([]);
    setErros(0);
    setBloqueado(false);
    setGanhou(false);
    setGameOver(false);
    setTimerRestante(MEMORIA_TIMER[dificuldade]);
    setIniciou(false);
    setFaseAtual((f) => f + 1);
    setMostrandoProximaFase(false);
    finishCalledRef.current = false;
    setCarregandoFase(false);
  };

  const handleEncerrarMissao = () =>
  {
    setMostrandoProximaFase(false);
    setMostrandoResumo(true);
  };

  const handleSalvarFase = async (nome: string) =>
  {
    const res = await fetch(`${apiUrl}/api/games/${gameId}/save`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nome }),
    });
    return res.json();
  };

  if (mostrandoResumo)
  {
    return (
      <ResumoFases
        historico={historicoDeFases}
        onNovoJogo={onNovoJogo}
        onBack={onBack}
        onOpenRanking={onOpenRanking}
        gameIdFinal={gameId}
        apiUrl={apiUrl}
      />
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {mostrandoProximaFase && historicoDeFases.length > 0 && (
        <ProximaFaseModal
          fase={faseAtual}
          resultado={historicoDeFases[historicoDeFases.length - 1]}
          passou={fasePassou}
          onContinuar={handleContinuarFase}
          onEncerrar={handleEncerrarMissao}
          carregando={carregandoFase}
          apiUrl={apiUrl}
          onSalvar={handleSalvarFase}
        />
      )}

      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Stats bar */}
      <div className="flex items-center gap-2 px-5 py-3 flex-wrap">
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${timerRestante <= 10 ? 'animate-pulse' : ''}`}
          style={timerRestante <= 10
            ? { background: 'rgba(239,68,68,0.18)', borderColor: 'rgba(239,68,68,0.50)', color: '#f87171' }
            : timerRestante <= 30
            ? { background: 'rgba(249,115,22,0.15)', borderColor: 'rgba(249,115,22,0.45)', color: '#fb923c' }
            : { background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.35)', color: '#4ade80' }}>
          ⏱ {timerRestante}s
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.20)', color: '#67e8f9' }}>
          🚀 Fase {faseAtual}
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

      {/* Timer bar */}
      <div className="px-5 pb-2">
        <TimerBar seconds={timerRestante} maxSeconds={MEMORIA_TIMER[dificuldade]} />
      </div>

      {/* Game over banner (briefly visible before ResumoFases renders) */}
      {gameOver && !mostrandoResumo &&
      (
        <div className="mx-4 mb-2 rounded-2xl p-5 text-center border"
          style={{ background: 'rgba(239,68,68,0.10)', borderColor: 'rgba(239,68,68,0.40)' }}>
          <p className="text-3xl mb-2">💀</p>
          <p className="font-black text-lg text-red-400">Tempo esgotado! Missão falhou!</p>
          <p className="text-slate-400 text-sm mt-1">
            {paresEncontrados}/{totalPairs} pares &nbsp;·&nbsp; {erros} erro{erros !== 1 ? 's' : ''}
          </p>
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
          {cartas.map((num, idx) =>
          {
            const isErrada = paresErrados.includes(idx);
            const isVirada = viradas.includes(idx) && !isErrada;
            const isRevelada = reveladas.has(idx);
            const mostrar = viradas.includes(idx) || isRevelada;
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
                    : isErrada
                    ? 'rgba(239,68,68,0.30)'
                    : isVirada
                    ? 'rgba(99,102,241,0.35)'
                    : '#1a2d45',
                  border: isRevelada
                    ? '1.5px solid rgba(16,185,129,0.5)'
                    : isErrada
                    ? '1.5px solid rgba(239,68,68,0.6)'
                    : isVirada
                    ? '1.5px solid rgba(99,102,241,0.6)'
                    : '1.5px solid rgba(255,255,255,0.07)',
                  color: isRevelada ? '#4ade80' : isErrada ? '#f87171' : isVirada ? '#a5b4fc' : 'transparent',
                  cursor: isRevelada || ganhou || gameOver ? 'default' : 'pointer',
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
    if (!nome) 
      { setSaveErroP1('Digite um apelido'); return; }
    if (!gameIdP1) 
      { setSaveErroP1('Nenhuma partida disponível'); return; }
    setSavingP1(true);
    setSaveErroP1('');
    try
    {
      const res = await fetch(`${apiUrl}/api/games/${gameIdP1}/save`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, won: finalScore.p1 > finalScore.p2 }),
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
        body: JSON.stringify({ name: nome, won: finalScore.p2 > finalScore.p1 }),
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

function LogicaGame({ gameId, dificuldade, p1: _p1, apiUrl, onBack, onOpenRanking, onNovoJogo }: GameProps)
{
  const [questoes, setQuestoes] = useState<Questao[]>(() => gerarQuestoes(dificuldade));
  const [atual, setAtual] = useState(0);
  const [respondido, setRespondido] = useState<boolean | null>(null);
  const [erros, setErros] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [streak, setStreak] = useState(0);

  const [faseAtual, setFaseAtual] = useState(1);
  const [historicoDeFases, setHistoricoDeFases] = useState<ResultadoFase[]>([]);
  const [mostrandoProximaFase, setMostrandoProximaFase] = useState(false);
  const [mostrandoResumo, setMostrandoResumo] = useState(false);
  const [carregandoFase, setCarregandoFase] = useState(false);
  const [fasePassou, setFasePassou] = useState(false);

  const [totalTimer, setTotalTimer] = useState(TIMER_LOGICA[dificuldade]);
  const totalTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const finishRef = useRef(false);

  const questao = questoes[atual];
  const total = questoes.length;
  const meta = META_CLASSE[questao?.classificacao ?? 'CONTINGÊNCIA'];
  const acertou = respondido !== null && respondido === questao.resposta;

  // Total timer — runs continuously, pauses only at phase modal/resumo
  useEffect(() =>
  {
    if (mostrandoProximaFase || mostrandoResumo) { clearInterval(totalTimerRef.current); return; }
    clearInterval(totalTimerRef.current);
    const id = setInterval(() =>
    {
      setTotalTimer((t: number) =>
      {
        if (t <= 1) { clearInterval(id); return 0; }
        return t - 1;
      });
    }, 1000);
    totalTimerRef.current = id;
    return () => clearInterval(id);
  }, [mostrandoProximaFase, mostrandoResumo]);

  // Timer = 0 → end phase (loss)
  useEffect(() =>
  {
    if (totalTimer !== 0 || mostrandoProximaFase || mostrandoResumo) return;
    clearInterval(totalTimerRef.current);
    const totalErrosAgg = historicoDeFases.reduce((s, f) => s + f.erros, 0) + erros;
    setHistoricoDeFases((prev) => [...prev, { fase: faseAtual, acertos, erros }]);
    if (!finishRef.current)
    {
      finishRef.current = true;
      fetch(`${apiUrl}/api/games/${gameId}/finish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ won: true, mistakes: totalErrosAgg }),
      }).catch(() => {});
    }
    setMostrandoResumo(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTimer]);

  const responder = useCallback((escolha: boolean) =>
  {
    if (respondido !== null || totalTimer === 0) return;
    setRespondido(escolha);
    if (escolha !== questao.resposta)
    {
      setErros((e) => e + 1);
      setStreak(0);
      setTotalTimer((t: number) => Math.max(1, t - TIMER_PENALIDADE));
    }
    else
    {
      setAcertos((a) => a + 1);
      setStreak((s) => s + 1);
      setTotalTimer((t: number) => Math.min(t + TIMER_BONUS_ACERTO[dificuldade], TIMER_MAX[dificuldade]));
    }
  }, [respondido, questao, totalTimer, dificuldade]);

  const proximo = () =>
  {
    if (atual + 1 >= total)
    {
      clearInterval(totalTimerRef.current);
      const passou = acertos > erros;
      setFasePassou(passou);
      setHistoricoDeFases((prev) => [...prev, { fase: faseAtual, acertos, erros }]);
      setMostrandoProximaFase(true);
    }
    else
    {
      setAtual((i) => i + 1);
      setRespondido(null);
    }
  };

  const handleContinuarFase = () =>
  {
    setCarregandoFase(true);
    setQuestoes(gerarQuestoes(dificuldade));
    setAtual(0);
    setRespondido(null);
    setErros(0);
    setAcertos(0);
    setStreak(0);
    setTotalTimer(TIMER_LOGICA[dificuldade]);
    setFaseAtual((f) => f + 1);
    setMostrandoProximaFase(false);
    finishRef.current = false;
    setCarregandoFase(false);
  };

  const handleEncerrarMissao = () =>
  {
    setMostrandoProximaFase(false);
    if (!finishRef.current)
    {
      finishRef.current = true;
      const totalErrosAgg = historicoDeFases.reduce((s, f) => s + f.erros, 0);
      fetch(`${apiUrl}/api/games/${gameId}/finish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ won: true, mistakes: totalErrosAgg }),
      }).catch(() => {});
    }
    setMostrandoResumo(true);
  };

  const handleSalvarFase = async (nome: string) =>
  {
    if (!finishRef.current)
    {
      finishRef.current = true;
      const totalErrosAgg = historicoDeFases.reduce((s, f) => s + f.erros, 0);
      await fetch(`${apiUrl}/api/games/${gameId}/finish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ won: true, mistakes: totalErrosAgg }),
      });
    }
    const res = await fetch(`${apiUrl}/api/games/${gameId}/save`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nome }),
    });
    return res.json();
  };

  const vLabel = (b: boolean) => b ? 'VERDADEIRA' : 'FALSA';
  const vColor = (b: boolean) => b ? '#4ade80' : '#f87171';

  if (mostrandoResumo)
  {
    return (
      <ResumoFases
        historico={historicoDeFases}
        onNovoJogo={onNovoJogo}
        onBack={onBack}
        onOpenRanking={onOpenRanking}
        gameIdFinal={gameId}
        apiUrl={apiUrl}
      />
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {mostrandoProximaFase && historicoDeFases.length > 0 && (
        <ProximaFaseModal
          fase={faseAtual}
          resultado={historicoDeFases[historicoDeFases.length - 1]}
          passou={fasePassou}
          onContinuar={handleContinuarFase}
          onEncerrar={handleEncerrarMissao}
          carregando={carregandoFase}
          apiUrl={apiUrl}
          onSalvar={handleSalvarFase}
        />
      )}

      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Barra de progresso */}
      <div className="flex items-center gap-2 px-5 py-3 flex-wrap">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.30)', color: '#4ade80' }}>
          📡 {atual + 1}/{total}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(6,182,212,0.10)', borderColor: 'rgba(6,182,212,0.20)', color: '#67e8f9' }}>
          🚀 Fase {faseAtual}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(74,222,128,0.10)', borderColor: 'rgba(74,222,128,0.25)', color: '#4ade80' }}>
          🛰️ {acertos}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={erros > 0
            ? { background: 'rgba(248,113,113,0.10)', borderColor: 'rgba(248,113,113,0.30)', color: '#f87171' }
            : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)', color: '#94a3b8' }}>
          🔇 {erros}
        </span>
        <StreakBadge streak={streak} />
        <span className={`ml-auto text-xs font-black px-3 py-1.5 rounded-full border ${totalTimer <= 10 ? 'animate-pulse' : ''}`}
          style={totalTimer <= 10
            ? { background: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.40)', color: '#f87171' }
            : totalTimer <= 20
            ? { background: 'rgba(249,115,22,0.12)', borderColor: 'rgba(249,115,22,0.35)', color: '#fb923c' }
            : { background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.20)', color: '#86efac' }}>
          ⏱ {totalTimer}s
        </span>
      </div>

      {/* Timer bar */}
      <div className="px-5 pb-2">
        <TimerBar seconds={totalTimer} maxSeconds={TIMER_LOGICA[dificuldade]} />
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
        {respondido === null && (
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
        )}
        {respondido !== null &&
        (
          <div className="w-full">
            <div className="rounded-2xl p-4 mb-3 text-center border"
              style={acertou
                ? { background: 'rgba(74,222,128,0.10)', borderColor: 'rgba(74,222,128,0.40)' }
                : { background: 'rgba(248,113,113,0.10)', borderColor: 'rgba(248,113,113,0.40)' }}>
              <p className="text-xl font-black mb-1" style={{ color: acertou ? '#4ade80' : '#f87171' }}>
                {acertou ? `📡 Sinal decodificado! +${TIMER_BONUS_ACERTO[dificuldade]}s` : `🔇 Falha na decodificação! -${TIMER_PENALIDADE}s`}
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
              {atual + 1 >= total ? '🏁 Concluir fase' : '🛸 Próxima transmissão →'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}


interface ExercicioParenteses
{
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

const POOL_PREC: Record<Dificuldade, ExercicioParenteses[]> =
{
  EASY: POOL_EASY,
  MEDIUM: POOL_MEDIUM,
  HARD: POOL_HARD,
};

function normalizar(s: string) { return s.replace(/\s+/g, ''); }

function gerarExerciciosPrecedencia(dif: Dificuldade): ExercicioParenteses[]
{
  const pool = [...POOL_PREC[dif]].sort(() => Math.random() - 0.5);
  return pool.slice(0, PARENTESES_CONFIG[dif].count);
}

function PrecedenciaGame({ gameId, dificuldade, p1: _p1, apiUrl, onBack, onOpenRanking, onNovoJogo }: GameProps)
{
  const [exercicios, setExercicios] = useState<ExercicioParenteses[]>(() => gerarExerciciosPrecedencia(dificuldade));
  const [atual, setAtual] = useState(0);
  const [tokens, setTokens] = useState<string[]>(() => [...exercicios[0].flat]);
  const [history, setHistory] = useState<string[][]>([]);
  const [selStart, setSelStart] = useState<number | null>(null);
  const [selEnd, setSelEnd] = useState<number | null>(null);
  const [resultado, setResultado] = useState<'correto' | 'errado' | null>(null);
  const [erros, setErros] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [streak, setStreak] = useState(0);

  const [faseAtual, setFaseAtual] = useState(1);
  const [historicoDeFases, setHistoricoDeFases] = useState<ResultadoFase[]>([]);
  const [mostrandoProximaFase, setMostrandoProximaFase] = useState(false);
  const [mostrandoResumo, setMostrandoResumo] = useState(false);
  const [carregandoFase, setCarregandoFase] = useState(false);
  const [fasePassou, setFasePassou] = useState(false);

  const [totalTimer, setTotalTimer] = useState(TIMER_PRECEDENCIA[dificuldade]);
  const totalTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const finishRef = useRef(false);

  const exercicio = exercicios[atual];
  const total = exercicios.length;

  useEffect(() =>
  {
    if (mostrandoProximaFase || mostrandoResumo) { clearInterval(totalTimerRef.current); return; }
    clearInterval(totalTimerRef.current);
    const id = setInterval(() =>
    {
      setTotalTimer((t: number) =>
      {
        if (t <= 1) { clearInterval(id); return 0; }
        return t - 1;
      });
    }, 1000);
    totalTimerRef.current = id;
    return () => clearInterval(id);
  }, [mostrandoProximaFase, mostrandoResumo]);

  useEffect(() =>
  {
    if (totalTimer !== 0 || mostrandoProximaFase || mostrandoResumo) return;
    clearInterval(totalTimerRef.current);
    const totalErrosAgg = historicoDeFases.reduce((s, f) => s + f.erros, 0) + erros;
    setHistoricoDeFases((prev) => [...prev, { fase: faseAtual, acertos, erros }]);
    if (!finishRef.current)
    {
      finishRef.current = true;
      fetch(`${apiUrl}/api/games/${gameId}/finish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ won: true, mistakes: totalErrosAgg }),
      }).catch(() => {});
    }
    setMostrandoResumo(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTimer]);

  const handleTokenClick = (index: number) =>
  {
    if (resultado !== null) return;
    if (selStart === null)
    {
      setSelStart(index);
      setSelEnd(null);
    }
    else if (selEnd !== null)
    {
      setSelStart(index);
      setSelEnd(null);
    }
    else
    {
      if (index === selStart)
      {
        setSelStart(null);
      }
      else if (index > selStart)
      {
        setSelEnd(index);
      }
      else
      {
        setSelStart(index);
      }
    }
  };

  const addParens = () =>
  {
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

  const undo = () =>
  {
    if (history.length === 0) return;
    setTokens(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
    setSelStart(null);
    setSelEnd(null);
  };

  const resetExpr = () =>
  {
    setTokens([...exercicio.flat]);
    setHistory([]);
    setSelStart(null);
    setSelEnd(null);
  };

  const verificar = () =>
  {
    if (resultado !== null) return;
    const resposta = normalizar(tokens.join(''));
    const esperada = normalizar(exercicio.correta);
    const correto = resposta === esperada;
    setResultado(correto ? 'correto' : 'errado');
    if (correto)
    {
      setAcertos((a) => a + 1);
      setStreak((s) => s + 1);
      setTotalTimer((t: number) => Math.min(t + TIMER_BONUS_ACERTO[dificuldade], TIMER_MAX[dificuldade]));
    }
    else
    {
      setErros((e) => e + 1);
      setStreak(0);
      setTotalTimer((t: number) => Math.max(1, t - TIMER_PENALIDADE));
    }
  };

  const proximo = () =>
  {
    if (atual + 1 >= total)
    {
      clearInterval(totalTimerRef.current);
      const passou = acertos > erros;
      setFasePassou(passou);
      setHistoricoDeFases((prev) => [...prev, { fase: faseAtual, acertos, erros }]);
      setMostrandoProximaFase(true);
    }
    else
    {
      const next = atual + 1;
      setAtual(next);
      setTokens([...exercicios[next].flat]);
      setHistory([]);
      setSelStart(null);
      setSelEnd(null);
      setResultado(null);
    }
  };

  const handleContinuarFase = () =>
  {
    setCarregandoFase(true);
    const novos = gerarExerciciosPrecedencia(dificuldade);
    setExercicios(novos);
    setAtual(0);
    setTokens([...novos[0].flat]);
    setHistory([]);
    setSelStart(null);
    setSelEnd(null);
    setResultado(null);
    setErros(0);
    setAcertos(0);
    setStreak(0);
    setTotalTimer(TIMER_PRECEDENCIA[dificuldade]);
    setFaseAtual((f) => f + 1);
    setMostrandoProximaFase(false);
    finishRef.current = false;
    setCarregandoFase(false);
  };

  const handleEncerrarMissao = () =>
  {
    setMostrandoProximaFase(false);
    if (!finishRef.current)
    {
      finishRef.current = true;
      const totalErrosAgg = historicoDeFases.reduce((s, f) => s + f.erros, 0);
      fetch(`${apiUrl}/api/games/${gameId}/finish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ won: true, mistakes: totalErrosAgg }),
      }).catch(() => {});
    }
    setMostrandoResumo(true);
  };

  const handleSalvarFase = async (nome: string) =>
  {
    if (!finishRef.current)
    {
      finishRef.current = true;
      const totalErrosAgg = historicoDeFases.reduce((s, f) => s + f.erros, 0);
      await fetch(`${apiUrl}/api/games/${gameId}/finish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ won: true, mistakes: totalErrosAgg }),
      });
    }
    const res = await fetch(`${apiUrl}/api/games/${gameId}/save`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nome }),
    });
    return res.json();
  };

  if (mostrandoResumo)
  {
    return (
      <ResumoFases
        historico={historicoDeFases}
        onNovoJogo={onNovoJogo}
        onBack={onBack}
        onOpenRanking={onOpenRanking}
        gameIdFinal={gameId}
        apiUrl={apiUrl}
      />
    );
  }

  const canAddParens = selStart !== null && selEnd !== null && selEnd > selStart;

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {mostrandoProximaFase && historicoDeFases.length > 0 && (
        <ProximaFaseModal
          fase={faseAtual}
          resultado={historicoDeFases[historicoDeFases.length - 1]}
          passou={fasePassou}
          onContinuar={handleContinuarFase}
          onEncerrar={handleEncerrarMissao}
          carregando={carregandoFase}
          apiUrl={apiUrl}
          onSalvar={handleSalvarFase}
        />
      )}

      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Barra de progresso */}
      <div className="flex items-center gap-2 px-5 py-3 flex-wrap">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(167,139,250,0.30)', color: '#a78bfa' }}>
          ⚙️ {atual + 1}/{total}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(6,182,212,0.10)', borderColor: 'rgba(6,182,212,0.20)', color: '#67e8f9' }}>
          🚀 Fase {faseAtual}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(167,139,250,0.10)', borderColor: 'rgba(167,139,250,0.25)', color: '#a78bfa' }}>
          ✅ {acertos}
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={erros > 0
            ? { background: 'rgba(248,113,113,0.10)', borderColor: 'rgba(248,113,113,0.30)', color: '#f87171' }
            : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)', color: '#94a3b8' }}>
          ❌ {erros}
        </span>
        <StreakBadge streak={streak} />
        <span className={`ml-auto text-xs font-black px-3 py-1.5 rounded-full border ${totalTimer <= 10 ? 'animate-pulse' : ''}`}
          style={totalTimer <= 10
            ? { background: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.40)', color: '#f87171' }
            : totalTimer <= 20
            ? { background: 'rgba(249,115,22,0.12)', borderColor: 'rgba(249,115,22,0.35)', color: '#fb923c' }
            : { background: 'rgba(139,92,246,0.10)', borderColor: 'rgba(167,139,250,0.25)', color: '#c4b5fd' }}>
          ⏱ {totalTimer}s
        </span>
      </div>

      {/* Timer bar */}
      <div className="px-5 pb-2">
        <TimerBar seconds={totalTimer} maxSeconds={TIMER_PRECEDENCIA[dificuldade]} />
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
                {resultado === 'correto' ? `⚙️ Hierarquia restaurada! +${TIMER_BONUS_ACERTO[dificuldade]}s` : `🔇 Sequência incorreta! -${TIMER_PENALIDADE}s`}
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

type FaseDuelo = 'p1' | 'transicao' | 'p2' | 'resultado';

interface EstatsJogador 
{
  pares: number;
  erros: number;
  timerRestante: number;
  eliminou: boolean;
}

function MemoriaVsGame({ gameId, dificuldade, p1, p2, apiUrl, onBack, onOpenRanking }: GameProps)
{
  const { cols, rows, pairs: totalPairs } = MEMORIA_GRID[dificuldade];
  const totalCards = cols * rows;

  const gerarCartas = () =>
  {
    const nums = Array.from({ length: totalPairs }, (_, i) => i + 1);
    const pares = [...nums, ...nums];
    for (let i = pares.length - 1; i > 0; i--)
    {
      const j = Math.floor(Math.random() * (i + 1));
      [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    return pares;
  };

  const [fase, setFase] = useState<FaseDuelo>('p1');
  const [cartasP1] = useState<number[]>(() => gerarCartas());
  const [cartasP2] = useState<number[]>(() => gerarCartas());
  const cartas = fase === 'p2' || fase === 'resultado' ? cartasP2 : cartasP1;

  const [reveladas, setReveladas] = useState<Set<number>>(new Set());
  const [viradas, setViradas] = useState<number[]>([]);
  const [paresErrados, setParesErrados] = useState<number[]>([]);
  const [erros, setErros] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [ganhou, setGanhou] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timerRestante, setTimerRestante] = useState(MEMORIA_TIMER[dificuldade]);
  const [iniciou, setIniciou] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [statsP1, setStatsP1] = useState<EstatsJogador | null>(null);
  const [gameIdP2, setGameIdP2] = useState<string | null>(null);
  const finishP1Ref = useRef(false);
  const finishP2Ref = useRef(false);

  const [saveNomeP1, setSaveNomeP1] = useState(p1);
  const [savingP1, setSavingP1] = useState(false);
  const [savedPositionP1, setSavedPositionP1] = useState<{ position: number | null; total: number } | null>(null);
  const [saveErroP1, setSaveErroP1] = useState('');

  const [saveNomeP2, setSaveNomeP2] = useState(p2);
  const [savingP2, setSavingP2] = useState(false);
  const [savedPositionP2, setSavedPositionP2] = useState<{ position: number | null; total: number } | null>(null);
  const [saveErroP2, setSaveErroP2] = useState('');

  const paresEncontrados = reveladas.size / 2;
  const nomeAtual = fase === 'p2' ? p2 : p1;

  const resetForP2 = useCallback(() =>
  {
    setReveladas(new Set());
    setViradas([]);
    setErros(0);
    setBloqueado(false);
    setGanhou(false);
    setGameOver(false);
    setTimerRestante(MEMORIA_TIMER[dificuldade]);
    setIniciou(false);
    clearInterval(timerRef.current);
  }, []);

  const handleSalvarP1 = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    const nome = saveNomeP1.trim();
    if (!nome) { setSaveErroP1('Digite um apelido'); return; }
    setSavingP1(true); setSaveErroP1('');
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
        setSavedPositionP1({ position: data.position ?? null, total: data.total });
      else
        setSaveErroP1('Não foi possível salvar. Tente novamente.');
    }
    catch { setSaveErroP1('Erro de conexão'); }
    finally { setSavingP1(false); }
  };

  const handleSalvarP2 = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    const nome = saveNomeP2.trim();
    if (!nome) { setSaveErroP2('Digite um apelido'); return; }
    if (!gameIdP2) { setSaveErroP2('Partida de P2 não disponível'); return; }
    setSavingP2(true); setSaveErroP2('');
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
    catch { setSaveErroP2('Erro de conexão'); }
    finally { setSavingP2(false); }
  };

  useEffect(() =>
  {
    if (!iniciou || ganhou || gameOver) return;
    timerRef.current = setInterval(() =>
    {
      setTimerRestante((t) =>
      {
        if (t <= 1) { clearInterval(timerRef.current); setGameOver(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [iniciou, ganhou, gameOver]);

  const handleClique = (idx: number) =>
  {
    if (bloqueado || viradas.includes(idx) || reveladas.has(idx) || ganhou || gameOver) return;
    if (!iniciou) setIniciou(true);

    const novasViradas = [...viradas, idx];
    setViradas(novasViradas);

    if (novasViradas.length === 2)
    {
      setBloqueado(true);
      const [a, b] = novasViradas;
      if (cartas[a] === cartas[b])
      {
        playArcadeCorrect();
        const novasReveladas = new Set(reveladas);
        novasReveladas.add(a);
        novasReveladas.add(b);
        setReveladas(novasReveladas);
        setViradas([]);
        setBloqueado(false);
        setTimerRestante((t) => Math.min(t + MEMORIA_BONUS_PAR[dificuldade], TIMER_MAX[dificuldade]));
        if (novasReveladas.size === totalCards)
        {
          setGanhou(true);
          clearInterval(timerRef.current);
          const stats = { pares: totalPairs, erros, timerRestante: timerRestante + MEMORIA_BONUS_PAR[dificuldade], eliminou: false };
          if (fase === 'p1')
          {
            if (!finishP1Ref.current)
            {
              finishP1Ref.current = true;
              fetch(`${apiUrl}/api/games/${gameId}/finish`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ won: true, mistakes: erros }) }).catch(() => {});
            }
            setStatsP1(stats);
          }
          else
          {
            if (!finishP2Ref.current)
            {
              finishP2Ref.current = true;
              if (gameIdP2) fetch(`${apiUrl}/api/games/${gameIdP2}/finish`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ won: true, mistakes: erros }) }).catch(() => {});
            }
            setFase('resultado');
          }
        }
      }
      else
      {
        playArcadeError();
        setErros((e) => e + 1);
        setParesErrados([a, b]);
        setTimerRestante((t) => Math.max(1, t - TIMER_PENALIDADE));
        setTimeout(() => { setViradas([]); setParesErrados([]); setBloqueado(false); }, 900);
      }
    }
  };

  useEffect(() =>
  {
    if (!gameOver) return;
    const stats = { pares: paresEncontrados, erros, timerRestante: 0, eliminou: true };
    if (fase === 'p1')
    {
      if (!finishP1Ref.current)
      {
        finishP1Ref.current = true;
        fetch(`${apiUrl}/api/games/${gameId}/finish`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ won: false, mistakes: erros }) }).catch(() => {});
      }
      setStatsP1(stats);
    }
    else
    {
      if (!finishP2Ref.current)
      {
        finishP2Ref.current = true;
        if (gameIdP2) fetch(`${apiUrl}/api/games/${gameIdP2}/finish`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ won: false, mistakes: erros }) }).catch(() => {});
      }
      setFase('resultado');
    }
  }, [gameOver]);

  const handlePassarParaP2 = async () =>
  {
    resetForP2();
    try
    {
      const res = await fetch(`${apiUrl}/api/games`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty: dificuldade, gameType: 'CARD_GUESS_VS' }),
      });
      const g = await res.json();
      setGameIdP2(g.id);
    }
    catch {/* ok */}
    setFase('p2');
  };

  const vencedor = (): string | null => 
  {
    if (!statsP1) return null;
    const p2Stats = { pares: ganhou ? totalPairs : paresEncontrados, erros, timerRestante: ganhou ? timerRestante : 0, eliminou: gameOver };
    if (statsP1.eliminou && p2Stats.eliminou) return null;
    if (statsP1.eliminou) return p2;
    if (p2Stats.eliminou) return p1;
    if (statsP1.pares !== p2Stats.pares) return statsP1.pares > p2Stats.pares ? p1 : p2;
    if (statsP1.timerRestante !== p2Stats.timerRestante) return statsP1.timerRestante > p2Stats.timerRestante ? p1 : p2;
    if (statsP1.erros !== p2Stats.erros) return statsP1.erros < p2Stats.erros ? p1 : p2;
    return null;
  };

  const p2Stats = statsP1 && fase === 'resultado'
    ? { pares: ganhou ? totalPairs : paresEncontrados, erros, timerRestante: ganhou ? timerRestante : 0, eliminou: gameOver }
    : null;

  if (fase === 'transicao' && statsP1) 
  {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center px-4"
        style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="w-full max-w-sm bg-[#131d31] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
          <div className="text-5xl mb-4">⚔️</div>
          <h2 className="text-2xl font-black text-white mb-2">Vez de {p2}!</h2>
          <p className="text-slate-400 text-sm mb-6">Resultado de {p1}:</p>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 rounded-2xl p-3" style={{ background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.30)' }}>
              <p className="text-2xl font-black text-indigo-400">{statsP1.pares}/{totalPairs}</p>
              <p className="text-[10px] text-slate-400 mt-1">Pares</p>
            </div>
            <div className="flex-1 rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <p className="text-2xl font-black" style={{ color: statsP1.eliminou ? '#f87171' : '#4ade80' }}>
                {statsP1.eliminou ? '💀' : `${statsP1.timerRestante}s`}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">{statsP1.eliminou ? 'Eliminado' : 'Restante'}</p>
            </div>
            <div className="flex-1 rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <p className="text-2xl font-black text-red-400">{statsP1.erros}</p>
              <p className="text-[10px] text-slate-400 mt-1">Erros</p>
            </div>
          </div>
          <button onClick={handlePassarParaP2}
            className="w-full py-4 rounded-2xl font-black text-white text-base transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #a855f7)', boxShadow: '0 4px 20px rgba(168,85,247,0.35)' }}>
            ⚔️ Começar — {p2}!
          </button>
        </div>
      </div>
    );
  }

  if (fase === 'resultado' && statsP1 && p2Stats) {
    const win = vencedor();
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center px-4"
        style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="w-full max-w-sm bg-[#131d31] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
          <div className="text-5xl mb-4">{win ? '🏆' : '🤝'}</div>
          <h2 className="text-2xl font-black text-white mb-1">
            {win ? `${win} venceu o Duelo!` : 'Duelo empatado!'}
          </h2>
          <p className="text-slate-400 text-sm mb-6">Batalha de Mapas Estelares</p>
          <div className="flex gap-3 mb-6">
            {[{ nome: p1, stats: statsP1, cor: '#06b6d4' }, { nome: p2, stats: p2Stats, cor: '#a855f7' }].map(({ nome, stats, cor }) => (
              <div key={nome} className="flex-1 rounded-2xl p-4" style={{ border: `1px solid ${cor}40`, background: `${cor}10` }}>
                <p className="text-xs text-slate-400 truncate mb-2">{nome}</p>
                <p className="text-xl font-black" style={{ color: cor }}>{stats.pares}/{totalPairs}</p>
                <p className="text-xs text-slate-400">pares</p>
                <p className="text-sm font-bold mt-1" style={{ color: stats.eliminou ? '#f87171' : '#4ade80' }}>
                  {stats.eliminou ? '💀 elim.' : `⏱ ${stats.timerRestante}s`}
                </p>
                <p className="text-xs text-red-400">❌ {stats.erros}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 mb-4">
            <div className="rounded-xl p-3 text-left" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.20)' }}>
              <p className="text-xs font-bold mb-2" style={{ color: '#67e8f9' }}>👨‍🚀 {p1}</p>
              <SaveRankingPanel
                gameId={gameId}
                saveNome={saveNomeP1}
                setSaveNome={setSaveNomeP1}
                saving={savingP1}
                savedPosition={savedPositionP1}
                saveErro={saveErroP1}
                onSalvar={handleSalvarP1}
                onOpenRanking={() => onOpenRanking('CARD_GUESS_VS')}
              />
            </div>
            <div className="rounded-xl p-3 text-left" style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.20)' }}>
              <p className="text-xs font-bold mb-2" style={{ color: '#c084fc' }}>🚀 {p2}</p>
              <SaveRankingPanel
                gameId={gameIdP2 ?? ''}
                saveNome={saveNomeP2}
                setSaveNome={setSaveNomeP2}
                saving={savingP2}
                savedPosition={savedPositionP2}
                saveErro={saveErroP2}
                onSalvar={handleSalvarP2}
                onOpenRanking={() => onOpenRanking('CARD_GUESS_VS')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={onBack}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6d28d9, #a855f7)' }}>
              🏠 Menu Principal
            </button>
            <button onClick={() => onOpenRanking('CARD_GUESS_VS')}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-semibold text-sm text-slate-300 transition">
              🏆 Ver Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GameHeader onBack={onBack} onOpenRanking={onOpenRanking} />

      {/* Stats bar */}
      <div className="flex items-center gap-2 px-5 py-3 flex-wrap">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: fase === 'p2' ? 'rgba(168,85,247,0.15)' : 'rgba(6,182,212,0.15)', borderColor: fase === 'p2' ? 'rgba(168,85,247,0.4)' : 'rgba(6,182,212,0.4)', color: fase === 'p2' ? '#c084fc' : '#67e8f9' }}>
          {fase === 'p2' ? '🚀' : '👨‍🚀'} {nomeAtual}
        </span>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${timerRestante <= 10 ? 'animate-pulse' : ''}`}
          style={timerRestante <= 10
            ? { background: 'rgba(239,68,68,0.18)', borderColor: 'rgba(239,68,68,0.50)', color: '#f87171' }
            : timerRestante <= 30
            ? { background: 'rgba(249,115,22,0.15)', borderColor: 'rgba(249,115,22,0.45)', color: '#fb923c' }
            : { background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.35)', color: '#4ade80' }}>
          ⏱ {timerRestante}s
        </span>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
          style={{ background: 'rgba(6,182,212,0.15)', borderColor: 'rgba(6,182,212,0.4)', color: '#67e8f9' }}>
          🌕 {paresEncontrados}/{totalPairs}
        </span>
        {erros > 0 && (
          <span className="text-xs font-bold px-3 py-1.5 rounded-full border"
            style={{ background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.35)', color: '#f87171' }}>
            ❌ {erros}
          </span>
        )}
      </div>

      {/* Timer bar */}
      <div className="px-5 pb-2">
        <TimerBar seconds={timerRestante} maxSeconds={MEMORIA_TIMER[dificuldade]} />
      </div>

      {/* Game over / win banners */}
      {gameOver && 
      (
        <div className="mx-4 mb-2 rounded-2xl p-4 text-center border"
          style={{ background: 'rgba(239,68,68,0.10)', borderColor: 'rgba(239,68,68,0.40)' }}>
          <p className="font-black text-red-400">💀 {nomeAtual} foi eliminado! Tempo esgotado.</p>
          <button onClick={() => setFase('transicao')}
            className="mt-3 px-6 py-2 rounded-xl font-bold text-white text-sm transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #a855f7)' }}>
            {fase === 'p1' ? `⚔️ Vez de ${p2} →` : '🏁 Ver resultado'}
          </button>
        </div>
      )}
      {ganhou && 
      (
        <div className="mx-4 mb-2 rounded-2xl p-4 text-center border"
          style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.35)' }}>
          <p className="font-black text-cyan-400">🛸 {nomeAtual} completou o tabuleiro! +{timerRestante}s</p>
          <button onClick={() => setFase('transicao')}
            className="mt-3 px-6 py-2 rounded-xl font-bold text-white text-sm transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #a855f7)' }}>
            {fase === 'p1' ? `⚔️ Vez de ${p2} →` : '🏁 Ver resultado'}
          </button>
        </div>
      )}

      {/* Grid */}
      <main className="flex-1 px-4 pb-8 flex items-start justify-center pt-2">
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: cols >= 6 ? '6px' : '10px',
          maxWidth: cols >= 6 ? '480px' : '380px',
          width: '100%',
        }}>
          {cartas.map((num, idx) => 
          {
            const isErrada = paresErrados.includes(idx);
            const isVirada = viradas.includes(idx) && !isErrada;
            const isRevelada = reveladas.has(idx);
            const mostrar = viradas.includes(idx) || isRevelada;
            return (
              <button key={idx} onClick={() => handleClique(idx)}
                className="transition-all duration-150 active:scale-90 rounded-xl flex items-center justify-center font-black select-none"
                style={{
                  aspectRatio: '1',
                  fontSize: cols >= 6 ? '13px' : '18px',
                  background: isRevelada ? 'rgba(16,185,129,0.22)' : isErrada ? 'rgba(239,68,68,0.30)' : isVirada ? 'rgba(99,102,241,0.35)' : '#1a2d45',
                  border: isRevelada ? '1.5px solid rgba(16,185,129,0.5)' : isErrada ? '1.5px solid rgba(239,68,68,0.6)' : isVirada ? '1.5px solid rgba(99,102,241,0.6)' : '1.5px solid rgba(255,255,255,0.07)',
                  color: isRevelada ? '#4ade80' : isErrada ? '#f87171' : isVirada ? '#a5b4fc' : 'transparent',
                  cursor: isRevelada || ganhou || gameOver ? 'default' : 'pointer',
                }}>
                {mostrar ? num : <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: cols >= 6 ? '11px' : '14px' }}>?</span>}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export function Game(props: GameProps)
{
  if (props.modo === 'vs') return <VsGame {...props} />;
  if (props.modo === 'memoria') return <MemoriaGame {...props} />;
  if (props.modo === 'memoria-vs') return <MemoriaVsGame {...props} />;
  if (props.modo === 'logica') return <LogicaGame {...props} />;
  if (props.modo === 'precedencia') return <PrecedenciaGame {...props} />;
  return <SoloGame {...props} />;
}
