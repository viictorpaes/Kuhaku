export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export class CreateGameDto 
{
  userId?: string;
  difficulty!: Difficulty;
}
