import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const pool = new Pool
(
  {
  connectionString: process.env.DATABASE_URL,
}
);

const adapter = new PrismaPg(pool);
const prismaClient = new PrismaClient({ adapter });

const users = 
[
  { email: 'admin@kuhaku.local',  name: 'Admin Kuhaku'         },
  { email: 'dev@kuhaku.local',    name: 'Desenvolvedor Kuhaku'  },
  { email: 'user@kuhaku.local',   name: 'Usuário Padrão'        },
];

async function main() 
{
  console.log('🌱 Iniciando seed de usuários...');

  for (const user of users) 
  {
  await prismaClient.user.upsert
    (
      {
        where:  { email: user.email },
        update: {},
        create: user,
      }
    );
  }

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch
(
    (error) => 
  {
    console.error(error);
    process.exitCode = 1;
  }
)
  .finally
(
  async () => 
  {
  await prismaClient.$disconnect();
    await pool.end();
  }
);