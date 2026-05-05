export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export class CreateGameDto {
  // optional user id (string)
  userId?: string;

  // difficulty must be one of: 'EASY' | 'MEDIUM' | 'HARD'
  difficulty!: Difficulty;
}
