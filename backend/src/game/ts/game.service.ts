import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto, Difficulty, GameType } from '../dto/create-game.dto';

function getLimitByDifficulty(difficulty: Difficulty): number
{
  switch (difficulty)
  {
    case 'EASY':   return 10;
    case 'MEDIUM': return 50;
    case 'HARD':   return 100;
  }
}

function getMaxAttempts(difficulty: Difficulty): number
{
  switch (difficulty)
  {
    case 'EASY':   return 5;
    case 'MEDIUM': return 7;
    case 'HARD':   return 10;
  }
}

function getNumberFeedback(diff: number, limit: number): string
{
  if (diff === 0) return 'acertou ✅';
  if (diff <= Math.ceil(limit * 0.10)) return 'pegando fogo 🔥🔥🔥';
  if (diff <= Math.ceil(limit * 0.20)) return 'quente 🌡️';
  if (diff <= Math.ceil(limit * 0.40)) return 'morno ☔️';
  else
    return 'frio ❄️';
}

@Injectable()
export class GameService
{
  constructor(private readonly prismaService: PrismaService) {}


  async createUser(email: string, name?: string)
  {
    const existing = await this.prismaService.prisma.user.findUnique({ where: { email } });
    if (existing)
      return existing;
    return this.prismaService.prisma.user.create({ data: { email, name } });
  }

  async updateUser(userId: string, dto: { name?: string; email?: string })
  {
    return this.prismaService.prisma.user.update({ where: { id: userId }, data: dto });
  }

  async removeUser(userId: string)
  {
    const user = await this.prismaService.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      throw new NotFoundException('Usuário não encontrado');
    return this.prismaService.prisma.user.delete({ where: { id: userId } });
  }


