export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type GameType = 'NUMBER_GUESS' | 'CARD_GUESS';

export class CreateGameDto
{
  userId?: string;
  difficulty!: Difficulty;
  gameType?: GameType;
}
