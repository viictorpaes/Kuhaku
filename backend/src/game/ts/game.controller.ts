import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from '../../game/dto/create-game.dto';
import { CreateUserDto } from '../dto/user.dto';
import { GuessDto } from '../dto/guess.dto';
import { UpdateUserDto } from '../dto/user_update.dto';
import { CardGuessDto } from '../dto/card-guess.dto';

@Controller('api')
export class GameController
{
  constructor(private readonly gameService: GameService) {}

  // ── usuários ──────────────────────────────────────

  @Post('users')
  async criarUsuario(@Body() dto: CreateUserDto)
  {
    return this.gameService.createUser(dto.email, dto.name);
  }

  @Put('users/:id')
  async atualizarUsuario(@Param('id') id: string, @Body() dto: UpdateUserDto)
  {
    return this.gameService.updateUser(id, dto as any);
  }

  @Delete('users/:id')
  async removerUsuario(@Param('id') id: string)
  {
    return this.gameService.removeUser(id);
  }

  // ── jogos ─────────────────────────────────────────

  @Post('games')
  async criarJogo(@Body() dto: CreateGameDto)
  {
    return this.gameService.createGame(dto);
  }

  // Palpite para jogo de números
  @Post('games/:id/guess')
  async fazerPalpite(@Param('id') id: string, @Body() dto: GuessDto)
  {
    return this.gameService.makeGuess(id, dto.value);
  }

  // Palpite para jogo de cartas: { suit: 'SPADES'|'HEARTS'|'DIAMONDS'|'CLUBS', value: 1-13 }
  @Post('games/:id/card-guess')
  async fazerPalpiteCarta(@Param('id') id: string, @Body() dto: CardGuessDto)
  {
    return this.gameService.makeCardGuess(id, dto.suit, dto.value);
  }

  // Salva/encerra a partida (vitória ou desistência): revela o target
  @Post('games/:id/finish')
  async encerrarJogo(@Param('id') id: string)
  {
    return this.gameService.finishGame(id);
  }

  // ── consultas de jogo ─────────────────────────────

  @Get('games/:id/history')
  async obterHistoricoDoJogo(@Param('id') id: string)
  {
    return this.gameService.getGameHistory(id);
  }

  @Get('games/:id/summary')
  async resumoDoJogo(@Param('id') id: string)
  {
    return this.gameService.getGameSummary(id);
  }

  // ── consultas de usuário ──────────────────────────

  @Get('users/:id/games')
  async listarJogosDoUsuario(@Param('id') id: string)
  {
    return this.gameService.listUserGames(id);
  }

  @Get('users/:id/stats')
  async estatisticasDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserStats(id);
  }

  @Get('users/:id/achievements')
  async conquistasDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserAchievements(id);
  }

  @Get('users/:id/summary')
  async resumoCompletoDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserSummary(id);
  }

  // ── ranking ───────────────────────────────────────

  @Get('ranking/global')
  async rankingGlobal(@Query('limit') limit?: string)
  {
    return this.gameService.getGlobalRanking(limit ? parseInt(limit, 10) : 10);
  }

  @Get('ranking/user/:id')
  async rankingDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserRanking(id);
  }
}
