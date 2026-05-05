export type Difficulty = 'FACIL' | 'MEDIO' | 'DIFICIL';

export class CreateGameDto 
{
  userId?: string;
  difficulty!: Difficulty;
}
