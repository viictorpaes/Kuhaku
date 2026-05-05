import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto, Difficulty } from './dto/create-game.dto';

function getRangeForDifficulty(difficulty: Difficulty | string): number {
  switch (difficulty) {
    case 'EASY':
      return 10;
    case 'MEDIUM':
      return 50;
    case 'HARD':
      return 100;
    default:
      return 50;
  }
}

function feedbackForDifference(diff: number): string {
  if (diff === 0) return 'acertou ✅';
  if (diff <= 2) return 'pegando fogo 🔥🔥🔥';
  if (diff <= 5) return 'quente 🌡️';
  if (diff <= 15) return 'morno ☔️';
  return 'frio ❄️';
}

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(email: string, name?: string) {
    const existing = await this.prismaService.prisma.user.findUnique({ where: { email } });
    if (existing) return existing;
    return this.prismaService.prisma.user.create({ data: { email, name } });
  }

  async createGame(dto: CreateGameDto) {
    const range = getRangeForDifficulty(dto.difficulty);
    const target = Math.floor(Math.random() * range) + 1;

    if (dto.userId) {
      const user = await this.prismaService.prisma.user.findUnique({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('User not found');
    }

    const game = await this.prismaService.prisma.game.create({
      data: {
        userId: dto.userId ?? null,
        difficulty: dto.difficulty as any,
        target,
        attempts: 0,
        won: false,
      },
    });

    return game;
  }

  async makeGuess(gameId: string, value: number) {
    const game = await this.prismaService.prisma.game.findUnique({ where: { id: gameId } });
    if (!game) throw new NotFoundException('Game not found');
    if (game.won) return { message: 'Game already won' };

    const diff = Math.abs(game.target - value);
    const feedback = feedbackForDifference(diff);

    await this.prismaService.prisma.guess.create({ data: { gameId, value, feedback } });

    await this.prismaService.prisma.game.update({
      where: { id: gameId },
      data: {
        attempts: { increment: 1 },
        won: diff === 0 ? true : game.won,
      },
    });

    return { feedback, diff };
  }

  async getGameHistory(gameId: string) {
    return this.prismaService.prisma.guess.findMany({ where: { gameId }, orderBy: { createdAt: 'asc' } });
  }

  async listUserGames(userId: string) {
    return this.prismaService.prisma.game.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }
}