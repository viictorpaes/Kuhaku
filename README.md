<h1 align="center">Jogo da Adivinhação (Kuhaku)</h1>

<h2 align="center">💻⛏️ Tecnologias e Ferramentas Utilizadas: </h2>
<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" height="34"/><br>
  <img src="https://img.shields.io/badge/Node.js-111827?style=for-the-badge&logo=nodedotjs&logoColor=339933" height="30" alt="Node.js"/>
  <img src="https://img.shields.io/badge/NestJS-111827?style=for-the-badge&logo=nestjs&logoColor=E0234E" height="30" alt="NestJS"/>
    <img src="https://img.shields.io/badge/JavaScript-111827?style=for-the-badge&logo=javascript&logoColor=yellow" height="30" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/TypeScript-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" height="30" alt="TypeScript"/> <br>
  <img src="https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB" height="30" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=purple" height="30" alt="Vite"/>
  <img src="https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26" height="30" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-111827?style=for-the-badge&logo=css3&logoColor=1572B6" height="30" alt="CSS3"/>
  <img src="https://img.shields.io/badge/TailwindCSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" height="30" alt="TailwindCSS"/> <br>
  <img src="https://img.shields.io/badge/Prisma-111827?style=for-the-badge&logo=prisma&logoColor=5A67D8" height="30" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Docker-111827?style=for-the-badge&logo=docker&logoColor=2496ed" height="30" alt="Docker"/>
  <img src="https://img.shields.io/badge/Architecture-111827?style=for-the-badge&logo=instructure&logoColor=white" height="30" alt="Architecture"/>
  <img src="https://img.shields.io/badge/-Figma-111827?style=flat&logo=figma&logoColor=orange" height="30" alt="Figma"/> <br>
  <img src="https://img.shields.io/badge/Git-111827?style=for-the-badge&logo=git&logoColor=F05032" height="30" alt="Git"/>
  <img src="https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=white" height="30" alt="GitHub"/>
  <img src="https://img.shields.io/badge/GitHub_Desktop-111827?style=for-the-badge&logo=github&logoColor=purple" height="30" alt="GitHub Desktop"/>
</p>


<h2 align="center"> 🏰 Arquitetura do Projeto <br>
<img src="https://img.shields.io/badge/Architecture-111827?style=flat-square&logo=instructure&logoColor=white"/></h2>

