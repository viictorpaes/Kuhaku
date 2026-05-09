import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Difficulty } from '@prisma/client';
import { Pool } from 'pg';

const SUITS    = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;
const SYMBOLS  = ['♠', '♥', '♦', '♣'] as const;
const LABELS   = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'] as const;
type  CardSuit = typeof SUITS[number];

function cardLimitByDifficulty(d: Difficulty): number
{
  if (d === 'EASY')   return 13;
  if (d === 'MEDIUM') return 26;
  return 52;
}

function encodeCard(suit: CardSuit, value: number): number
{
  return SUITS.indexOf(suit) * 13 + value;
}

function decodeCard(encoded: number)
{
  const suitIndex = Math.floor((encoded - 1) / 13);
  const value     = ((encoded - 1) % 13) + 1;
  return { suit: SUITS[suitIndex] as CardSuit, value, display: `${LABELS[value - 1]}${SYMBOLS[suitIndex]}` };
}

function cardFeedback(target: number, guess: number): { feedback: string; direction: 'higher' | 'lower' | 'correct' | 'wrong_suit' }
{
  const t = decodeCard(target);
  const g = decodeCard(guess);
  if (target === guess)    return { feedback: 'acertou ✅', direction: 'correct'    };
  if (t.value === g.value) return { feedback: 'valor certo, categoria errada 🎯', direction: 'wrong_suit' };
  return t.value > g.value
    ? { feedback: 'valor maior ⬆️', direction: 'higher' }
    : { feedback: 'valor menor ⬇️', direction: 'lower'  };
}

const pool = new Pool
(
  {
    connectionString: process.env.DATABASE_URL,
  }
);

const adapter = new PrismaPg(pool);
const prismaClient = new PrismaClient({ adapter });

function randomInt(min: number, max: number)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function limitByDifficulty(d: Difficulty)
{
  if (d === 'EASY')   return 10;
  if (d === 'MEDIUM') return 50;
  return 100;
}

function feedbackByDiff(diff: number)
{
  if (diff === 0)  return 'acertou ✅';
  if (diff <= 2)   return 'pegando fogo 🔥🔥🔥';
  if (diff <= 5)   return 'quente 🌡️';
  if (diff <= 15)  return 'morno ☔️';
  return 'frio ❄️';
}

async function seedGameForUser(userId: string, difficulty: Difficulty)
{
  const limit = limitByDifficulty(difficulty);
  const target = randomInt(1, limit);

  const game = await prismaClient.game.create
  (
    {
      data: { userId, difficulty, target, attempts: 0, won: false },
    }
  );

  let current = randomInt(1, limit);
  let attempts = 0;
  const guessHistory: number[] = [];

  while (current !== target && attempts < 7)
  {
    guessHistory.push(current);
    const diff = Math.abs(target - current);
    const feedback = feedbackByDiff(diff);

    await prismaClient.guess.create
    (
      {
        data: { gameId: game.id, value: current, feedback },
      }
    );
    attempts++;

    const step = Math.max(1, Math.ceil((Math.abs(target - current)) / 2));
    current = current < target ? current + step : current - step;
  }

  guessHistory.push(target);
  await prismaClient.guess.create
  (
    {
      data: { gameId: game.id, value: target, feedback: 'acertou ✅' },
    }
  );
  attempts++;

  await prismaClient.game.update
  (
    {
      where: { id: game.id },
      data: { attempts, won: true, endedAt: new Date() },
    }
  );

  return { gameId: game.id, difficulty, target, attempts };
}

async function seedCardGameForUser(userId: string, difficulty: Difficulty)
{
  const limit         = cardLimitByDifficulty(difficulty);
  const target        = randomInt(1, limit);
  const targetDecoded = decodeCard(target);

  const game = await prismaClient.game.create(
  {
    data: { userId, difficulty, target, attempts: 0, won: false, gameType: 'CARD_GUESS' as any },
  });

  const guesses: Array<{ value: number; feedback: string }> = [];

  let low = 1, high = 13;
  while (low <= high)
  {
    const mid    = Math.floor((low + high) / 2);
    const guess  = encodeCard('SPADES', mid);
    const result = cardFeedback(target, guess);
    guesses.push({ value: guess, feedback: result.feedback });
    if (result.direction === 'correct')    break;
    if (result.direction === 'wrong_suit') break;
    if (result.direction === 'higher') low  = mid + 1;
    else                               high = mid - 1;
  }

 const lastDirection = cardFeedback(target, guesses[guesses.length - 1].value).direction;
  if (lastDirection === 'wrong_suit')
  {
    const suitsInDeck = SUITS.slice(0, limit / 13) as CardSuit[];
    for (const suit of suitsInDeck)
    {
      if (suit === 'SPADES') continue;
      const guess  = encodeCard(suit, targetDecoded.value);
      const result = cardFeedback(target, guess);
      guesses.push({ value: guess, feedback: result.feedback });
      if (result.direction === 'correct') break;
    }
  }

  for (const g of guesses)
    await prismaClient.guess.create({ data: { gameId: game.id, value: g.value, feedback: g.feedback } });

  await prismaClient.game.update(
  {
    where: { id: game.id },
    data:  { attempts: guesses.length, won: true, endedAt: new Date() },
  });

  return { gameId: game.id, difficulty, targetCard: targetDecoded.display, attempts: guesses.length };
}

async function main()
{
  console.log('🎮 Iniciando seed de games e guesses...');

  try
  {
    const users = await prismaClient.user.findMany();
    if (users.length === 0)
    {
      console.error('❌ Nenhum usuário encontrado. Rode test-user.ts primeiro.');
      return;
    }

    const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

    for (const user of users)
    {
      console.log(`\n👤 ${user.name ?? user.email}`);

      for (const difficulty of difficulties)
      {
        const result = await seedGameForUser(user.id, difficulty);
        console.log(`  ✅ NUMBER_GUESS ${difficulty}: target=${result.target}, tentativas=${result.attempts} (game: ${result.gameId})`);
      }

      for (const difficulty of difficulties)
      {
        const result = await seedCardGameForUser(user.id, difficulty);
        console.log(`  ✅ CARD_GUESS   ${difficulty}: target=${result.targetCard}, tentativas=${result.attempts} (game: ${result.gameId})`);
      }
    }

    console.log('\n✅ Seed de games concluído com sucesso!');
  }
  catch (error)
  {
    console.error(`Erro: ${error}`);
  }
  finally
  {
    await prismaClient.$disconnect();
    await pool.end();
  }
}

main().catch
(
  (error) =>
  {
    console.error(error);
    process.exitCode = 1;
  }
  
);
