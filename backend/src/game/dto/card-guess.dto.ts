export type CardSuit = 'SPADES' | 'HEARTS' | 'DIAMONDS' | 'CLUBS';

export class CardGuessDto
{
  suit!: CardSuit;
  value!: number;
}