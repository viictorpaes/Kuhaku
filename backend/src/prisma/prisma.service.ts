import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy 
{
  private readonly conexao?: Pool;
 
  readonly prisma: any;

  constructor() 
  {
    const databaseUrl = process.env.DATABASE_URL;

    if (databaseUrl) 
    {
      this.conexao = new Pool
      (
        {
          connectionString: databaseUrl,
        }
      );

      this.prisma = new PrismaClient
      (
        {
          adapter: new PrismaPg(this.conexao),
        }
      );

    } 
    
    else 
    {
      this.prisma = new PrismaClient();
    }
  }

  async onModuleInit() 
  {
    try 
    {
      await this.prisma.$connect();
    } 
    catch (err) 
    {
      console.warn('[PrismaService] failed to connect to the database:', err);
    }
  }

  async onModuleDestroy() 
  {
    try 
    {
      await this.prisma.$disconnect();
    } 
    catch (err) 
    {
      console.warn('[PrismaService] failed to disconnect prisma:', err);
    }

    if (this.conexao) 
    {
      try 
      {
        await this.conexao.end();
      } 
      catch (err) 
      {
  
        console.warn('[PrismaService] failed to end the pg pool connection:', err);
      }
    }
  }
}