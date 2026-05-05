import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto, Difficulty } from './dto/create-game.dto';

function obterLimitePorDificuldade(dificuldade: Difficulty | string): number 
{
  switch (dificuldade) 
  {
    case 'FACIL':
      return 10;
    case 'MEDIO':
      return 50;
    case 'DIFICIL':
      return 100;
    default:
      return 50;
  }
}

function obterFeedbackPorDiferenca(diff: number): string 
{
  if (diff === 0) 
    return 'acertou ✅';
  if (diff <= 2) 
    return 'pegando fogo 🔥🔥🔥';
  if (diff <= 5) 
    return 'quente 🌡️';
  if (diff <= 15) 
    return 'morno ☔️';
  return 'frio ❄️';
}


@Injectable()
export class GameService 
{
  constructor(private readonly prismaService: PrismaService) {}

  async criarUsuario(email: string, name?: string) 
  {
    const usuarioExistente = await this.prismaService.prisma.user.findUnique({ where: { email } });
    if (usuarioExistente) return usuarioExistente;
    return this.prismaService.prisma.user.create({ data: { email, name } });
  }

  async criarJogo(dto: CreateGameDto) 
  {
    const limite = obterLimitePorDificuldade(dto.difficulty);
    const alvo = Math.floor(Math.random() * limite) + 1;

    if (dto.userId) {
      const usuario = await this.prismaService.prisma.user.findUnique
      ({ where: { id: dto.userId } });

      if (!usuario) throw new NotFoundException('Usuário não encontrado');
    }

    const jogo = await this.prismaService.prisma.game.create({
      data: {
        userId: dto.userId ?? null,
        difficulty: dto.difficulty,
        target: alvo,
        attempts: 0,
        won: false,
      },
    });

    return jogo;
  }

  async fazerPalpite(gameId: string, value: number): Promise<{ feedback: string; diff: number } | { message: string }> 
  {
    const jogo = await this.prismaService.prisma.game.findUnique({ where: { id: gameId } });

    if (!jogo) throw new NotFoundException('Jogo não encontrado');

    if (jogo.won) return { message: 'Jogo já foi concluído' };

    const diff = Math.abs(jogo.target - value);
    const feedback = obterFeedbackPorDiferenca(diff);

    await this.prismaService.prisma.guess.create({ data: { gameId, value, feedback }});

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
    return this.prismaService.prisma.guess.findMany({ where: { gameId }, orderBy: { createdAt: 'asc' } });
  }

  async listarJogosDoUsuario(userId: string) 
  {
    return this.prismaService.prisma.game.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }
}