import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  console.log('🌱 Iniciando seed de usuários...');

  await prisma.user.upsert({
    where: { email: 'admin@kuhaku.local' },
    update: {},
    create: {
      email: 'admin@kuhaku.local',
      name: 'Admin Kuhaku',
    },
  });

  await prisma.user.upsert({
    where: { email: 'dev@kuhaku.local' },
    update: {},
    create: {
      email: 'dev@kuhaku.local',
      name: 'Desenvolvedor Kuhaku',
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@kuhaku.local' },
    update: {},
    create: {
      email: 'user@kuhaku.local',
      name: 'Usuário Padrão',
    },
  });

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
