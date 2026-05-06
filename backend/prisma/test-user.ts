import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool
(
  {
    connectionString: process.env.DATABASE_URL,
  }
);

const adapter = new PrismaPg(pool);
const prismaClient = new PrismaClient({ adapter });

const usuarios = 
[
  { email: 'admin@kuhaku.local', name: 'Admin Kuhaku', password: 'kuhaku-admin' },
  { email: 'dev@kuhaku.local', name: 'Desenvolvedor Kuhaku', password: 'kuhaku-dev' },
  { email: 'user@kuhaku.local', name: 'Usuário Padrão', password: 'kuhaku-user' },
];

async function main() 
{
  console.log('🌱 Iniciando seed de usuários de teste...');

  try 
  {
    for (const usuario of usuarios) 
    {
      const senhaCriptografada = await bcrypt.hash(usuario.password, 10);

      const result = await prismaClient.user.upsert
      (
        {
          where: { email: usuario.email },
          update: {},
          create: 
          (
            {
              name: usuario.name,
              email: usuario.email,
              password: senhaCriptografada,
            } as any
          ),
        }
      );

      console.log(`Usuário processado: ${result.name} (${result.email})`);
    }

    console.log('✅ Seed de testes concluído com sucesso!');
  } 
  catch (error) 
  {
    console.error(`Erro ao processar usuários: ${error}`);
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