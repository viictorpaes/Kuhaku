import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from '../../game/dto/create-game.dto';
import { CreateUserDto } from '../dto/user.dto';
import { GuessDto } from '../dto/guess.dto';
import { UpdateUserDto } from '../dto/user_update.dto';

@Controller('api')
export class GameController 
{
  constructor(private readonly gameService: GameService) {}

  @Post('users')
  async criarUsuario(@Body() dto: CreateUserDto) 
  {
    return this.gameService.createUser(dto.email, dto.name);
  }

  @Post('games')
  async criarJogo(@Body() dto: CreateGameDto) 
  {
    return this.gameService.createGame(dto);
  }

  @Post('games/:id/guess')
  async fazerPalpite(@Param('id') id: string, @Body() dto: GuessDto) {
    return this.gameService.makeGuess(id, dto.value);
  }

  @Get('games/:id/history')
  async obterHistoricoDoJogo(@Param('id') id: string) 
  {
    return this.gameService.getGameHistory(id);
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

  @Get('games/:id/summary')
  async resumoDoJogo(@Param('id') id: string) 
  {
    return this.gameService.getGameSummary(id);
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

  @Get('ranking/global')
  async rankingGlobal(@Query('limit') limit?: string) 
  {
    const l = limit ? parseInt(limit, 10) : 10;
    return this.gameService.getGlobalRanking(l);
  }

  @Get('ranking/user/:id')
  async rankingDoUsuario(@Param('id') id: string) 
  {
    return this.gameService.getUserRanking(id);
  }

  @Put('users/:id')
  async atualizarUsuario(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.gameService.updateUser(id, dto as any);
  }

  @Delete('users/:id')
  async removerUsuario(@Param('id') id: string) 
  {
    return this.gameService.removeUser(id);
  }
}