  async createGame(dto: CreateGameDto)
  {
    const gameType: GameType = dto.gameType ?? 'NUMBER_GUESS';
    const limit = dto.customRange ?? getLimitByDifficulty(dto.difficulty);
    const target = gameType === 'LOGIC_PUZZLE' ? 0 : Math.floor(Math.random() * limit) + 1;

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
          userId:     dto.userId ?? null,
          gameType,
          difficulty: dto.difficulty,
          target,
          maxRange:   dto.customRange ?? null,
          attempts:   0,
          won:        false,
        },
      }
    );
  }

  async makeGuess(gameId: string, value: number): Promise<any>
  {
    const game = await this.prismaService.prisma.game.findUnique({ where: { id: gameId } });
    if (!game)
        throw new NotFoundException('Jogo não encontrado ❌');

    if (game.won || game.endedAt)
        return { message: 'Jogo já foi concluído ✅' };

    const difficulty = game.difficulty as Difficulty;
    const limit  = (game as any).maxRange ?? getLimitByDifficulty(difficulty);

    if (!Number.isInteger(value) || value < 1 || value > limit)
      throw new BadRequestException(`Palpite deve ser um inteiro entre: 1 e ${limit} para a dificuldade ${difficulty}`);

    const diff = Math.abs(game.target - value);
    const feedback = getNumberFeedback(diff, limit);
    const isWon = diff === 0;
    const gameType = (game as any).gameType as GameType ?? 'NUMBER_GUESS';
    const maxAttempts = gameType === 'VS_GUESS' ? 12 : getMaxAttempts(difficulty);
    const newAttempts = game.attempts + 1;
    const isGameOver  = !isWon && newAttempts >= maxAttempts;

    await this.prismaService.prisma.guess.create({ data: { gameId, value, feedback } });
    await this.prismaService.prisma.game.update
    (
      {
        where: { id: gameId },
        data:
        {
          attempts: { increment: 1 },
          won:      isWon,
          endedAt:  isWon || isGameOver ? new Date() : undefined,
        },
      }
    );

    const direction: 'higher' | 'lower' | 'correct' =
      diff === 0 ? 'correct' : game.target > value ? 'higher' : 'lower';

    return {
      feedback,
      diff,
      direction,
      attemptsLeft: isWon || isGameOver ? 0 : maxAttempts - newAttempts,
      ...(isWon     && { won: true }),
      ...(isGameOver && { gameOver: true, target: game.target }),
    };
  }


  async finishGame(gameId: string, won?: boolean, mistakes?: number): Promise<any>
  {
    const game = await this.prismaService.prisma.game.findUnique
    (
      {
        where: { id: gameId },
        include: { guesses: true },
      }
    );
    if (!game)
        throw new NotFoundException('Jogo não encontrado ❌');

    const gameType = (game as any).gameType as GameType ?? 'NUMBER_GUESS';
    const updateData: Record<string, any> = {};
    if (!game.endedAt) updateData.endedAt = new Date();
    if (won !== undefined) updateData.won = won;
    if (['LOGIC_PUZZLE', 'PRECEDENCE_PUZZLE', 'CARD_GUESS', 'CARD_GUESS_VS'].includes(gameType) && mistakes !== undefined)
      updateData.attempts = mistakes;

    if (Object.keys(updateData).length > 0)
    {
      await this.prismaService.prisma.game.update
      (
        {
          where: { id: gameId },
          data:  updateData,
        }
      );
    }

    const finalWon = won !== undefined ? won : game.won;

    return {
      gameId:       game.id,
      gameType,
      difficulty:   game.difficulty,
      won:          finalWon,
      attempts:     game.attempts,
      target:       game.target,
      totalGuesses: (game.guesses ?? []).length,
    };
  }

  async getGameHistory(gameId: string)
  {
    const [game, guesses] = await Promise.all
    (
      [
        this.prismaService.prisma.game.findUnique({ where: { id: gameId } }),
        this.prismaService.prisma.guess.findMany({ where: { gameId }, orderBy: { createdAt: 'asc' } }),
      ]
    );

    if (!game)
        throw new NotFoundException('Jogo não encontrado ❌');

    return guesses;
  }

  async getGameSummary(gameId: string)
  {
    const game = await this.prismaService.prisma.game.findUnique
    (
      {
        where:   { id: gameId },
        include: { guesses: true },
      }
    );

    if (!game)
        throw new NotFoundException('Jogo não encontrado ❌');

    const guesses = (game.guesses ?? []).sort(
      (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    const first = guesses[0];
    const last = guesses[guesses.length - 1];
    const durationMs =
      first && last
        ? new Date(last.createdAt).getTime() - new Date(first.createdAt).getTime()
        : null;

    const gameType = (game as any).gameType as GameType ?? 'NUMBER_GUESS';
    const isOver = game.won || !!game.endedAt;

    return {
      gameId:    game.id,
      userId:    game.userId,
      gameType,
      difficulty: game.difficulty,
      target:    isOver ? game.target : null,
      attempts:  game.attempts,
      won:       game.won,
      guesses:   guesses.map((g: any) => ({
        value:     g.value,
        feedback:  g.feedback,
        createdAt: g.createdAt,
      })),
      durationMs,
    };
  }

  async listUserGames(userId: string)
  {
    return this.prismaService.prisma.game.findMany
    (
      {
        where:   { userId },
        orderBy: { createdAt: 'desc' },
      }
    );
  }

  async getUserStats(userId: string)
  {
    const allGames = await this.prismaService.prisma.game.findMany({ where: { userId } });
    const wonGames = allGames.filter((g: any) => g.won);

    if (wonGames.length === 0)
      return { totalGames: allGames.length, wins: 0, losses: allGames.length, averageAttempts: 0, best: null, worst: null };

    const attempts: number[] = wonGames.map((g: any) => Number(g.attempts ?? 0));
    const totalAttempts = attempts.reduce((a: number, b: number) => a + b, 0);

    return {
      totalGames:      allGames.length,
      wins:            wonGames.length,
      losses:          allGames.length - wonGames.length,
      averageAttempts: totalAttempts / wonGames.length,
      best:            Math.min(...attempts),
      worst:           Math.max(...attempts),
    };
  }

  async saveGameToRanking(gameId: string, name: string, won?: boolean)
  {
    const game = await this.prismaService.prisma.game.findUnique
    ({ where: { id: gameId } });
    if (!game)
        throw new NotFoundException('Jogo não encontrado ❌');

    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@kuhaku.player`;
    let user = await this.prismaService.prisma.user.findUnique({ where: { email } });
    if (!user)
      user = await this.prismaService.prisma.user.create({ data: { email, name } });

    await this.prismaService.prisma.game.update
    (
      {
        where: { id: gameId },
        data:  {
          userId: user.id,
          ...(won !== undefined && { won }),
        },
      }
    );

    const ranking = await this.getUserRanking(user.id);
    return { saved: true, ...ranking };
  }

  async getGlobalRanking(limit = 10, gameType?: string)
  {
    const VS_TYPES = ['VS_GUESS', 'CARD_GUESS_VS'];
    const isVsMode = gameType ? VS_TYPES.includes(gameType) : false;

    const users = await this.prismaService.prisma.user.findMany
    ({ include: { games: true } });

    return users.map((u: any) =>
      {
        let games = (u.games ?? []) as any[];
        if (gameType) games = games.filter((g: any) => g.gameType === gameType);

        const finishedGames = games.filter((g: any) => g.endedAt !== null || g.won);
        const wonGames      = finishedGames.filter((g: any) => g.won);
        const wonAttempts   = wonGames.map((g: any) => Number(g.attempts ?? 0));
        const losses        = finishedGames.length - wonGames.length;

        if (wonAttempts.length === 0 && (!isVsMode || losses === 0))
          return null;

        const totalGames = finishedGames.length;
        const winRate    = wonAttempts.length / Math.max(totalGames, 1);

        if (wonAttempts.length === 0)
        {
          return {
            userId:           u.id,
            name:             u.name ?? u.email,
            averageAttempts:  null,
            medianAttempts:   null,
            modeAttempts:     null,
            bestAttempts:     null,
            weightedAttempts: Infinity,
            wins:             0,
            losses,
            totalGames,
            winRate:          0,
          };
        }

        const sorted = [...wonAttempts].sort((a, b) => a - b);
        const avg    = sorted.reduce((a, b) => a + b, 0) / sorted.length;
        const best   = sorted[0];

        const mid    = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0
          ? (sorted[mid - 1] + sorted[mid]) / 2
          : sorted[mid];

        const freq: Record<number, number> = {};
        for (const v of sorted) freq[v] = (freq[v] ?? 0) + 1;
        const maxFreq = Math.max(...Object.values(freq));
        const modes   = Object.entries(freq)
          .filter(([, f]) => f === maxFreq)
          .map(([v]) => Number(v));
        const mode = modes.reduce((a, b) => a + b, 0) / modes.length;

        const weightedAttempts = median * 0.5 + avg * 0.3 + mode * 0.2;

        return {
          userId:           u.id,
          name:             u.name ?? u.email,
          averageAttempts:  avg,
          medianAttempts:   median,
          modeAttempts:     mode,
          bestAttempts:     best,
          weightedAttempts,
          wins:             wonAttempts.length,
          losses,
          totalGames,
          winRate,
        };
      }
    )
      .filter(Boolean)
      .sort((a: any, b: any) =>
      {
        if (isVsMode)
        {
          if (b.wins !== a.wins) return b.wins - a.wins;
          const mA = a.medianAttempts ?? Infinity;
          const mB = b.medianAttempts ?? Infinity;
          if (mA !== mB) return mA - mB;
          return (a.averageAttempts ?? Infinity) - (b.averageAttempts ?? Infinity);
        }

        if (b.winRate !== a.winRate)
          return b.winRate - a.winRate;
        if (a.weightedAttempts !== b.weightedAttempts)
          return a.weightedAttempts - b.weightedAttempts;

        return a.averageAttempts - b.averageAttempts;
      })
      .slice(0, limit);
  }

  async getUserRanking(userId: string)
  {
    const ranking = await this.getGlobalRanking(1000);
    const index   = ranking.findIndex((r: any) => r.userId === userId);
    if (index === -1) return { position: null, total: ranking.length };
    return { position: index + 1, total: ranking.length, entry: ranking[index] };
  }

  async getUserAchievements(userId: string)
  {
    const games = await this.prismaService.prisma.game.findMany
    (
      {
        where:   { userId },
        include: { guesses: true },
        orderBy: { createdAt: 'asc' },
      }
    );

    const wins = games.filter((g: any) => g.won);

    const fastestWinAttempts = wins.length ? Math.min(...wins.map((g: any) => g.attempts)) : null;

    const winDurations = wins
      .map((g: any) =>
      {
        const sorted = (g.guesses ?? []).sort(
          (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        if (sorted.length < 1)
          return null;
        const first = sorted[0];
        const last  = sorted[sorted.length - 1];
        return first && last
          ? new Date(last.createdAt).getTime() - new Date(first.createdAt).getTime()
          : null;
      })
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

  async searchPlayersByName(q: string): Promise<{ id: string; name: string }[]>
  {
    const users = await this.prismaService.prisma.user.findMany
    ({
      where: { name: { contains: q, mode: 'insensitive' } },
      take: 6,
      select: { id: true, name: true },
    });
    return users.filter((u: any) => u.name) as { id: string; name: string }[];
  }

  async getUserSummary(userId: string)
  {
    const [stats, achievements, ranking] = await Promise.all
    (
      [
        this.getUserStats(userId),
        this.getUserAchievements(userId),
        this.getUserRanking(userId),
      ]
    );
    return { stats, achievements, ranking };
  }
}