<pre>
Kuhaku/
├── .vscode<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" height="18"/>/
│   └── settings.json <img src="https://img.shields.io/badge/-JSON-111827?style=flat&logo=json&logoColor=white" height="18"/>
|
├── backend <img src="https://img.shields.io/badge/Node.js-111827?style=flat&logo=nodedotjs&logoColor=339933" height="18"/><img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   ├── prisma <img src="https://img.shields.io/badge/-Prisma-111827?style=flat&logo=prisma&logoColor=5A67D8" height="18"/>/
│   │   ├── migrations <img src="https://img.shields.io/badge/Migrations-111827?style=flat&logo=databricks&logoColor=FF3621" height="18"/>/
│   │   ├── schema.prisma <img src="https://img.shields.io/badge/Prisma_Schema-111827?style=flat&logo=prisma&logoColor=5A67D8" height="18"/>
│   │   └── seed.ts <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   ├── public/ <img src="https://img.shields.io/badge/Public-111827?style=flat&logo=files&logoColor=white" height="18"/>
│   │   ├── assets/ <img src="https://img.shields.io/badge/Assets-111827?style=flat&logo=files&logoColor=yellow" height="18"/>
│   │   └── index.html <img src="https://img.shields.io/badge/-HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18"/>
│   ├── src/ <img src="https://img.shields.io/badge/<>src-green?style=flat&logo=image&logoColor=white" height="18"/>
│   │   ├── game <img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>/
│   │   │   ├── dto <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/>/
│   │   │   │   ├── create-game.dto.ts <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │   │   ├── guess.dto.ts <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │   │   ├── user_update.dto.ts <img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/>
│   │   │   │   └── user.dto.ts <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │   └── ts <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   │   │       ├── game.controller.ts <img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
│   │   │       ├── game.module.ts <img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │       └── game.service.ts <img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   │   └── prisma <img src="https://img.shields.io/badge/-Prisma-111827?style=flat&logo=prisma&logoColor=5A67D8" height="18"/>/
│   │   │       └── prisma.service.ts <img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3B82F6" height="18"/>
│   │   ├── types <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   │   │       └── globals.d.ts <img src="https://img.shields.io/badge/TypeScript-Global_Port-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   │   ├── app.controller.ts <img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
│   │   ├── app.module.ts <img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   └── main.ts <img src="https://img.shields.io/badge/-Main_Entry_Point-111827?style=flat&logo=typescript&logoColor=purple" height="18"/>
│   ├── nest-cli.json <img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>
│   ├── package.json <img src="https://img.shields.io/badge/-NPM-111827?style=flat&logo=npm&logoColor=CB3837" height="18"/>
│   ├── prisma.config.js <img src="https://img.shields.io/badge/-Prisma-111827?style=flat&logo=prisma&logoColor=5A67D8" height="18"/>
│   ├── tsconfig.build.json <img src="https://img.shields.io/badge/TypeScript-Build-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   └── tsconfig.json <img src="https://img.shields.io/badge/TypeScript-Config-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
frontend/ <img src="https://img.shields.io/badge/HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18" alt="HTML5"/><img src="https://img.shields.io/badge/-React-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/><img src="https://img.shields.io/badge/-Vite-111827?style=flat&logo=vite&logoColor=purple" height="18"/><img src="https://img.shields.io/badge/-TailwindCSS-111827?style=flat&logo=tailwindcss&logoColor=06B6D4" height="18"/><img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   ├── src <img src="https://img.shields.io/badge/src-61DAFB?style=flat&logo=react&logoColor=black" height="18" alt="src"/>/
│   │   ├── components <img src="https://img.shields.io/badge/components-2B2D42?style=flat&logo=react&logoColor=61DAFB" height="18" alt="components"/>/
│   │   │   ├── home.tsx <img src="https://img.shields.io/badge/-Home-111827?style=flat&logo=react&logoColor=61DAFB" height="18" alt="home.tsx"/>
│   │   │   ├── game.tsx <img src="https://img.shields.io/badge/-Game-111827?style=flat&logo=react&logoColor=61DAFB" height="18" alt="game.tsx"/>
│   │   │   └── setup.tsx <img src="https://img.shields.io/badge/-Setup-111827?style=flat&logo=react&logoColor=61DAFB" height="18" alt="setup.tsx"/>
│   │   ├── App.tsx <img src="https://img.shields.io/badge/-React-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   ├── index.css <img src="https://img.shields.io/badge/-CSS3-111827?style=flat&logo=css3&logoColor=1572B6" height="18"/>
│   │   ├── main.tsx <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   ├── index.html <img src="https://img.shields.io/badge/-HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18"/>
│   ├── postcss.config.js <img src="https://img.shields.io/badge/-PostCSS-111827?style=flat&logo=postcss&logoColor=DD3A0A" height="18"/>
│   ├── tailwind.config.js <img src="https://img.shields.io/badge/-TailwindCSS-111827?style=flat&logo=tailwindcss&logoColor=06B6D4" height="18"/>
│   ├── tsconfig.json <img src="https://img.shields.io/badge/TypeScript-Config-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   └── vite.config.js <img src="https://img.shields.io/badge/-Vite_JS-111827?style=flat&logo=vite&logoColor=purple" height="18"/>
│   └── vite.config.ts <img src="https://img.shields.io/badge/-Vite_TS-111827?style=flat&logo=vite&logoColor=purple" height="18"/>
├── img/ <img src="https://img.shields.io/badge/Assets-green?style=flat&logo=image&logoColor=white" height="18"/>
├── .dockerignore <img src="https://img.shields.io/badge/-DockerIgnore-111827?style=flat&logo=docker&logoColor=2496ED" height="18"/>
├── .gitignore <img src="https://img.shields.io/badge/-GitIgnore-111827?style=flat&logo=git&logoColor=F05032" height="18"/>
├── docker-compose.yml <img src="https://img.shields.io/badge/-Docker_Compose-111827?style=flat&logo=docker&logoColor=2496ED" height="18"/>
├── Dockerfile <img src="https://img.shields.io/badge/-Docker-111827?style=flat&logo=docker&logoColor=2496ED" height="18"/>
├── LICENSE <img src="https://img.shields.io/badge/License-MIT-FF8C00?style=flat&logo=opensource&logoColor=white" height="18"/>
├── protótipo.fig <img src="https://img.shields.io/badge/-Figma-111827?style=flat&logo=figma&logoColor=orange" height="18" alt="Figma"/>
├── README.md <img src="https://img.shields.io/badge/-Markdown-111827?style=flat&logo=markdown&logoColor=white" height="18"/>
├── CONTRIBUTING.md <img src="https://img.shields.io/badge/-CONTRIBUTING-111827?style=flat&logo=markdown&logoColor=yellow" height="18"/>
└── tsconfig.base.json <img src="https://img.shields.io/badge/TypeScript-Base-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
</pre>

