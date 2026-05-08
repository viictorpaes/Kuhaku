import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto, Difficulty, GameType } from '../dto/create-game.dto';
import { CardSuit } from '../dto/card-guess.dto';

const SUITS = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;
const SUIT_SYMBOLS = ['♠', '♥', '♦', '♣'] as const;
const CARD_VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;



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

// Feedback proporcional ao intervalo: evita que os limiares fixos sejam inúteis no EASY
function getNumberFeedback(diff: number, limit: number): string
{
  if (diff === 0)                           return 'acertou ✅';
  if (diff <= Math.ceil(limit * 0.10))      return 'pegando fogo 🔥🔥🔥';
  if (diff <= Math.ceil(limit * 0.20))      return 'quente 🌡️';
  if (diff <= Math.ceil(limit * 0.40))      return 'morno ☔️';
  return 'frio ❄️';
}

// ──────────────── helpers de carta ────────────────

// Tamanho do deck varia com a dificuldade:
//   EASY   → só ♠ (13 cartas)
//   MEDIUM → ♠ + ♥ (26 cartas)
//   HARD   → baralho completo (52 cartas)
function getCardLimitByDifficulty(difficulty: Difficulty): number
{
  switch (difficulty)
  {
    case 'EASY':   return 13;
    case 'MEDIUM': return 26;
    case 'HARD':   return 52;
  }
}

function decodeCard(encoded: number): { suit: CardSuit; value: number; display: string }
{
  const suitIndex = Math.floor((encoded - 1) / 13);
  const value     = ((encoded - 1) % 13) + 1;
  return {
    suit:    SUITS[suitIndex] as CardSuit,
    value,
    display: `${CARD_VALUES[value - 1]}${SUIT_SYMBOLS[suitIndex]}`,
  };
}

function encodeCard(suit: CardSuit, value: number): number
{
  const suitIndex = SUITS.findIndex(s => s === suit);
  return suitIndex * 13 + value;
}

function getCardFeedback(
  target: number,
  guess: number,
): { feedback: string; direction: 'higher' | 'lower' | 'correct' | 'wrong_suit' }
{
  const t = decodeCard(target);
  const g = decodeCard(guess);

  if (target === guess)    return { feedback: 'acertou ✅',                   direction: 'correct'    };
  if (t.value === g.value) return { feedback: 'valor certo, naipe errado 🎯', direction: 'wrong_suit' };

  const isHigher = t.value > g.value;
  return {
    feedback:  isHigher ? 'valor maior ⬆️' : 'valor menor ⬇️',
    direction: isHigher ? 'higher'         : 'lower',
  };
}

// ──────────────── service ────────────────

@Injectable()
export class GameService
{
  constructor(private readonly prismaService: PrismaService) {}

  // ── usuários ──────────────────────────────────────

  async createUser(email: string, name?: string)
  {
    const existing = await this.prismaService.prisma.user.findUnique({ where: { email } });
    if (existing) return existing;
    return this.prismaService.prisma.user.create({ data: { email, name } });
  }

  async updateUser(userId: string, dto: { name?: string; email?: string })
  {
    return this.prismaService.prisma.user.update({ where: { id: userId }, data: dto });
  }

  async removeUser(userId: string)
  {
    const user = await this.prismaService.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return this.prismaService.prisma.user.delete({ where: { id: userId } });
  }

  // ── criação de jogo ───────────────────────────────

