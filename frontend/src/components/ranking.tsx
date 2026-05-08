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
}

const BG = 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 50%), linear-gradient(180deg, #0d1b2e 0%, #09111e 100%)';
const MEDALHAS = ['🥇', '🥈', '🥉'];

export function Ranking({ onBack, apiUrl }: RankingProps)
{
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() =>
  {
    fetch(`${apiUrl}/api/ranking/global?limit=10`)
      .then((r) => r.json())
      .then((data) => setRanking(Array.isArray(data) ? data : []))
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
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
        <div className="w-24" />
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-xl mx-auto w-full">
        {/* Trophy + title */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg shadow-orange-500/25"
            style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)' }}
          >
            🏆
          </div>
          <h1 className="text-3xl font-black text-white">Ranking</h1>
          <p className="text-slate-400 text-sm mt-1">🌐 Ranking global</p>
        </div>

        {/* List */}
        <div className="w-full bg-[#131d31] border border-white/10 rounded-2xl overflow-hidden">
          {loading && 
          (
            <div className="p-16 text-center text-slate-500 text-sm">Carregando...</div>
          )}
          {erro && !loading && 
          (
            <div className="p-16 text-center text-red-400 text-sm">
              Erro ao carregar. Verifique a conexão.
            </div>
          )}
          {!loading && !erro && ranking.length === 0 && (
            <div className="p-16 text-center">
              <div className="text-4xl mb-3">🏜️</div>
              <p className="text-slate-500 text-sm">Nenhum jogo registrado ainda.</p>
              <p className="text-slate-600 text-xs mt-1">Jogue uma partida para aparecer aqui!</p>
            </div>
          )}
          {!loading && !erro && ranking.length > 0 && (
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
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                        Adivinhação
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {entry.wins} vitória{entry.wins !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-lg" style={{ color: '#f97316' }}>
                      {(Math.round(entry.averageAttempts * 10) / 10).toFixed(1)}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">média</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-slate-600 text-xs mt-6">Menor média de tentativas = melhor posição</p>
      </main>
    </div>
  );
}
