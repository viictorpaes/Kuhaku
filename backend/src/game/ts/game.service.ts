import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto, Difficulty } from '../dto/create-game.dto';

function obterLimitePorDificuldade(dificuldade: Difficulty | string): number 
{
  const difflevel = typeof dificuldade === 'string' ? dificuldade.toUpperCase(): dificuldade;

  switch (difflevel) 
  {
    case 'FACIL':
    case 'EASY':
      return 10;
    case 'MEDIO':
    case 'MEDIUM':
      return 50;
    case 'DIFICIL':
    case 'HARD':
      return 100;
    default:
      return 50;
  }
}

function obterFeedbackPorDiferenca(difflevel: number): string 
{
  if (difflevel === 0) 
    return 'acertou ✅';
  if (difflevel <= 2) 
    return 'pegando fogo 🔥🔥🔥';
  if (difflevel <= 5) 
    return 'quente 🌡️';
  if (difflevel <= 15) 
    return 'morno ☔️';
  return 'frio ❄️';
}

@Injectable()
export class GameService 
{
  constructor(private readonly prismaService: PrismaService) {}

  async criarUsuario(email: string, name?: string) 
  {
    const usuarioExistente = await this.prismaService.prisma.user.findUnique
    (
      {
        where: { email },
      }
    );

    if (usuarioExistente) 
      return usuarioExistente;

    return this.prismaService.prisma.user.create({ data: { email, name } });
  }

  async criarJogo(dto: CreateGameDto) 
  {
    const limite = obterLimitePorDificuldade(dto.difficulty);
    const alvo = Math.floor(Math.random() * limite) + 1;

    if (dto.userId) 
    {
      const usuario = await this.prismaService.prisma.user.findUnique
      (
        {
          where: { id: dto.userId },
        }
      );

      if (!usuario) 
        throw new NotFoundException('Usuário não encontrado');
    }

    const jogo = await this.prismaService.prisma.game.create
    (
      {
        data: 
        {
          userId: dto.userId ?? null,
          difficulty: dto.difficulty,
          target: alvo,
          attempts: 0,
          won: false,
        },
      }
    );

    return jogo;
  }

  async fazerPalpite
  (
    gameId: string,
    value: number,
  ): 
    Promise<{ feedback: string; diff: number } | { message: string }> 
  {
    const jogo = await this.prismaService.prisma.game.findUnique
    (
      {
        where: { id: gameId },
      }
    );

    if (!jogo) 
      throw new NotFoundException('Jogo não encontrado ❌');

    if (jogo.won) 
      return { message: 'Jogo já foi concluído ✅' };

    const diff = Math.abs(jogo.target - value);
    const feedback = obterFeedbackPorDiferenca(diff);

    await this.prismaService.prisma.guess.create
    (
      {
        data: { gameId, value, feedback },
      }
    );

    await this.prismaService.prisma.game.update
    (
      {
        where: { id: gameId },
        data: 
        {
          attempts: { increment: 1 },
          won: diff === 0 ? true : jogo.won,
        },
      }
    );

    return { feedback, diff };
  }

  async obterHistoricoDoJogo(gameId: string) 
  {
    return this.prismaService.prisma.guess.findMany
    (
      {
        where: { gameId },
        orderBy: { createdAt: 'asc' },
      }
    );
  }

  async listarJogosDoUsuario(userId: string) 
  {
    return this.prismaService.prisma.game.findMany
    (
      {
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }
    );
  }

  async obterEstatisticasDoUsuario(userId: string) 
  {
    const jogos = await this.prismaService.prisma.game.findMany
    (
      {
        where: { userId, won: true },
      }
    );

    const total = jogos.length;

    if (total === 0) 
    {
      return { total: 0, averageAttempts: 0, best: null, worst: null };
    }

    const tentativas: number[] = jogos.map((g: any) => Number(g.attempts ?? 0));

    const totalTentativas: number = tentativas.reduce
    (
      (a: number, b: number) => a + b, 0
    );

    const mediaTentativas = totalTentativas / tentativas.length;
    const melhor = Math.min(...tentativas);
    const pior = Math.max(...tentativas);

    return { total, averageAttempts: mediaTentativas, best: melhor, worst: pior };
  }

