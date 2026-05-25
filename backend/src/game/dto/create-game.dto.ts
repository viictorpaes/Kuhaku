export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type GameType = 'NUMBER_GUESS' | 'VS_GUESS' | 'CARD_GUESS' | 'CARD_GUESS_VS' | 'LOGIC_PUZZLE' | 'PRECEDENCE_PUZZLE';

export class CreateGameDto
{
  userId?: string;
  difficulty!: Difficulty;
  gameType?: GameType;
  customRange?: number;
}