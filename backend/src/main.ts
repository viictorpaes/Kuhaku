import 'reflect-metadata';
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();

  // Serve static files from public directory
  const publicPath = join(__dirname, '..', 'public');
  app.use(express.static(publicPath));

  await app.listen(Number(process.env.PORT ?? 3001));
}

void bootstrap();
