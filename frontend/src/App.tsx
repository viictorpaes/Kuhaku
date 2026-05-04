import { useEffect, useState } from 'react';

type ApiStatus = {
  service: string;
  status: string;
  usersCount: number;
};

const highlights = ['Frontend em React + Vite', 'Backend em NestJS', 'Prisma com Postgres via Docker'];

export function App() {
  const [status, setStatus] = useState<ApiStatus | null>(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: ApiStatus) => setStatus(data))
      .catch(() => setStatus(null));
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(91,140,255,0.24),_transparent_38%),linear-gradient(180deg,_#08111f_0%,_#05070d_100%)] p-4 sm:p-8">
      <section className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-5xl place-items-center sm:min-h-[calc(100vh-4rem)]">
        <div className="w-full rounded-[28px] border border-white/10 bg-slate-950/75 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 sm:text-sm">Kuhaku</p>
          <h1 className="max-w-[12ch] text-4xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Monorepo pronto para evoluir com frontend e backend separados.
          </h1>
          <p className="mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">
          Estrutura inicial com React no frontend, NestJS no backend e Postgres via Prisma, tudo subindo com Docker Compose.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 rounded-[18px] border border-white/10 bg-white/5 px-4 py-4 sm:px-5">
            <span className="rounded-full bg-blue-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-blue-200">
              API
            </span>
            <strong className="text-sm text-slate-100 sm:text-base">
              {status ? `${status.service} · ${status.status} · ${status.usersCount} usuário(s)` : 'Conectando...'}
            </strong>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item}
                className="rounded-[18px] border border-white/10 bg-gradient-to-b from-blue-300/15 to-white/5 px-5 py-4 text-slate-100"
              >
                {item}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
