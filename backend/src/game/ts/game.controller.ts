import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from '../../game/dto/create-game.dto';
import { CreateUserDto } from '..//dto/user.dto';
import { GuessDto } from '../dto/guess.dto';

@Controller('api')
export class GameController 
{
    constructor(private readonly gameService: GameService) {}

    @Post('users')
    async criarUsuario(@Body() dto: CreateUserDto) 
    {
        return this.gameService.criarUsuario(dto.email, dto.name);
    }

    @Post('games')
    async criarJogo(@Body() dto: CreateGameDto) 
    {
        return this.gameService.criarJogo(dto);
    }

    @Post('games/:id/guess')
    async fazerPalpite(@Param('id') id: string, @Body() dto: GuessDto) 
    {
        return this.gameService.fazerPalpite(id, dto.value);
    }

    @Get('games/:id/history')
    async obterHistoricoDoJogo(@Param('id') id: string) 
    {
        return this.gameService.obterHistoricoDoJogo(id);
    }

    @Get('users/:id/games')
    async listarJogosDoUsuario(@Param('id') id: string) 
    {
        return this.gameService.listarJogosDoUsuario(id);
    }
}