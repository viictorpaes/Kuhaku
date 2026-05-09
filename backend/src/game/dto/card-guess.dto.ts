export type CardSuit = 'SPADES' | 'HEARTS' | 'DIAMONDS' | 'CLUBS';

export class CardGuessDto
{
  suit!: CardSuit;
  value!: number; // 1-13: A=1, J=11, Q=12, K=13
}
