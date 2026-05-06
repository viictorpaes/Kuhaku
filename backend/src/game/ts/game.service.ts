import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto, Difficulty } from '../dto/create-game.dto';

function getLimitByDifficulty(difficulty: Difficulty | string): number {
  const d = typeof difficulty === 'string' ? difficulty.toUpperCase() : difficulty;
  switch (d) {
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

function getFeedbackByDifference(diff: number): string 
{
  if (diff === 0) return 'acertou ✅';
  if (diff <= 2) return 'pegando fogo 🔥🔥🔥';
  if (diff <= 5) return 'quente 🌡️';
  if (diff <= 15) return 'morno ☔️';
  return 'frio ❄️';
}

@Injectable()
export class GameService 
{
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(email: string, name?: string) {
    const existing = await this.prismaService.prisma.user.findUnique({ where: { email } });
    if (existing) return existing;
    return this.prismaService.prisma.user.create({ data: { email, name } });
  }
  async criarUsuario(email: string, name?: string) {
    return this.createUser(email, name);
  }

  async updateUser(userId: string, dto: { name?: string; email?: string }) 
  {
    return this.prismaService.prisma.user.update({ where: { id: userId }, data: dto });
  }

  async removeUser(userId: string) 
  {
    const usuario = await this.prismaService.prisma.user.findUnique({ where: { id: userId } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return this.prismaService.prisma.user.delete({ where: { id: userId } });
  }

  // Games
  async createGame(dto: CreateGameDto) 
  {
    const limit = getLimitByDifficulty(dto.difficulty);
    const target = Math.floor(Math.random() * limit) + 1;

    if (dto.userId) 
      {
      const user = await this.prismaService.prisma.user.findUnique({ where: { id: dto.userId } });
      if (!user) 
        throw new NotFoundException('Usuário não encontrado');
    }

    return this.prismaService.prisma.game.create
    (
      {
        data: 
        {
          userId: dto.userId ?? null,
          difficulty: dto.difficulty,
          target,
          attempts: 0,
          won: false,
        },
    });
  }
  async criarJogo(dto: CreateGameDto) 
  {
    return this.createGame(dto);
  }

  async makeGuess(gameId: string, value: number): Promise<{ feedback: string; diff: number } | { message: string }> 
  {
    const game = await this.prismaService.prisma.game.findUnique({ where: { id: gameId } });
    if (!game)
       throw new NotFoundException('Jogo não encontrado ❌');
    if (game.won) 
        return { message: 'Jogo já foi concluído ✅' };

    const diff = Math.abs(game.target - value);
    const feedback = getFeedbackByDifference(diff);

    await this.prismaService.prisma.guess.create({ data: { gameId, value, feedback } });
    await this.prismaService.prisma.game.update({ where: { id: gameId }, data: { attempts: { increment: 1 }, won: diff === 0 ? true : game.won } });

    return { feedback, diff };
  }
  async fazerPalpite(gameId: string, value: number) 
  {
    return this.makeGuess(gameId, value);
  }

  async getGameHistory(gameId: string) 
  {
    return this.prismaService.prisma.guess.findMany({ where: { gameId }, orderBy: { createdAt: 'asc' } });
  }
  async obterHistoricoDoJogo(gameId: string) 
  {
    return this.getGameHistory(gameId);
  }

  async listUserGames(userId: string) 
  {
    return this.prismaService.prisma.game.findMany({ where: { userId }, orderBy: 
      { createdAt: 'desc' } });
  }
  async listarJogosDoUsuario(userId: string) 
  {
    return this.listUserGames(userId);
  }

  async getUserStats(userId: string) 
  {
    const games = await this.prismaService.prisma.game.findMany({ where: { userId, won: true } });
    const total = games.length;
    if (total === 0) 
      return { total: 0, averageAttempts: 0, best: null, worst: null };

    const attempts: number[] = games.map((g: any) => Number(g.attempts ?? 0));
    const totalAttempts = attempts.reduce((a, b) => a + b, 0);
    const avg = totalAttempts / attempts.length;
    const best = Math.min(...attempts);
    const worst = Math.max(...attempts);

    return { total, averageAttempts: avg, best, worst };
  }
  async obterEstatisticasDoUsuario(userId: string) 
  {
    return this.getUserStats(userId);
  }

  async getGlobalRanking(limit = 10) 
  {
    const users = await this.prismaService.prisma.user.findMany({ include: { games: true } });
    const ranking = users
      .map((u: any) => 
        {
        const wins = (u.games || []).filter((g: any) => g.won).map((g: any) => Number(g.attempts ?? 0));
        if (wins.length === 0) return null;
        const avg = wins.reduce((a: number, b: number) => a + b, 0) / wins.length;
        return { userId: u.id, name: u.name ?? u.email, averageAttempts: avg, wins: wins.length };
      })

      .filter(Boolean)
      .sort((a: any, b: any) => a.averageAttempts - b.averageAttempts)
      .slice(0, limit);

    return ranking;
  }
  async obterRankingGlobal(limit = 10) 
  {
    return this.getGlobalRanking(limit);
  }

  async getUserRanking(userId: string) 
  {
    const ranking = await this.getGlobalRanking(1000);
    const index = ranking.findIndex((r: any) => r.userId === userId);
    if (index === -1) 
        return { position: null, total: ranking.length };
    return { position: index + 1, total: ranking.length, entry: ranking[index] };
  }
  async obterRankingDoUsuario(userId: string) 
  {
    return this.getUserRanking(userId);
  }

  async getGameSummary(gameId: string) 
  {
    const game = await this.prismaService.prisma.game.findUnique({ where: { id: gameId }, include: { guesses: true } });
    if (!game) throw new NotFoundException('Jogo não encontrado ❌');

    const guesses = (game.guesses || []).sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const first = guesses[0];
    const last = guesses[guesses.length - 1];
    const durationMs = first && last ? new Date(last.createdAt).getTime() - new Date(first.createdAt).getTime() : null;

    return {
      gameId: game.id,
      userId: game.userId,
      difficulty: game.difficulty,
      target: game.won ? game.target : null,
      attempts: game.attempts,
      won: game.won,
      guesses: guesses.map((g: any) => ({ value: g.value, feedback: g.feedback, createdAt: g.createdAt })),
      durationMs,
    };
  }
  async obterResumoDoJogo(gameId: string) 
  {
    return this.getGameSummary(gameId);
  }

  async getUserAchievements(userId: string) 
  {
    const games = await this.prismaService.prisma.game.findMany({ where: { userId }, include: { guesses: true }, orderBy: { createdAt: 'asc' } });
    const wins = games.filter((g: any) => g.won);

    const fastestWinAttempts = wins.length ? Math.min(...wins.map((g: any) => g.attempts)) : null;

    const winDurations = wins
      .map
      ( (g: any) => 
        {
          const guesses = (g.guesses || []).sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          if (guesses.length < 1) return null;
          const first = guesses[0];
          const last = guesses[guesses.length - 1];
          return first && last ? new Date(last.createdAt).getTime() - new Date(first.createdAt).getTime() : null;
      
        }
      )

      .filter(Boolean) as number[];

    const fastestWinTimeMs = winDurations.length ? Math.min(...winDurations) : null;

    let bestStreak = 0;
    let current = 0;
    for (const g of games) 
      {
      if (g.won) current += 1;
      else current = 0;
      if (current > bestStreak) bestStreak = current;
    }

    return { totalGames: games.length, totalWins: wins.length, fastestWinAttempts, fastestWinTimeMs, bestStreak };
  }
  async obterConquistasDoUsuario(userId: string) 
  {
    return this.getUserAchievements(userId);
  }

  async getUserSummary(userId: string) 
  {
    const stats = await this.getUserStats(userId);
    const achievements = await this.getUserAchievements(userId);
    const ranking = await this.getUserRanking(userId);
    return { stats, achievements, ranking };
  }
  async obterResumoDoUsuario(userId: string) 
  {
    return this.getUserSummary(userId);
  }
}