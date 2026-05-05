import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly conexao?: Pool;
 
  readonly prisma: any;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (databaseUrl) {
      this.conexao = new Pool({
        connectionString: databaseUrl,
      });

      this.prisma = new PrismaClient({
        adapter: new PrismaPg(this.conexao),
      });
    } else {
      // Fallback: cria um PrismaClient sem adapter — útil para desenvolvimento
      // quando a variável de ambiente não está definida.
      this.prisma = new PrismaClient();
    }
  }

  async onModuleInit() {
    try {
      await this.prisma.$connect();
    } catch (err) {
      // Log de aviso — não deixamos a aplicação cair apenas por falha no connect
      // para facilitar desenvolvimento local sem DB.
      // eslint-disable-next-line no-console
      console.warn('[PrismaService] falha ao conectar no banco:', err);
    }
  }

  async onModuleDestroy() {
    try {
      await this.prisma.$disconnect();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[PrismaService] falha ao desconectar prisma:', err);
    }

    if (this.conexao) {
      try {
        await this.conexao.end();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[PrismaService] falha ao encerrar a conexão pg pool:', err);
      }
    }
  }
}