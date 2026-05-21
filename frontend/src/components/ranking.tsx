import { useEffect, useState } from 'react';

interface RankingEntry
{
  userId: string;
  name: string;
  averageAttempts: number;
  wins: number;
}

interface RankingProps
{
  onBack: () => void;
  apiUrl: string;
  initialFilter?: GameTypeFilter;
}

export type GameTypeFilter = 'all' | 'NUMBER_GUESS' | 'VS_GUESS' | 'CARD_GUESS' | 'LOGIC_PUZZLE' | 'PRECEDENCE_PUZZLE';

const TABS: { label: string; value: GameTypeFilter }[] =
[
  { label: '🌌 Galáxia',               value: 'all'                },
  { label: '📡 Batalha de Sinais',     value: 'VS_GUESS'           },
  { label: '🔭 Operação Resgate',      value: 'NUMBER_GUESS'       },
  { label: '🌕 Mapas Estrelares',      value: 'CARD_GUESS'         },
  { label: '🧠 Protocolo Lógico',      value: 'LOGIC_PUZZLE'       },
  { label: '⚙️ Hierarquia de Cmds',    value: 'PRECEDENCE_PUZZLE'  },
];

const BG = 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.12) 0%, transparent 50%), linear-gradient(180deg, #020818 0%, #0a0f1e 100%)';
const MEDALHAS = ['🥇', '🥈', '🥉'];

const SUBTITULO: Record<GameTypeFilter, string> =
{
  all:               '🌌 Ranking Galáctico — todos os astronautas',
  VS_GUESS:          '📡 Batalha de Sinais — ambos se cadastram ao final',
  NUMBER_GUESS:      '🔭 Operação Resgate — missões solo',
  CARD_GUESS:        '🌕 Mapas Estelares — jogo da memória',
  LOGIC_PUZZLE:      '🧠 Protocolo Lógico — menor número de erros',
  PRECEDENCE_PUZZLE: '⚙️ Hierarquia de Comandos — precedência de operadores',
};

const BADGE_LABEL: Record<GameTypeFilter, string> =
{
  all:               '🌌 Geral',
  VS_GUESS:          '📡 Batalha',
  NUMBER_GUESS:      '🔭 Resgate',
  CARD_GUESS:        '🌕 Mapas',
  LOGIC_PUZZLE:      '🧠 Protocolo',
  PRECEDENCE_PUZZLE: '⚙️ Hierarquia',
};


export function Ranking({ onBack, apiUrl, initialFilter }: RankingProps)
{
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro]       = useState(false);
  const [filtro, setFiltro]   = useState<GameTypeFilter>(initialFilter ?? 'all');

  useEffect(() =>
  {
    setLoading(true);
    setErro(false);
    const query = filtro === 'all' ? '' : `&gameType=${filtro}`;
    fetch(`${apiUrl}/api/ranking/global?limit=10${query}`)
      .then((r) => r.json())
      .then((data) => setRanking(Array.isArray(data) ? data : []))
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, [apiUrl, filtro]);

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-300 px-4 py-2 rounded-full transition"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
        >
          🛸 Base Espacial
        </button>
        <span className="font-black text-sm">
          <span className="text-white">👨‍🚀 Kuha</span><span style={{ color: '#06b6d4' }}>ku</span>
        </span>
        <div className="w-28" />
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-xl mx-auto w-full">

        {/* Ícone + título */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', boxShadow: '0 0 40px rgba(6,182,212,0.35)' }}
          >
            🏆
          </div>
          <h1 className="text-3xl font-black text-white">Hall da Fama</h1>
          <p className="text-slate-400 text-sm mt-1 text-center">{SUBTITULO[filtro]}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 w-full mb-4">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFiltro(tab.value)}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition"
              style={filtro === tab.value
                ? { background: 'linear-gradient(135deg, #0284c7, #06b6d4)', color: '#fff' }
                : { background: 'rgba(6,182,212,0.06)', color: '#94a3b8', border: '1px solid rgba(6,182,212,0.18)' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#0c1729', border: '1px solid rgba(6,182,212,0.15)' }}>
          {loading &&
            (
              <div className="p-16 text-center text-slate-500 text-sm">🛰️ Carregando transmissão...</div>
            )
          }
          {erro && !loading &&
            (
              <div className="p-16 text-center text-red-400 text-sm">
              Falha na transmissão. Verifique a conexão.
              </div>
            )
          }
          {!loading && !erro && ranking.length === 0 &&
            (
              <div className="p-16 text-center">
              <div className="text-4xl mb-3">🌌</div>
              <p className="text-slate-500 text-sm">Nenhuma missão registrada ainda.</p>
              <p className="text-slate-600 text-xs mt-1">Complete uma missão para aparecer aqui!</p>
              </div>
            )
          }
          {!loading && !erro && ranking.length > 0 &&
          (
            <div className="divide-y divide-white/5">
              {ranking.map((entry, i) => (
                <div key={entry.userId} className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition">
                  <span className="text-xl w-8 text-center shrink-0 font-black">
                    {i < 3
                      ? MEDALHAS[i]
                      : <span className="text-slate-500 text-sm">{i + 1}</span>
                    }
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-100 truncate">{entry.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(6,182,212,0.15)', color: '#67e8f9' }}>
                        {BADGE_LABEL[filtro]}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {entry.wins} missão{entry.wins !== 1 ? 'ões' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-lg" style={{ color: filtro === 'LOGIC_PUZZLE' ? '#4ade80' : '#06b6d4' }}>
                      {(Math.round(entry.averageAttempts * 10) / 10).toFixed(1)}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                      {filtro === 'LOGIC_PUZZLE' ? 'erros' : 'média'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-slate-600 text-xs mt-6">
          {filtro === 'LOGIC_PUZZLE'
            ? 'Menor número de erros = astronauta de elite lógico'
            : 'Menor média de tentativas = astronauta de elite'}
        </p>
      </main>
    </div>
  );
}