  async createGame(dto: CreateGameDto)
  {
    const gameType: GameType = dto.gameType ?? 'NUMBER_GUESS';

    const limit =
      gameType === 'CARD_GUESS'
        ? getCardLimitByDifficulty(dto.difficulty)
        : getLimitByDifficulty(dto.difficulty);

    const target = Math.floor(Math.random() * limit) + 1;

    if (dto.userId)
    {
      const user = await this.prismaService.prisma.user.findUnique({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('Usuário não encontrado');
    }

    return this.prismaService.prisma.game.create({
      data: {
        userId:     dto.userId ?? null,
        gameType,
        difficulty: dto.difficulty,
        target,
        attempts:   0,
        won:        false,
      },
    });
  }

  // ── palpite: jogo de números ──────────────────────

  async makeGuess(gameId: string, value: number): Promise<any>
  {
    const game = await this.prismaService.prisma.game.findUnique({ where: { id: gameId } });
    if (!game) throw new NotFoundException('Jogo não encontrado ❌');
    if (game.won || game.endedAt) return { message: 'Jogo já foi concluído ✅' };

    const gameType = (game as any).gameType as GameType ?? 'NUMBER_GUESS';
    if (gameType === 'CARD_GUESS')
      throw new BadRequestException('Use o endpoint /card-guess para jogos de cartas');

    const difficulty = game.difficulty as Difficulty;
    const limit      = getLimitByDifficulty(difficulty);

    if (!Number.isInteger(value) || value < 1 || value > limit)
      throw new BadRequestException(`Palpite deve ser um inteiro entre 1 e ${limit} para dificuldade ${difficulty}`);

    const diff      = Math.abs(game.target - value);
    const feedback  = getNumberFeedback(diff, limit);
    const isWon     = diff === 0;
    const maxAttempts = getMaxAttempts(difficulty);
    const newAttempts = game.attempts + 1;
    const isGameOver  = !isWon && newAttempts >= maxAttempts;

    await this.prismaService.prisma.guess.create({ data: { gameId, value, feedback } });
    await this.prismaService.prisma.game.update({
      where: { id: gameId },
      data: {
        attempts: { increment: 1 },
        won:      isWon,
        endedAt:  isWon || isGameOver ? new Date() : undefined,
      },
    });

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

  // ── palpite: jogo de cartas ───────────────────────

  async makeCardGuess(gameId: string, suit: CardSuit, value: number): Promise<any>
  {
    const game = await this.prismaService.prisma.game.findUnique({ where: { id: gameId } });
    if (!game) throw new NotFoundException('Jogo não encontrado ❌');
    if (game.won || game.endedAt) return { message: 'Jogo já foi concluído ✅' };

    const gameType = (game as any).gameType as GameType ?? 'NUMBER_GUESS';
    if (gameType !== 'CARD_GUESS')
      throw new BadRequestException('Este jogo não é do tipo cartas. Use o endpoint /guess');

    const difficulty   = game.difficulty as Difficulty;
    const cardLimit    = getCardLimitByDifficulty(difficulty);
    const maxSuitIndex = Math.floor((cardLimit - 1) / 13);
    const suitIndex    = SUITS.findIndex(s => s === suit);

    if (suitIndex === -1)
      throw new BadRequestException('Naipe inválido. Use: SPADES, HEARTS, DIAMONDS ou CLUBS');

    if (suitIndex > maxSuitIndex)
    {
      const allowed = SUITS.slice(0, maxSuitIndex + 1).join(', ');
      throw new BadRequestException(`Naipe indisponível para ${difficulty}. Permitidos: ${allowed}`);
    }

    if (!Number.isInteger(value) || value < 1 || value > 13)
      throw new BadRequestException('Valor da carta deve ser inteiro entre 1 (Ás) e 13 (Rei)');

    const encodedGuess           = encodeCard(suit, value);
    const { feedback, direction } = getCardFeedback(game.target, encodedGuess);
    const isWon                  = encodedGuess === game.target;
    const maxAttempts            = getMaxAttempts(difficulty);
    const newAttempts            = game.attempts + 1;
    const isGameOver             = !isWon && newAttempts >= maxAttempts;

    await this.prismaService.prisma.guess.create({ data: { gameId, value: encodedGuess, feedback } });
    await this.prismaService.prisma.game.update({
      where: { id: gameId },
      data: {
        attempts: { increment: 1 },
        won:      isWon,
        endedAt:  isWon || isGameOver ? new Date() : undefined,
      },
    });

    const targetCard = decodeCard(game.target);

    return {
      feedback,
      direction,
      guessedCard:  decodeCard(encodedGuess).display,
      attemptsLeft: isWon || isGameOver ? 0 : maxAttempts - newAttempts,
      ...(isWon     && { won: true,       targetCard: targetCard.display }),
      ...(isGameOver && { gameOver: true,  targetCard: targetCard.display }),
    };
  }

  // ── salvar/encerrar partida ───────────────────────

  // Chamado quando o usuário clica "Salvar" ao fim do jogo (vitória ou desistência).
  // Se o jogo ainda não tiver endedAt, marca como encerrado (desistência).
  // Em ambos os casos revela o target.
  async finishGame(gameId: string): Promise<any>
  {
    const game = await this.prismaService.prisma.game.findUnique({
      where: { id: gameId },
      include: { guesses: true },
    });
    if (!game) throw new NotFoundException('Jogo não encontrado ❌');

    if (!game.endedAt)
    {
      await this.prismaService.prisma.game.update({
        where: { id: gameId },
        data:  { endedAt: new Date() },
      });
    }

    const gameType = (game as any).gameType as GameType ?? 'NUMBER_GUESS';

    return {
      gameId:       game.id,
      gameType,
      difficulty:   game.difficulty,
      won:          game.won,
      attempts:     game.attempts,
      target:       game.target,
      totalGuesses: (game.guesses ?? []).length,
      ...(gameType === 'CARD_GUESS' && { targetCard: decodeCard(game.target).display }),
    };
  }

  // ── histórico e resumo ────────────────────────────

  async getGameHistory(gameId: string)
  {
    const [game, guesses] = await Promise.all([
      this.prismaService.prisma.game.findUnique({ where: { id: gameId } }),
      this.prismaService.prisma.guess.findMany({ where: { gameId }, orderBy: { createdAt: 'asc' } }),
    ]);

    if (!game) throw new NotFoundException('Jogo não encontrado ❌');

    const gameType = (game as any).gameType as GameType ?? 'NUMBER_GUESS';
    if (gameType === 'CARD_GUESS')
      return guesses.map((g: any) => ({ ...g, card: decodeCard(g.value).display }));

    return guesses;
  }

  async getGameSummary(gameId: string)
  {
    const game = await this.prismaService.prisma.game.findUnique({
      where:   { id: gameId },
      include: { guesses: true },
    });
    if (!game) throw new NotFoundException('Jogo não encontrado ❌');

    const guesses = (game.guesses ?? []).sort(
      (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    const first      = guesses[0];
    const last       = guesses[guesses.length - 1];
    const durationMs =
      first && last
        ? new Date(last.createdAt).getTime() - new Date(first.createdAt).getTime()
        : null;

    const gameType = (game as any).gameType as GameType ?? 'NUMBER_GUESS';
    const isOver   = game.won || !!game.endedAt;

    return {
      gameId:    game.id,
      userId:    game.userId,
      gameType,
      difficulty: game.difficulty,
      target:    isOver ? game.target : null,
      ...(isOver && gameType === 'CARD_GUESS' && { targetCard: decodeCard(game.target).display }),
      attempts:  game.attempts,
      won:       game.won,
      guesses:   guesses.map((g: any) => ({
        value:     g.value,
        feedback:  g.feedback,
        createdAt: g.createdAt,
        ...(gameType === 'CARD_GUESS' && { card: decodeCard(g.value).display }),
      })),
      durationMs,
    };
  }

  async listUserGames(userId: string)
  {
    return this.prismaService.prisma.game.findMany({
      where:   { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ── estatísticas e ranking ────────────────────────

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

  async getGlobalRanking(limit = 10)
  {
    const users = await this.prismaService.prisma.user.findMany({ include: { games: true } });
    return users
      .map((u: any) =>
      {
        const wins = (u.games ?? []).filter((g: any) => g.won).map((g: any) => Number(g.attempts ?? 0));
        if (wins.length === 0) return null;
        const avg = wins.reduce((a: number, b: number) => a + b, 0) / wins.length;
        return { userId: u.id, name: u.name ?? u.email, averageAttempts: avg, wins: wins.length };
      })
      .filter(Boolean)
      .sort((a: any, b: any) => a.averageAttempts - b.averageAttempts)
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
    const games = await this.prismaService.prisma.game.findMany({
      where:   { userId },
      include: { guesses: true },
      orderBy: { createdAt: 'asc' },
    });
    const wins = games.filter((g: any) => g.won);

    const fastestWinAttempts = wins.length ? Math.min(...wins.map((g: any) => g.attempts)) : null;

    const winDurations = wins
      .map((g: any) =>
      {
        const sorted = (g.guesses ?? []).sort(
          (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        if (sorted.length < 1) return null;
        const first = sorted[0];
        const last  = sorted[sorted.length - 1];
        return first && last
          ? new Date(last.createdAt).getTime() - new Date(first.createdAt).getTime()
          : null;
      })
      .filter(Boolean) as number[];

    const fastestWinTimeMs = winDurations.length ? Math.min(...winDurations) : null;

    let bestStreak = 0;
    let current    = 0;
    for (const g of games)
    {
      if (g.won) current += 1;
      else current = 0;
      if (current > bestStreak) bestStreak = current;
    }

    return { totalGames: games.length, totalWins: wins.length, fastestWinAttempts, fastestWinTimeMs, bestStreak };
  }

  async getUserSummary(userId: string)
  {
    const [stats, achievements, ranking] = await Promise.all([
      this.getUserStats(userId),
      this.getUserAchievements(userId),
      this.getUserRanking(userId),
    ]);
    return { stats, achievements, ranking };
  }
}
