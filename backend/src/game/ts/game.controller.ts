import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from '../../game/dto/create-game.dto';
import { CreateUserDto } from '../dto/user.dto';
import { GuessDto } from '../dto/guess.dto';
import { UpdateUserDto } from '../dto/user_update.dto';

@Controller('api')
export class GameController
{
  constructor(private readonly gameService: GameService) 
  {}

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

  @Post('games')
  async criarJogo(@Body() dto: CreateGameDto)
  {
    return this.gameService.createGame(dto);
  }

  @Post('games/:id/guess')
  async fazerPalpite(@Param('id') id: string, @Body() dto: GuessDto)
  {
    return this.gameService.makeGuess(id, dto.value);
  }

  
  @Post('games/:id/finish')
  async encerrarJogo(@Param('id') id: string, @Body() body?: { won?: boolean; mistakes?: number })
  {
    return this.gameService.finishGame(id, body?.won, body?.mistakes);
  }

  @Post('games/:id/save')
  async salvarNoRanking(@Param('id') id: string, @Body() body: { name: string })
  {
    return this.gameService.saveGameToRanking(id, body.name);
  }

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

  @Get('players/search')
  async buscarJogadores(@Query('q') q: string)
  {
    if (!q || q.length < 2) return [];
    return this.gameService.searchPlayersByName(q);
  }

  @Get('ranking/global')
  async rankingGlobal(@Query('limit') limit?: string, @Query('gameType') gameType?: string)
  {
    return this.gameService.getGlobalRanking(limit ? parseInt(limit, 10) : 10, gameType);
  }

  @Get('ranking/user/:id')
  async rankingDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserRanking(id);
  }
}