export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type GameType = 'NUMBER_GUESS' | 'VS_GUESS' | 'CARD_GUESS' | 'LOGIC_PUZZLE';

export class CreateGameDto
{
  userId?: string;
  difficulty!: Difficulty;
  gameType?: GameType;
}
