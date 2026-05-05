import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { GameModule } from './game/game.module';

@Module
(
  {
    imports: [GameModule],
    controllers: [AppController],
    providers: [PrismaService],
  }
)

export class AppModule{}
