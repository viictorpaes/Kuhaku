import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Difficulty } from '@prisma/client';
import { Pool } from 'pg';

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
        console.log(`  ✅ ${difficulty}: target=${result.target}, tentativas=${result.attempts} (game: ${result.gameId})`);
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
