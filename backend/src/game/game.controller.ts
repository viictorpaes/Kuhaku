import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CreateUserDto } from './dto/user.dto';
import { GuessDto } from './dto/guess.dto';

@Controller('api')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Post('users')
	async createUser(@Body() dto: CreateUserDto) {
		return this.gameService.createUser(dto.email, dto.name);
	}

	@Post('games')
	async createGame(@Body() dto: CreateGameDto) {
		return this.gameService.createGame(dto);
	}

	@Post('games/:id/guess')
	async makeGuess(@Param('id') id: string, @Body() dto: GuessDto) {
		return this.gameService.makeGuess(id, dto.value);
	}

	@Get('games/:id/history')
	async getHistory(@Param('id') id: string) {
		return this.gameService.getGameHistory(id);
	}

	@Get('users/:id/games')
	async listUserGames(@Param('id') id: string) {
		return this.gameService.listUserGames(id);
	}
}
