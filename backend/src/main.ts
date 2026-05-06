import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function inicializar() 
{
  const aplicacao = await NestFactory.create(AppModule);

  aplicacao.enableCors();
  aplicacao.enableShutdownHooks();

  aplicacao.use(express.static(join(__dirname, '..', 'public')));

  await aplicacao.listen(Number(process.env.PORT ?? 3001));
}

void inicializar();