  async obterRankingGlobal(limit = 10) 
  {
    const usuarios = await this.prismaService.prisma.user.findMany
    (
      {
        include: { games: true },
      }
    );

    const ranking = usuarios
      .map
      (
        (u: any) => 
        {
          const wins = (u.games || [])
            .filter((g: any) => g.won)
            .map((g: any) => Number(g.attempts ?? 0));
          
          if (wins.length === 0) return null;
          
          const avg = wins.reduce((a: number, b: number) => a + b, 0) / wins.length;

          return {
            userId: u.id,
            name: u.name ?? u.email,
            averageAttempts: avg,
            wins: wins.length,
          };
        }
      )
      .filter(Boolean)
      .sort((a: any, b: any) => a.averageAttempts - b.averageAttempts)
      .slice(0, limit);

    return ranking;
  }

  async obterRankingDoUsuario(userId: string) 
  {
    const ranking = await this.obterRankingGlobal(1000);
    const index = ranking.findIndex((r: any) => r.userId === userId);

    if (index === -1) 
      return { position: null, total: ranking.length };

    return { position: index + 1, total: ranking.length, entry: ranking[index] };
  }

  async atualizarUsuario(userId: string, dto: { name?: string; email?: string }) 
  {
    return this.prismaService.prisma.user.update
    (
      {
        where: { id: userId },
        data: dto,
      }
    );
  }

  async obterResumoDoJogo(gameId: string) 
  {
    const jogo = await this.prismaService.prisma.game.findUnique
    (
      {
        where: { id: gameId },
        include: { guesses: true },
      }
    );

    if (!jogo) 
      throw new NotFoundException('Jogo não encontrado ❌');

    const palpites = (jogo.guesses || []).sort
    (
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    const primeiro = palpites[0];
    const ultimo = palpites[palpites.length - 1];
    const durationMs =
      primeiro && ultimo
        ? new Date(ultimo.createdAt).getTime() - new Date(primeiro.createdAt).getTime()
        : null;

    return {
      gameId: jogo.id,
      userId: jogo.userId,
      difficulty: jogo.difficulty,
      target: jogo.won ? jogo.target : null,
      attempts: jogo.attempts,
      won: jogo.won,
      guesses: palpites.map((g: any) => (
        {
          value: g.value,
          feedback: g.feedback,
          createdAt: g.createdAt,
        }
      )),
      durationMs,
    };
  }

  async obterConquistasDoUsuario(userId: string) 
  {
    const jogos = await this.prismaService.prisma.game.findMany
    (
      {
        where: { userId },
        include: { guesses: true },
        orderBy: { createdAt: 'asc' },
      }
    );

    const vitorias = jogos.filter((g: any) => g.won);

    const fastestWinAttempts = vitorias.length
      ? Math.min(...vitorias.map((g: any) => g.attempts))
      : null;

    const duracoesVitorias = vitorias
      .map((g: any) => 
      {
        const palpites = (g.guesses || []).sort
        (
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        if (palpites.length < 1) return null;

        const primeiro = palpites[0];
        const ultimo = palpites[palpites.length - 1];

        return primeiro && ultimo
          ? new Date(ultimo.createdAt).getTime() - new Date(primeiro.createdAt).getTime()
          : null;
      })
      .filter(Boolean) as number[];

    const fastestWinTimeMs = duracoesVitorias.length ? Math.min(...duracoesVitorias) : null;

    let bestStreak = 0;
    let current = 0;
    for (const g of jogos) 
    {
      if (g.won) 
      {
        current += 1;
      } 
      else 
      {
        current = 0;
      }

      if (current > bestStreak) bestStreak = current;
    }

    return {
      totalGames: jogos.length,
      totalWins: vitorias.length,
      fastestWinAttempts,
      fastestWinTimeMs,
      bestStreak,
    };
  }

  async obterResumoDoUsuario(userId: string) 
  {
    const status = await this.obterEstatisticasDoUsuario(userId);
    const conquistas = await this.obterConquistasDoUsuario(userId);
    const rankingUsuario = await this.obterRankingDoUsuario(userId);
    return { stats: status, achievements: conquistas, ranking: rankingUsuario };
  }
}

async removerUsuario(userId: string) 
  {
    const usuario = await this.prismaService.prisma.user.findUnique
    (
      {
        where: { id: userId },
      }
    );

    if (!usuario) 
      throw new NotFoundException('Usuário não encontrado');

    return this.prismaService.prisma.user.delete
    (
      {
        where: { id: userId },
      }
    );
  }