<h2 align="center">🕹️ Comandos</h2>
 
<p align="left">Clone o repositório via GitHub Desktop ou terminal: <br>
 <img src="https://img.shields.io/badge/-GitHub_Desktop-111827?style=flat-square&logo=github&logoColor=purple"/>
</p>
 
```bash
git clone https://github.com/viictorpaes/Kuhaku
```


<h2 align="center">1. Docker<br>
<img src="https://img.shields.io/badge/-Docker-111827?style=flat-square&logo=docker&logoColor=2496ed"/>
<img src="https://img.shields.io/badge/Docker_Desktop-2496ED?style=for-the-badge&logo=docker&logoColor=white" height="18" alt="Docker Desktop"/>
<img src="https://img.shields.io/badge/-PostgreSQL-111827?style=flat-square&logo=postgresql&logoColor=white"/>
</h2>

> 📖 [Docker Docs](https://docs.docker.com)

```bash
# Constrói (ou reconstrói) as imagens definidas no docker-compose.yml
docker-compose build

# Reconstrói sem usar cache (forçar rebuild completo)
docker-compose build --no-cache

# Sobe todos os containers em background
docker-compose up -d

# Sobe apenas o container do banco de dados
docker-compose up -d db

# Sobe e reconstrói as imagens antes de iniciar
docker-compose up -d --build

# Para os containers sem removê-los
docker-compose stop

# Para e remove os containers (útil quando algo trava)
docker-compose down

# Para, remove containers E volumes (reseta o banco de dados)
docker-compose down -v

# Reinicia um container específico
docker compose restart api

# Mostra os logs em tempo real
docker-compose logs -f

# Mostra os logs de um serviço específico
docker-compose logs -f api

# Lista os containers em execução
docker-compose ps

# Lista todos os containers (incluindo parados)
docker-compose ps -a

# Executa um comando dentro de um container em execução
docker-compose exec api bash

# Remove containers parados, redes e imagens não usadas
docker system prune -f

# Remove também os volumes não usados (limpeza total)
docker system prune -f --volumes
```

<h2 align="center">2. Prisma<br>
<img src="https://img.shields.io/badge/Prisma-111827?style=flat-square&logo=prisma&logoColor=5A67D8"/>
</h2>

> 📖 [Prisma Docs](https://www.prisma.io/docs)

> ⚠️ Os comandos do Prisma devem ser rodados de dentro da pasta `backend/`

```bash
# NOTA: rode estes comandos dentro da pasta `backend/`
cd backend

# Inicializa o Prisma no projeto (cria /prisma e schema.prisma)
npx prisma init

# Gera o Prisma Client (rode sempre após alterar o schema.prisma)
npx prisma generate

# Cria e aplica uma nova migration em desenvolvimento
npx prisma migrate dev --name init

# Aplica migrations em produção
npx prisma migrate deploy

# Reseta o banco e reaplica todas as migrations
npx prisma migrate reset

# Mostra o status das migrations
npx prisma migrate status

# Sincroniza o schema sem criar migration (útil em prototipagem)
npx prisma db push

# Puxa o schema a partir de um banco existente
npx prisma db pull

# Roda o arquivo de seed
npx prisma db seed

# Abre o Prisma Studio no navegador (porta 5555)
npx prisma studio

# Formata o schema.prisma
npx prisma format

# Valida o schema.prisma
npx prisma validate

# Introspecta o banco existente
npx prisma introspect
```


<h2 align="center">3. Frontend<br>
<img src="https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26" height="22" alt="HTML5"/>
<img src="https://img.shields.io/badge/CSS3-111827?style=for-the-badge&logo=css3&logoColor=1572B6" height="22" alt="CSS3"/>
<img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" height="22" alt="React"/>
<img src="https://img.shields.io/badge/-Vite-111827?style=flat-square&logo=vite&logoColor=purple"/>
<img src="https://img.shields.io/badge/-NPM-111827?style=flat-square&logo=npm&logoColor=CB3837"/>
</h2>

> 📖 [Vite Docs](https://vitejs.dev/guide)

> ⚠️ Os comandos devem ser rodados de dentro da pasta `frontend/`

```bash
# NOTA: rode estes comandos dentro da pasta `frontend/`
cd frontend

# Instala todas as dependências do package.json
npm install

# Inicia o servidor de desenvolvimento com hot reload (porta 5173)
npm run start:dev

# Compila o projeto para produção (gera a pasta /dist)
npm run build

# Pré-visualiza o build de produção localmente
npm run preview

# Verifica erros de lint
npm run lint

# Formata o código automaticamente com Prettier
npm run format
```

<h2 align="center">🔑 Versões Necessárias para Compilar:</h2>
<p align="center">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=black" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/NestJS-11.1.19-E0234E?style=for-the-badge&logo=nestjs&logoColor=red"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=for-the-badge&logo=typescript&logoColor=blue"/> <br>
  <img src="https://img.shields.io/badge/React-19.0.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> 
  <img src="https://img.shields.io/badge/Vite-6.2.0-111827?style=for-the-badge&logo=vite&logoColor=purple"/> <br>
  <img src="https://img.shields.io/badge/Prisma-7.8.0-5A67D8?style=for-the-badge&logo=prisma&logoColor=5A67D8"/>
  <img src="https://img.shields.io/badge/PostgreSQL-8.16.3-336791?style=for-the-badge&logo=postgresql&logoColor=white"/> <br>
  <img src="https://img.shields.io/badge/RxJS-7.8.1-B7178C?style=for-the-badge&logo=reactivex&logoColor=purple"/>
  <img src="https://img.shields.io/badge/tsx-4.20.5-000000?style=for-the-badge&logo=typescript&logoColor=white"/> <br>
  <img src="https://img.shields.io/badge/Docker-Engine-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

<h2 align="center">📂 Modularização SCM (Service, Module & Controller)<br>
<img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>
<img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
<img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
<img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
</h2>
 
### ![Controller](https://img.shields.io/badge/Controller-TypeScript-white?style=flat-square&logo=typescript) `.controller.ts`
 
Camada de **entrada da API**. Recebe as requisições HTTP e define as rotas (`@Get`, `@Post`, `@Put`, `@Delete`). Não contém lógica de negócio — apenas delega ao Service. É aqui que os decorators do Swagger (`@ApiOperation`, `@ApiResponse`) são aplicados.
 
**Arquivos neste projeto:** `app.controller.ts` `game.controller.ts`
 
---
 
### ![Service](https://img.shields.io/badge/Service-TypeScript-white?style=flat-square&logo=typescript) `.service.ts`
 
Camada de **lógica de negócio**. Processa os dados recebidos do Controller, aplica as regras da aplicação (validações, hash de senha com `bcrypt`, geração de JWT) e comunica com o banco via Prisma. Injetado no Controller via `@Injectable()`.
 
**Arquivos neste projeto:** `prisma.service.ts` `game.service.ts`
 
---
 
### ![Module](https://img.shields.io/badge/Module-TypeScript-white?style=flat-square&logo=typescript) `.module.ts`
 
**Unidade de organização** do NestJS. Agrupa e registra o Controller e o Service de um domínio (`imports`, `providers`, `controllers`, `exports`). Permite que outros módulos reutilizem os providers via `exports`. O `AppModule` é o módulo raiz que importa todos os demais.
 
**Arquivos neste projeto:** `app.module.ts` `game.module.ts`


<h2 align="center"><b>Lógica do Jogo em</b>: <i>backend/src/game/</i> <br>
<img src="https://img.shields.io/badge/<>src-green?style=flat&logo=image&logoColor=white" height="18"/><img src="https://img.shields.io/badge/-Game-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/><img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/></h2>

1. `backend/src/game/ts/` <img src="https://img.shields.io/badge/-Game-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>

```ts
// Arquivo: backend/src/game/ts/game.controller.ts

import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from '../../game/dto/create-game.dto';
import { CreateUserDto } from '../dto/user.dto';
import { GuessDto } from '../dto/guess.dto';
import { UpdateUserDto } from '../dto/user_update.dto';

@Controller('api')
export class GameController 
{
  constructor(private readonly gameService: GameService) {}

  @Post('users')
  async criarUsuario(@Body() dto: CreateUserDto) 
  {
    return this.gameService.criarUsuario(dto.email, dto.name);
  }

  @Post('games')
  async criarJogo(@Body() dto: CreateGameDto) 
  {
    return this.gameService.criarJogo(dto);
  }

  @Post('games/:id/guess')
  async fazerPalpite(@Param('id') id: string, @Body() dto: GuessDto) 
  {
    return this.gameService.fazerPalpite(id, dto.value);
  }

  @Get('games/:id/history')
  async obterHistoricoDoJogo(@Param('id') id: string) 
  {
    return this.gameService.obterHistoricoDoJogo(id);
  }

  @Get('users/:id/games')
  async listarJogosDoUsuario(@Param('id') id: string) 
  {
    return this.gameService.listarJogosDoUsuario(id);
  }

  @Get('users/:id/stats')
  async estatisticasDoUsuario(@Param('id') id: string) 
  {
    return this.gameService.obterEstatisticasDoUsuario(id);
  }

  @Get('games/:id/summary')
  async resumoDoJogo(@Param('id') id: string) 
  {
    return this.gameService.obterResumoDoJogo(id);
  }

  @Get('users/:id/achievements')
  async conquistasDoUsuario(@Param('id') id: string) 
  {
    return this.gameService.obterConquistasDoUsuario(id);
  }

  @Get('users/:id/summary')
  async resumoCompletoDoUsuario(@Param('id') id: string) 
  {
    return this.gameService.obterResumoDoUsuario(id);
  }

  @Get('ranking/global')
  async rankingGlobal(@Query('limit') limit?: string) 
  {
    const l = limit ? parseInt(limit, 10) : 10;
    return this.gameService.obterRankingGlobal(l);
  }

  @Get('ranking/user/:id')
  async rankingDoUsuario(@Param('id') id: string) 
  {
    return this.gameService.obterRankingDoUsuario(id);
  }

  @Put('users/:id')
  async atualizarUsuario(@Param('id') id: string, @Body() dto: UpdateUserDto) 
  {
    return this.gameService.atualizarUsuario(id, dto);
  }

  @Delete('users/:id')
  async removerUsuario(@Param('id') id: string) 
  {
    return this.gameService.removerUsuario(id);
  }
}
```

```ts
// Arquivo: backend/src/game/ts/game.module.ts

import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module
(
  {
    controllers: [GameController],
    providers: [GameService, PrismaService],
  }
)

export class GameModule {}
```

```ts
// Arquivo: backend/src/game/ts/game.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto, Difficulty } from '../dto/create-game.dto';

function obterLimitePorDificuldade(dificuldade: Difficulty | string): number 
{
  const difflevel = typeof dificuldade === 'string' ? dificuldade.toUpperCase(): dificuldade;

  switch (difflevel) 
  {
    case 'FACIL':
    case 'EASY':
      return 10;
    case 'MEDIO':
    case 'MEDIUM':
      return 50;
    case 'DIFICIL':
    case 'HARD':
      return 100;
    default:
      return 50;
  }
}

function obterFeedbackPorDiferenca(difflevel: number): string 
{
  if (difflevel === 0) 
    return 'acertou ✅';
  if (difflevel <= 2) 
    return 'pegando fogo 🔥🔥🔥';
  if (difflevel <= 5) 
    return 'quente 🌡️';
  if (difflevel <= 15) 
    return 'morno ☔️';
  return 'frio ❄️';
}

@Injectable()
export class GameService 
{
  constructor(private readonly prismaService: PrismaService) {}

  async criarUsuario(email: string, name?: string) 
  {
    const usuarioExistente = await this.prismaService.prisma.user.findUnique
    (
      {
        where: { email },
      }
    );

    if (usuarioExistente) 
      return usuarioExistente;

    return this.prismaService.prisma.user.create({ data: { email, name } });
  }

  async criarJogo(dto: CreateGameDto) 
  {
    const limite = obterLimitePorDificuldade(dto.difficulty);
    const alvo = Math.floor(Math.random() * limite) + 1;

    if (dto.userId) 
    {
      const usuario = await this.prismaService.prisma.user.findUnique
      (
        {
          where: { id: dto.userId },
        }
      );

      if (!usuario) 
        throw new NotFoundException('Usuário não encontrado');
    }

    const jogo = await this.prismaService.prisma.game.create
    (
      {
        data: 
        {
          userId: dto.userId ?? null,
          difficulty: dto.difficulty,
          target: alvo,
          attempts: 0,
          won: false,
        },
      }
    );

    return jogo;
  }

  async fazerPalpite(
    gameId: string,
    value: number,
  ): Promise<{ feedback: string; diff: number } | { message: string }> 
  {
    const jogo = await this.prismaService.prisma.game.findUnique
    (
      {
        where: { id: gameId },
      }
    );

    if (!jogo) 
      throw new NotFoundException('Jogo não encontrado ❌');

    if (jogo.won) 
      return { message: 'Jogo já foi concluído ✅' };

    const diff = Math.abs(jogo.target - value);
    const feedback = obterFeedbackPorDiferenca(diff);

    await this.prismaService.prisma.guess.create
    (
      {
        data: { gameId, value, feedback },
      }
    );

    await this.prismaService.prisma.game.update
    (
      {
        where: { id: gameId },
        data: 
        {
          attempts: { increment: 1 },
          won: diff === 0 ? true : jogo.won,
        },
      }
    );

    return { feedback, diff };
  }

  async obterHistoricoDoJogo(gameId: string) 
  {
    return this.prismaService.prisma.guess.findMany
    (
      {
        where: { gameId },
        orderBy: { createdAt: 'asc' },
      }
    );
  }

  async listarJogosDoUsuario(userId: string) 
  {
    return this.prismaService.prisma.game.findMany
    (
      {
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }
    );
  }

  async obterEstatisticasDoUsuario(userId: string) 
  {
    const jogos = await this.prismaService.prisma.game.findMany
    (
      {
        where: { userId, won: true },
      }
    );

    const total = jogos.length;

    if (total === 0) 
    {
      return { total: 0, averageAttempts: 0, best: null, worst: null };
    }

    const tentativas: number[] = jogos.map((g: any) => Number(g.attempts ?? 0));

    const totalTentativas: number = tentativas.reduce
    (
      (a: number, b: number) => a + b, 0
    );

    const mediaTentativas = totalTentativas / tentativas.length;
    const melhor = Math.min(...tentativas);
    const pior = Math.max(...tentativas);

    return { total, averageAttempts: mediaTentativas, best: melhor, worst: pior };
  }

  async obterRankingGlobal(limit = 10) 
  {
    const usuarios = await this.prismaService.prisma.user.findMany
    (
      {
        include: { games: true },
      }
    );

    const ranking = usuarios
      .map
      (
        (u: any) => 
        {
          const wins = (u.games || [])
            .filter((g: any) => g.won)
            .map((g: any) => Number(g.attempts ?? 0));
          
          if (wins.length === 0) return null;
          
          const avg = wins.reduce((a: number, b: number) => a + b, 0) / wins.length;

          return {
            userId: u.id,
            name: u.name ?? u.email,
            averageAttempts: avg,
            wins: wins.length,
          };
        }
      )
      .filter(Boolean)
      .sort((a: any, b: any) => a.averageAttempts - b.averageAttempts)
      .slice(0, limit);

    return ranking;
  }

  async obterRankingDoUsuario(userId: string) 
  {
    const ranking = await this.obterRankingGlobal(1000);
    const index = ranking.findIndex((r: any) => r.userId === userId);

    if (index === -1) 
      return { position: null, total: ranking.length };

    return { position: index + 1, total: ranking.length, entry: ranking[index] };
  }

  async atualizarUsuario(userId: string, dto: { name?: string; email?: string }) 
  {
    return this.prismaService.prisma.user.update
    (
      {
        where: { id: userId },
        data: dto,
      }
    );
  }

  async obterResumoDoJogo(gameId: string) 
  {
    const jogo = await this.prismaService.prisma.game.findUnique
    (
      {
        where: { id: gameId },
        include: { guesses: true },
      }
    );

    if (!jogo) 
      throw new NotFoundException('Jogo não encontrado ❌');

    const palpites = (jogo.guesses || []).sort
    (
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    const primeiro = palpites[0];
    const ultimo = palpites[palpites.length - 1];
    const durationMs =
      primeiro && ultimo
        ? new Date(ultimo.createdAt).getTime() - new Date(primeiro.createdAt).getTime()
        : null;

    return {
      gameId: jogo.id,
      userId: jogo.userId,
      difficulty: jogo.difficulty,
      target: jogo.won ? jogo.target : null,
      attempts: jogo.attempts,
      won: jogo.won,
      guesses: palpites.map((g: any) => (
        {
          value: g.value,
          feedback: g.feedback,
          createdAt: g.createdAt,
        }
      )),
      durationMs,
    };
  }

  async obterConquistasDoUsuario(userId: string) 
  {
    const jogos = await this.prismaService.prisma.game.findMany
    (
      {
        where: { userId },
        include: { guesses: true },
        orderBy: { createdAt: 'asc' },
      }
    );

    const vitorias = jogos.filter((g: any) => g.won);

    const fastestWinAttempts = vitorias.length
      ? Math.min(...vitorias.map((g: any) => g.attempts))
      : null;

    const duracoesVitorias = vitorias
      .map((g: any) => 
      {
        const palpites = (g.guesses || []).sort
        (
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        if (palpites.length < 1) return null;

        const primeiro = palpites[0];
        const ultimo = palpites[palpites.length - 1];

        return primeiro && ultimo
          ? new Date(ultimo.createdAt).getTime() - new Date(primeiro.createdAt).getTime()
          : null;
      })
      .filter(Boolean) as number[];

    const fastestWinTimeMs = duracoesVitorias.length ? Math.min(...duracoesVitorias) : null;

    let bestStreak = 0;
    let current = 0;
    for (const g of jogos) 
    {
      if (g.won) 
      {
        current += 1;
      } 
      else 
      {
        current = 0;
      }

      if (current > bestStreak) bestStreak = current;
    }

    return {
      totalGames: jogos.length,
      totalWins: vitorias.length,
      fastestWinAttempts,
      fastestWinTimeMs,
      bestStreak,
    };
  }

  async obterResumoDoUsuario(userId: string) 
  {
    const status = await this.obterEstatisticasDoUsuario(userId);
    const conquistas = await this.obterConquistasDoUsuario(userId);
    const rankingUsuario = await this.obterRankingDoUsuario(userId);
    return { stats: status, achievements: conquistas, ranking: rankingUsuario };
  }
}

async removerUsuario(userId: string) 
  {
    const usuario = await this.prismaService.prisma.user.findUnique
    (
      {
        where: { id: userId },
      }
    );

    if (!usuario) 
      throw new NotFoundException('Usuário não encontrado');

    return this.prismaService.prisma.user.delete
    (
      {
        where: { id: userId },
      }
    );
  }
```

2. `backend/src/game/dto/` <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/>

### DTOs (Data Transform Objects) usados pelo módulo de jogo — definem a forma dos dados esperados nas requisições.

```ts
// Arquivo: backend/src/game/dto/create-game.dto.ts
// Define as opções para criar um jogo. `difficulty` é obrigatório.
export type Difficulty = 'FACIL' | 'MEDIO' | 'DIFICIL';

export class CreateGameDto 
{
  // Opcional: id do usuário (se o jogo for associado a um usuário)
  userId?: string;
  // Obrigatório: dificuldade do jogo
  difficulty!: Difficulty;
}
```

```ts
// Arquivo: backend/src/game/dto/guess.dto.ts
// Payload para submeter um palpite ao jogo.
export class GuessDto 
{
  // Normalmente o controller recebe gameId via rota; mantemos campo aqui por compatibilidade
  gameId!: string;
  // Valor do palpite (número)
  value!: number;
}
```

```ts
// Arquivo: backend/src/game/dto/user.dto.ts
// DTO para criação de usuário simples (email obrigatório)
export class CreateUserDto 
{
  email!: string;
  name?: string;
}
```

```ts
// Arquivo: backend/src/game/dto/user_update.dto.ts
// DTO para atualizações parciais de usuário (name e/ou email)
export class UpdateUserDto 
{
  name?: string;
  email?: string;
}
```


<h2 align="center"><b>Visual do Jogo em</b>: <i>frontending/src/main.tsx</i> <br>
<img src="https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26" height="25" alt="HTML5"/><img src="https://img.shields.io/badge/CSS3-111827?style=for-the-badge&logo=css3&logoColor=1572B6" height="25" alt="CSS3"/><img src="https://img.shields.io/badge/TailwindCSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" height="25" alt="TailwindCSS"/><img src="https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB" height="25" alt="React"/> <img src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=purple" height="25" alt="Vite"/><img src="https://img.shields.io/badge/TypeScript-111827?style=for-the-badge&logo=TypeScript&logoColor=blue" height="25" alt="Vite"/></h2>

<h2 align="center"> License <br>
<img src="https://img.shields.io/badge/License-MIT-orange?style=flat&logo=opensourceinitiative&logoColor=orange" height="18"/> <br>
</h2>

```license
MIT License

Copyright (c) 2026, Kuhaku

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```