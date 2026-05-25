<h1 align="center">Kuhaku — Arquitetura do Sistema <br> 🏛️🧑🏻‍🚀</h1>

<p align="center">
   <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=black" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC"/>
  <img src="https://img.shields.io/badge/NestJS-11.1.19-E0234E?style=for-the-badge&logo=nestjs&logoColor=E0234E"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=for-the-badge&logo=typescript&logoColor=blue"/> <br>
  <img src="https://img.shields.io/badge/React-19.0.0-cyan?style=for-the-badge&logo=react&logoColor=cyan"/> 
  <img src="https://img.shields.io/badge/Vite-6.2.0-purple?style=for-the-badge&logo=vite&logoColor=purple"/> <br>
  <img src="https://img.shields.io/badge/Prisma-7.8.0-5A67D8?style=for-the-badge&logo=prisma&logoColor=5A67D8"/>
  <img src="https://img.shields.io/badge/PostgreSQL-8.16.3-336791?style=for-the-badge&logo=postgresql&logoColor=white"/> <br>
  <img src="https://img.shields.io/badge/RxTS-7.8.1-B7178C?style=for-the-badge&logo=reactivex&logoColor=purple"/>
  <img src="https://img.shields.io/badge/tsx-4.20.5-yellow?style=for-the-badge&logo=typescript&logoColor=yellow"/> <br>
  <img src="https://img.shields.io/badge/Docker-Engine-2496ED?style=for-the-badge&logo=docker&logoColor=2496ED"/>
</p>


## 📐 Visão Geral:

<mark><b>Kuhaku</b></mark> é uma plataforma de jogos educativos com tema espacial, construída como um **monorepo npm workspaces** com dois pacotes independentes: `backend` (API REST) e `frontend` (SPA React). O sistema roda em Docker com três serviços orquestrados via `docker-compose`.

```
kuhaku/
├── backend/          # @kuhaku/backend  — NestJS + Prisma + PostgreSQL
├── frontend/         # @kuhaku/frontend — React + Vite + TailwindCSS
├── docs/             # Documentação dos modos de jogo e arquitetura
├── img/              # Assets de imagem para documentação
├── docker-compose.yml
├── Dockerfile
└── package.json      # Workspace root (npm workspaces)
```


## 📁 Estrutura de Arquivos:
<pre>
Kuhaku/
├── .vscode <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" height="18"/>/
│   └── settings.json <img src="https://img.shields.io/badge/-JSON-111827?style=flat&logo=json&logoColor=white" height="18"/>
│
├── backend <img src="https://img.shields.io/badge/Node.js-111827?style=flat&logo=nodedotjs&logoColor=339933" height="18"/> <img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/> <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   ├── prisma <img src="https://img.shields.io/badge/-Prisma-111827?style=flat&logo=prisma&logoColor=5A67D8" height="18"/>/
│   │   ├── migrations <img src="https://img.shields.io/badge/Migrations-111827?style=flat&logo=databricks&logoColor=FF3621" height="18"/>/
│   │   ├── schema.prisma <img src="https://img.shields.io/badge/Prisma_Schema-111827?style=flat&logo=prisma&logoColor=5A67D8" height="18"/>
│   │   ├── seed.ts <img src="https://img.shields.io/badge/-Seed-111827?style=flat&logo=typescript&logoColor=2E8B57" height="18"/>
│   │   ├── test-user.ts <img src="https://img.shields.io/badge/Test_User_Create-111827?style=flat&logo=typescript&logoColor=purple" height="18"/>
│   │   └── test-game.ts <img src="https://img.shields.io/badge/Test_Game_Create-111827?style=flat&logo=typescript&logoColor=orange" height="18"/>
│   ├── public/ <img src="https://img.shields.io/badge/Public-111827?style=flat&logo=files&logoColor=white" height="18"/>
│   │   ├── assets <img src="https://img.shields.io/badge/Assets-111827?style=flat&logo=files&logoColor=yellow" height="18"/>/
│   │   └── index.html <img src="https://img.shields.io/badge/-HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18"/>
│   ├── src <img src="https://img.shields.io/badge/src-8B0000?style=flat&logo=nestjs&logoColor=FF0000" height="18"/>/
│   │   ├── auth <img src="https://img.shields.io/badge/-Auth-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>/
│   │   │   ├── dto <img src="https://img.shields.io/badge/-Data_Transform_Object_(DTO)-111827?style=flat&logo=typescript&logoColor=orange" height="18" alt="DTO"/>/
│   │   │   │   ├── login.dto.ts <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │   │   └── login_update.dto.ts <img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/>
│   │   │   └── ts <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   │   │       ├── auth.controller.ts <img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
│   │   │       ├── auth.service.ts <img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   │   │       ├── auth.module.ts <img src="https://img.shields.io/badge/Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │       └── jwt.strategy.ts <img src="https://img.shields.io/badge/Password_Criptography_Method-111827?style=flat&logo=typescript&logoColor=purple" height="18"/> <img src="https://img.shields.io/badge/bcrypt-111827?style=flat&logo=letsencrypt&logoColor=white" height="18"/>
│   │   ├── users <img src="https://img.shields.io/badge/-Users-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>/
│   │   │   ├── dto <img src="https://img.shields.io/badge/-Data_Transform_Object_(DTO)-111827?style=flat&logo=typescript&logoColor=orange" height="18" alt="DTO"/>/
│   │   │   │   ├── user_dto.ts <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │   │   └── user_update.dto.ts <img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/>
│   │   │   └── ts <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   │   │       ├── user.controller.ts <img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
│   │   │       ├── user.service.ts <img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   │   │       └── user.module.ts <img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   ├── game <img src="https://img.shields.io/badge/-Game-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>/
│   │   │   ├── dto <img src="https://img.shields.io/badge/-Data_Transform_Object_(DTO)-111827?style=flat&logo=typescript&logoColor=orange" height="18" alt="DTO"/>/
│   │   │   │   ├── create-game.dto.ts <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │   │   ├── guess.dto.ts <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │   │   ├── user_update.dto.ts <img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/>
│   │   │   │   └── user.dto.ts <img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │   └── ts <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   │   │       ├── game.controller.ts <img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
│   │   │       ├── game.module.ts <img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   │       └── game.service.ts <img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   │   ├── prisma <img src="https://img.shields.io/badge/-Prisma-111827?style=flat&logo=prisma&logoColor=5A67D8" height="18"/>/
│   │   │   └── prisma.service.ts <img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3B82F6" height="18"/>
│   │   ├── types <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   │   │   └── globals.d.ts <img src="https://img.shields.io/badge/TypeScript-Global_Port-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   │   ├── app.controller.ts <img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
│   │   ├── app.module.ts <img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
│   │   └── main.ts <img src="https://img.shields.io/badge/-Main_Entry_Point-111827?style=flat&logo=typescript&logoColor=purple" height="18"/>
│   ├── nest-cli.json <img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>
│   ├── package.json <img src="https://img.shields.io/badge/-NPM-111827?style=flat&logo=npm&logoColor=CB3837" height="18"/>
│   ├── prisma.config.ts <img src="https://img.shields.io/badge/-Prisma-111827?style=flat&logo=prisma&logoColor=5A67D8" height="18"/>
│   ├── tsconfig.build.json <img src="https://img.shields.io/badge/TypeScript-Build-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   └── tsconfig.json <img src="https://img.shields.io/badge/TypeScript-Config-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│
├── frontend <img src="https://img.shields.io/badge/HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18"/> <img src="https://img.shields.io/badge/-React-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/> <img src="https://img.shields.io/badge/-Vite-111827?style=flat&logo=vite&logoColor=purple" height="18"/> <img src="https://img.shields.io/badge/-CSS-111827?style=flat-square&logo=css&logoColor=663399"/> <img src="https://img.shields.io/badge/-TailwindCSS-111827?style=flat&logo=tailwindcss&logoColor=06B6D4" height="18"/> <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   ├── src <img src="https://img.shields.io/badge/src-61DAFB?style=flat&logo=react&logoColor=black" height="18"/>/
│   │   ├── components <img src="https://img.shields.io/badge/components-2B2D42?style=flat&logo=react&logoColor=61DAFB" height="18"/>/
│   │   │   ├── song <img src="https://img.shields.io/badge/-Módulo%20Song-111827?style=flat-square&logo=musicbrainz&logoColor=red" height="18">/
│   │   │   │   └── StarWarsMainTheme.mp3 <img src="https://img.shields.io/badge/MP3-111827?style=flat&logo=audacity&logoColor=red" height="18"/>
│   │   │   ├── home.tsx <img src="https://img.shields.io/badge/-Home-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   │   ├── game.tsx <img src="https://img.shields.io/badge/-Game-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   │   ├── ranking.tsx <img src="https://img.shields.io/badge/-Ranking-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   │   └── setup.tsx <img src="https://img.shields.io/badge/-Setup-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   ├── ts <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   │   │   └── audio.ts <img src="https://img.shields.io/badge/Web_Audio_API-111827?style=flat&logo=typescript&logoColor=red" height="18"/>
│   │   ├── App.tsx <img src="https://img.shields.io/badge/-React-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   ├── constants.ts <img src="https://img.shields.io/badge/-Constants-111827?style=flat&logo=typescript&logoColor=red" height="18"/>
│   │   ├── index.css  <img src="https://img.shields.io/badge/-CSS-111827?style=flat-square&logo=css&logoColor=663399" height="18"/>
│   │   ├── main.tsx <img src="https://img.shields.io/badge/-Main-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   ├── types.ts <img src="https://img.shields.io/badge/-Types-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   ├── index.html <img src="https://img.shields.io/badge/-HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18"/>
│   ├── postcss.config.cts <img src="https://img.shields.io/badge/-PostCSS-111827?style=flat&logo=postcss&logoColor=DD3A0A" height="18"/>
│   ├── tailwind.config.cts <img src="https://img.shields.io/badge/-TailwindCSS-111827?style=flat&logo=tailwindcss&logoColor=06B6D4" height="18"/>
│   ├── tsconfig.json <img src="https://img.shields.io/badge/TypeScript-Config-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   ├── tsconfig.node.json <img src="https://img.shields.io/badge/TypeScript-Node_Config-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   ├── vite.config.d.ts <img src="https://img.shields.io/badge/Vite-Types-111827?style=flat&logo=vite&logoColor=purple" height="18"/>
│   └── vite.config.ts <img src="https://img.shields.io/badge/-Vite_TS-111827?style=flat&logo=vite&logoColor=purple" height="18"/>
│
├── docs <img src="https://img.shields.io/badge/Docs-111827?style=flat&logo=markdown&logoColor=blue" height="18"/>/
│   ├── <mark><b>ARCHITECTURE.md</b></mark> <img src="https://img.shields.io/badge/Architecture-111827?style=for-the-badge&logo=instructure&logoColor=white" height="18" alt="Architecture"/>
│   ├── BATALHA_DE_SINAIS.md <img src="https://img.shields.io/badge/Batalha_de_Sinais-111827?style=flat&logo=markdown&logoColor=06B6D4" height="18"/>
│   ├── HIERARQUIA_DE_COMANDOS.md <img src="https://img.shields.io/badge/Hierarquia_de_Comandos-111827?style=flat&logo=markdown&logoColor=A855F7" height="18"/>
│   ├── MAPAS_ESTELARES.md <img src="https://img.shields.io/badge/Mapas_Estelares-111827?style=flat&logo=markdown&logoColor=FFD700" height="18"/>
│   ├── OPERACAO_RESGATE.md <img src="https://img.shields.io/badge/Operação_Resgate-111827?style=flat&logo=markdown&logoColor=F97316" height="18"/>
│   ├── PROTOCOLO_LOGICO.md <img src="https://img.shields.io/badge/Protocolo_Lógico-111827?style=flat&logo=markdown&logoColor=22C55E" height="18"/>
│   ├── Regras_Evento.md <img src="https://img.shields.io/badge/Regras_do_Evento-111827?style=flat&logo=markdown&logoColor=FFD700" height="18"/>
│   └── Histórias_de_Usuário.md <img src="https://img.shields.io/badge/User_Stories-111827?style=flat&logo=markdown&logoColor=blue" height="18"/>
│
├── img <img src="https://img.shields.io/badge/Assets-green?style=flat&logo=image&logoColor=white" height="18"/>/
├── .dockerignore <img src="https://img.shields.io/badge/-DockerIgnore-111827?style=flat&logo=docker&logoColor=2496ED" height="18"/>
├── .gitignore <img src="https://img.shields.io/badge/-GitIgnore-111827?style=flat&logo=git&logoColor=F05032" height="18"/>
├── docker-compose.yml <img src="https://img.shields.io/badge/-Docker_Compose-111827?style=flat&logo=docker&logoColor=2496ED" height="18"/>
├── Dockerfile <img src="https://img.shields.io/badge/-Docker-111827?style=flat&logo=docker&logoColor=2496ED" height="18"/>
├── LICENSE <img src="https://img.shields.io/badge/License-MIT-FF8C00?style=flat&logo=opensource&logoColor=white" height="18"/>
├── protótipo.fig <img src="https://img.shields.io/badge/-Figma-111827?style=flat&logo=figma&logoColor=orange" height="18"/>
├── README.md <img src="https://img.shields.io/badge/-Markdown-111827?style=flat&logo=markdown&logoColor=white" height="18"/>
├── CONTRIBUTING.md <img src="https://img.shields.io/badge/-CONTRIBUTING-111827?style=flat&logo=markdown&logoColor=yellow" height="18"/>
└── tsconfig.base.json <img src="https://img.shields.io/badge/TypeScript-Base-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
</pre>

### `.vscode/` <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" height="18"/>
Configurações do editor compartilhadas no repositório — formatação, extensões recomendadas e comportamento do workspace.

### `backend/` — NestJS + Prisma + PostgreSQL <img src="https://img.shields.io/badge/NestJS-111827?style=for-the-badge&logo=nestjs&logoColor=E0234E" height="18" alt="NestJS"/> <img src="https://img.shields.io/badge/Prisma-111827?style=for-the-badge&logo=prisma&logoColor=5A67D8" height="18" alt="Prisma"/> <img src="https://img.shields.io/badge/-PostgreSQL-111827?style=flat-square&logo=postgresql&logoColor=white" height="18" alt="PostgreSQL"/>
API REST do projeto, organizada pelo padrão **SCM (Service · Module · Controller)**:

- **`prisma/`** — schema do banco (`schema.prisma`), histórico de migrations e scripts auxiliares (`seed.ts` popula usuários iniciais; `test-user.ts` / `test-game.ts` criam dados de teste via `npx tsx`).
- **`public/`** — arquivos estáticos servidos pelo NestJS (build do frontend em produção).
- **`src/auth/`** — módulo de autenticação: DTOs de login, controller de rotas `/auth`, service com hash bcrypt e `jwt.strategy.ts` para validação de tokens.
- **`src/users/`** — módulo de usuários: CRUD via DTOs, controller REST e service que persiste no banco via Prisma.
- **`src/game/`** — módulo principal do jogo. O `game.service.ts` contém toda a lógica de negócio: criação de partidas, avaliação de palpites (`makeGuess`), cálculo de ranking e estatísticas. O `game.controller.ts` expõe os endpoints `@Controller('api')`.
- **`src/prisma/`** — `PrismaService` singleton: encapsula o `PrismaClient` e é injetado em todos os módulos que precisam de acesso ao banco.
- **`src/types/globals.d.ts`** — declarações TypeScript globais do workspace.
- **`main.ts`** — entry point do NestJS: bootstrap, CORS, static files, porta `PORT ?? 3001`.

### `frontend/` — React + Vite + TailwindCSS <img src="https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB" height="18" alt="React"/> <img src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=purple" height="18" alt="Vite"/> <img src="https://img.shields.io/badge/TailwindCSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" height="18" alt="TailwindCSS"/>
SPA React compilada pelo Vite. Toda a navegação é controlada por estado (`tela: Tela`) no `App.tsx`, sem roteador externo.

- **`src/components/`** — quatro telas principais:
  - `home.tsx` — menu de seleção de modo de jogo.
  - `setup.tsx` — configuração antes de iniciar (dificuldade, nomes, range).
  - `game.tsx` — todos os 6 modos de jogo em um único arquivo (`SoloGame`, `VsGame`, `MemoriaGame`, `MemoriaVsGame`, `LogicaGame`, `PrecedenciaGame`). Também exporta `VsResultScreen` e o painel reutilizável `SaveRankingPanel`.
  - `ranking.tsx` — Hall da Fama com filtro por `GameType` via tabs.
- **`src/components/song/`** — `StarWarsMainTheme.mp3` tocado em loop durante a sessão.
- **`src/ts/audio.ts`** — sistema de áudio duplo: trilha de fundo (objeto `starWarsTheme`) e efeitos sonoros procedurais via Web Audio API (`playArcadeCorrect` / `playArcadeError`).
- **`src/App.tsx`** — roteador de telas por estado; gerencia `gameId`, `round`, `score` e coordena as chamadas `POST /api/games` entre rodadas VS.
- **`src/constants.ts`** — fonte única de verdade para timers (`TIMER_BASE=30`, `TIMER_BONUS_ACERTO=15`, `TIMER_PENALIDADE_ERRO=10`), grids de memória e configs de dificuldade por modo.
- **`src/types.ts`** — tipos globais do frontend: `Tela`, `Modo`, `Dificuldade`, `Palpite`, `ConfigJogo`.

### `docs/` <img src="https://img.shields.io/badge/Docs-111827?style=flat&logo=markdown&logoColor=blue" height="18"/>
Documentação do projeto: histórias de usuário, arquitetura, regras de evento e descrições detalhadas de cada modo de jogo.

| Arquivo | Conteúdo |
|---|---|
| `ARCHITECTURE.md` | Visão geral do sistema, API REST, banco de dados e fluxo de dados |
| `BATALHA_DE_SINAIS.md` | Regras e mecânicas do modo `VS_GUESS` |
| `HIERARQUIA_DE_COMANDOS.md` | Regras e mecânicas do modo `PRECEDENCE_PUZZLE` |
| `MAPAS_ESTELARES.md` | Regras e mecânicas do modo `CARD_GUESS` / `CARD_GUESS_VS` |
| `OPERACAO_RESGATE.md` | Regras e mecânicas do modo `NUMBER_GUESS` |
| `PROTOCOLO_LOGICO.md` | Regras e mecânicas do modo `LOGIC_PUZZLE` |
| `Regras_Evento.md` | Estrutura oficial do evento: categorias Arena/Jornada, premiação e fluxo geral |
| `Histórias_de_Usuário.md` | User stories e requisitos funcionais |

### `img/` <img src="https://img.shields.io/badge/Assets-green?style=flat&logo=image&logoColor=white" height="18"/>
Screenshots e assets visuais usados no README e na documentação.

### Raiz do monorepo
| Arquivo | Papel |
|---|---|
| `docker-compose.yml` | Orquestra os três serviços: `db` (PostgreSQL), `backend` (NestJS), `frontend` (Vite) |
| `Dockerfile` | Imagem multi-workspace Node 22 — instala dependências e expõe portas 3001 e 5173 |
| `tsconfig.base.json` | Config TypeScript compartilhada (`strict`, `noUnusedLocals`, `noUnusedParameters`) — herdada por `backend/` e `frontend/` |
| `package.json` | Workspace root npm — scripts `start:dev`, `build`, `typecheck`, `docker:up` |
| `protótipo.fig` | Arquivo Figma do protótipo visual |

---

## 🏗️ Camadas da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVEGADOR / CLIENTE                       │
│                                                                 │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│   │   home.tsx   │  │  setup.tsx   │  │      game.tsx        │ │
│   │  (menu SPA)  │  │ (config jogo)│  │ (6 modos de jogo)    │ │
│   └──────────────┘  └──────────────┘  └──────────────────────┘ │
│                React 19 · Vite 6 · TailwindCSS 4               │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP REST (fetch)
                            │ porta 3001
┌───────────────────────────▼─────────────────────────────────────┐
│                      BACKEND (NestJS 11)                        │
│                                                                 │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│   │GameController│  │ GameService  │  │   PrismaService      │ │
│   │  @Controller │  │ @Injectable  │  │  (singleton DB conn) │ │
│   │  /api/*      │  │  lógica core │  │                      │ │
│   └──────────────┘  └──────────────┘  └──────────────────────┘ │
│                       AppModule · GameModule                    │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Prisma ORM
┌───────────────────────────▼─────────────────────────────────────┐
│                    BANCO DE DADOS (PostgreSQL 16)               │
│                                                                 │
│          User  ──── Game  ──── Guess                           │
│          (cuid)     (cuid)     (cuid)                           │
└─────────────────────────────────────────────────────────────────┘
```


## 📦 Estrutura de Módulos

### Backend — `backend/src/` <img src="https://img.shields.io/badge/src-8B0000?style=flat&logo=nestjs&logoColor=FF0000" height="18"/>

| Arquivo / Pasta | Responsabilidade |
|---|---|
| `main.ts` | Bootstrap NestJS, CORS, static files, porta `PORT ?? 3001` |
| `app.module.ts` | Módulo raiz — importa `GameModule`, registra `PrismaService` |
| `game/ts/game.module.ts` | Módulo de jogo — exporta controller + service |
| `game/ts/game.controller.ts` | Rotas REST `@Controller('api')` — todos os endpoints |
| `game/ts/game.service.ts` | Lógica de negócio — criação, palpites, ranking, estatísticas |
| `game/dto/create-game.dto.ts` | DTOs tipados: `Difficulty`, `GameType`, `CreateGameDto` |
| `prisma/prisma.service.ts` | Singleton do `PrismaClient` — injetado em todo o backend |
| `prisma/schema.prisma` | Schema Prisma: `User`, `Game`, `Guess`, enums |

### Frontend — `frontend/src/` <img src="https://img.shields.io/badge/src-61DAFB?style=flat&logo=react&logoColor=black" height="18"/>

| Arquivo / Pasta | Responsabilidade |
|---|---|
| `main.tsx` | Entry point React + Vite |
| `App.tsx` | Roteador de telas (estado `tela: Tela`) |
| `types.ts` | Tipos globais: `Tela`, `Modo`, `Dificuldade`, `Palpite`, `ConfigJogo` |
| `constants.ts` | Constantes de timer, dificuldade, grid de memória, configs de jogo |
| `components/home.tsx` | Tela inicial — seleção do modo de jogo |
| `components/setup.tsx` | Tela de configuração — dificuldade, nome dos jogadores |
| `components/game.tsx` | Todos os 6 modos de jogo em um único arquivo |
| `components/ranking.tsx` | Tabela de ranking global com filtro por `gameType` |
| `components/song/` | Áudio: efeitos sonoros e música de fundo |
| `ts/` | Lógica pura de geração de questões (Lógica, Precedência, Memória) |


<h2 align="left">🏦 Banco de Dados — Schema Prisma <br>
<img src="https://img.shields.io/badge/Prisma-5A67D8?style=for-the-badge&logo=prisma&logoColor=white" height="25"/></h2>

### Modelos

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?
  createdAt DateTime @default(now())
  games     Game[]
}

model Game {
  id         String     @id @default(cuid())
  userId     String?
  user       User?      @relation(fields: [userId], references: [id])
  gameType   GameType   @default(NUMBER_GUESS)
  difficulty Difficulty
  target     Int
  maxRange   Int?
  attempts   Int        @default(0)
  won        Boolean    @default(false)
  createdAt  DateTime   @default(now())
  endedAt    DateTime?
  guesses    Guess[]
}

model Guess {
  id        String   @id @default(cuid())
  gameId    String
  game      Game     @relation(fields: [gameId], references: [id])
  value     Int
  feedback  String
  createdAt DateTime @default(now())
}
```

### Enums

| Enum | Valores |
|---|---|
| `Difficulty` | `EASY` · `MEDIUM` · `HARD` |
| `GameType` | `NUMBER_GUESS` · `VS_GUESS` · `CARD_GUESS` · `LOGIC_PUZZLE` · `PRECEDENCE_PUZZLE` |

### Relacionamentos

```
User  1 ──── N  Game  1 ──── N  Guess
```

- Um `User` pode ter múltiplos `Game`s
- Um `Game` registra múltiplos `Guess`es (palpites individuais)
- Jogos anônimos têm `userId = null` até serem salvos no ranking

---

## 🌐 API REST — Endpoints

### Usuários

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/users` | Criar ou recuperar usuário por e-mail |
| `PUT` | `/api/users/:id` | Atualizar nome/email do usuário |
| `DELETE` | `/api/users/:id` | Remover usuário |

### Jogos

| Método | Rota | Body | Descrição |
|---|---|---|---|
| `POST` | `/api/games` | `{ gameType, difficulty, userId?, customRange? }` | Criar novo jogo |
| `POST` | `/api/games/:id/guess` | `{ value: number }` | Registrar palpite (NUMBER_GUESS / VS_GUESS) |
| `POST` | `/api/games/:id/finish` | `{ won: boolean, mistakes?: number }` | Encerrar jogo manualmente |
| `POST` | `/api/games/:id/save` | `{ name: string }` | Salvar resultado no ranking |
| `GET` | `/api/games/:id/history` | — | Histórico de palpites do jogo |
| `GET` | `/api/games/:id/summary` | — | Resumo completo do jogo |

### Usuários — Estatísticas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/users/:id/games` | Lista todos os jogos do usuário |
| `GET` | `/api/users/:id/stats` | Média de tentativas, vitórias, derrotas |
| `GET` | `/api/users/:id/achievements` | Streak, menor número de tentativas, tempo mais rápido |
| `GET` | `/api/users/:id/summary` | Stats + achievements + posição no ranking |

### Ranking

| Método | Rota | Query | Descrição |
|---|---|---|---|
| `GET` | `/api/ranking/global` | `limit?`, `gameType?` | Ranking global (filtrável por modo) |
| `GET` | `/api/ranking/user/:id` | — | Posição do usuário no ranking global |


## 🎮 Modos de Jogo

| `GameType` | Nome | Frontend `Modo` | Jogadores | Persistência |
|---|---|---|---|---|
| `NUMBER_GUESS` | Operação Resgate | `solo` | 1 | POST guess por tentativa |
| `VS_GUESS` | Batalha de Sinais | `vs` | 2 | POST guess por tentativa |
| `CARD_GUESS` | Mapas Estelares (solo) | `memoria` | 1 | POST finish ao concluir |
| `CARD_GUESS` | Mapas Estelares (1v1) | `memoria-vs` | 2 | POST finish ao concluir |
| `LOGIC_PUZZLE` | Protocolo Lógico | `logica` | 1 | POST finish ao expirar/concluir |
| `PRECEDENCE_PUZZLE` | Hierarquia de Comandos | `precedencia` | 1 | POST finish ao expirar/concluir |


<h2 align="left">⏱️ Sistema de Timer Universal <br>
<img src="https://img.shields.io/badge/-Constants-111827?style=flat&logo=typescript&logoColor=red" height="25"/></h2>

Todos os modos de jogo compartilham a mesma lógica de timer, definida em `frontend/src/constants.ts`:

```ts
export const TIMER_BASE = 30;  // segundos iniciais
export const TIMER_BONUS_ACERTO = 20;  // +20s ao acertar
export const TIMER_PENALIDADE_ERRO = 5;  // -5s ao errar
```

| Evento | Efeito no Timer | Flash Visual |
|---|---|---|
| Acerto / Par encontrado / Resposta correta | `+20s` | Badge verde `+20s` por 900ms |
| Erro / Par errado / Resposta incorreta | `-5s` (mín. 0) | Badge vermelho `-5s` por 900ms |
| Timer chega a zero | RESET (fases) ou Game Over | Tela de derrota com melhor fase |

### Constantes por Modo

| Constante | Valor | Usada em |
|---|---|---|
| `TIMER_VS_TURNO` | `TIMER_BASE` (30s) | Batalha de Sinais — por turno |
| `MEMORIA_TIMER_INICIAL` | `TIMER_BASE` (30s) | Mapas Estelares — inicial |
| `MEMORIA_BONUS_PAR` | `TIMER_BONUS_ACERTO` (20s) | Mapas Estelares — par correto |
| `TIMER_SOLO` | `{ EASY:30, MEDIUM:30, HARD:30 }` | Operação Resgate — por questão |
| `TIMER_LOGICA` | `{ EASY:30, MEDIUM:30, HARD:30 }` | (referência) |
| `TIMER_PRECEDENCIA` | `{ EASY:30, MEDIUM:30, HARD:30 }` | (referência) |


## 🌌 Sistema de Fases

Os modos **Protocolo Lógico**, **Hierarquia de Comandos** e **Operação Resgate Livre** (Missão Livre) implementam um sistema de fases com timer contínuo:

```
┌─────────────────────────────────────────────────────────────────┐
│  Timer contínuo — persiste entre todas as questões da fase      │
│                                                                 │
│  Início da Fase N                                               │
│        │                                                        │
│        ▼                                                        │
│  ┌─────────────┐  acerto → +20s   ┌─────────────────────────┐  │
│  │  Questão 1  │ ─────────────────►  Questão 2 … Questão N  │  │
│  │             │  erro  → -5s   │                           │  │
│  └─────────────┘                  └───────────┬─────────────┘  │
│                                               │                │
│                         última questão concluída               │
│                                               │                │
│                                               ▼                │
│                                    ┌──────────────────────┐    │
│                                    │  FASE N+1 começa!    │    │
│                                    │  Timer continua de   │    │
│                                    │  onde parou          │    │
│                                    └──────────────────────┘    │
│                                                                 │
│  Timer = 0  ──►  RESET para Fase 1  +  POST /finish (won:false)│
└─────────────────────────────────────────────────────────────────┘
```

### Estados React do Sistema de Fases

| Estado | Tipo | Descrição |
|---|---|---|
| `timerRestante` | `number` | Segundos restantes (contínuo) |
| `timerFlash` | `string \| null` | Flash `'+20s'` ou `'-5s'` por 900ms |
| `timerRef` | `MutableRefObject` | Referência do `setInterval` do countdown |
| `fase` | `number` | Fase atual (começa em 1) |
| `melhorFase` | `number` | Maior fase atingida na sessão |
| `resettando` | `boolean` | Tela de RESET ativa (1800ms) |


## 🏆 Sistema de Ranking

O ranking global é calculado pelo `GameService.getGlobalRanking()` e ordena os jogadores por uma **pontuação ponderada de tentativas**, garantindo que jogadores com mais vitórias e menos erros fiquem no topo.

### Critério de Ordenação (em cascata)

```
1° critério: winRate DESC           (taxa de vitória — percentual de partidas vencidas)
2° critério: weightedAttempts ASC   (tentativas ponderadas — menor é melhor)
3° critério: averageAttempts ASC    (tentativas médias — desempate final)
```

### Fórmula da Pontuação Ponderada

```
weightedAttempts = mediana × 0.5 + média × 0.3 + moda × 0.2
```

| Estatística | Peso | Significado |
|---|---|---|
| 📐 Mediana | `× 0.5` | Tentativas da partida do meio — robusta a outliers |
| 📊 Média | `× 0.3` | Tentativas médias em todas as vitórias |
| 🎯 Moda | `× 0.2` | Número de tentativas mais frequente nas vitórias |

### Campos Retornados pelo Ranking

```json
{
  "userId": "clxxx...",
  "name": "Piloto Alpha",
  "wins": 15,
  "totalGames": 20,
  "winRate": 0.75,
  "averageAttempts": 4.2,
  "medianAttempts": 4.0,
  "modeAttempts": 3.0,
  "weightedAttempts": 3.76,
  "bestAttempts": 2
}
```

<h2 align="left">🐳 Infraestrutura Docker <br>
<img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=2496ED" height="25"/></h2>

O projeto usa `docker-compose.yml` com três serviços:

```yaml
services:
  db:        # PostgreSQL 16-alpine  →  porta 5432
  backend:   # NestJS               →  porta 3001
  frontend:  # Vite dev server      →  porta 5173
```

### Ordem de Inicialização

```
db (healthcheck: pg_isready)
  └──► backend (migrate → seed → tsx --watch)
         └──► frontend (vite --host 0.0.0.0)
```

### Variáveis de Ambiente

| Serviço | Variável | Valor |
|---|---|---|
| `db` | `POSTGRES_USER` | `kuhaku` |
| `db` | `POSTGRES_PASSWORD` | `kuhaku` |
| `db` | `POSTGRES_DB` | `kuhaku` |
| `backend` | `PORT` | `3001` |
| `backend` | `DATABASE_URL` | via `backend/.env` |
| `frontend` | `VITE_API_URL` | `http://backend:3001` |

<h3 align="left">Dockerfile (multi-workspace) <br>
<img src="https://img.shields.io/badge/Docker-File-2496ED?style=for-the-badge&logo=docker&logoColor=2496ED" height="25"/></h3>

```dockerfile
FROM node:22-bookworm-slim

RUN apt-get install -y openssl   # necessário para Prisma

WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN npm install
COPY . .

EXPOSE 3001 5173
```


## 🔄 Fluxo de Dados — Criação e Encerramento de Jogo

```
Frontend                          Backend                    PostgreSQL
   │                                 │                           │
   │  POST /api/games                │                           │
   │  { gameType, difficulty }  ────►│                           │
   │                                 │  INSERT INTO Game         │
   │                                 │  target = random(1..N) ──►│
   │  ◄─── { id: "clxxx..." } ───────│◄──────────────────────────│
   │                                 │                           │
   │  [usuário joga — timer corre]   │                           │
   │                                 │                           │
   │  POST /api/games/:id/guess      │                           │
   │  { value: 42 }             ────►│                           │
   │                                 │  INSERT INTO Guess        │
   │                                 │  UPDATE Game attempts++ ──►│
   │  ◄─── { feedback, direction }───│◄──────────────────────────│
   │                                 │                           │
   │  POST /api/games/:id/finish     │                           │
   │  { won: true, mistakes: 0 }────►│                           │
   │                                 │  UPDATE Game endedAt, won ►│
   │  ◄─── { gameId, won, ... } ─────│◄──────────────────────────│
   │                                 │                           │
   │  POST /api/games/:id/save       │                           │
   │  { name: "Piloto Alpha" }  ────►│  UPSERT User              │
   │                                 │  UPDATE Game userId ──────►│
   │  ◄─── { saved, position } ──────│◄──────────────────────────│
```

<h2 align="centr">🧩 Árvore de Componentes React <br>
 <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" height="25"/></h2>

```
App.tsx  (estado: tela, modo, config, gameId)
│
├── home.tsx          (tela === 'home')
│     └── Seleção de modo → setTela('setup')
│
├── setup.tsx         (tela === 'setup')
│     └── Configuração → POST /api/games → setTela('game')
│
├── game.tsx          (tela === 'game')
│     ├── SoloGame          (modo === 'solo')
│     ├── VsGame            (modo === 'vs')
│     ├── MemoriaGame       (modo === 'memoria')
│     ├── MemoriaVsGame     (modo === 'memoria-vs')
│     ├── LogicaGame        (modo === 'logica')
│     └── PrecedenciaGame   (modo === 'precedencia')
│
└── ranking.tsx       (tela === 'ranking')
      └── GET /api/ranking/global?gameType=...
```


## 📊 Dificuldades por Modo

| Modo | EASY (🌍 Cadete) | MEDIUM (🚀 Piloto) | HARD (👨‍🚀 Cmd) |
|---|---|---|---|
| Operação Resgate | 1–10, 5 tent. | 1–50, 8 tent. | 1–100, 10 tent. |
| Batalha de Sinais | 1–10, 12 tent. | 1–50, 12 tent. | 1–100, 12 tent. |
| Mapas Estelares | 4×4 (8 pares) | 4×5 (10 pares) | 6×6 (18 pares) |
| Protocolo Lógico | 8 questões, P/Q, `∧∨¬` | 10 questões, P/Q/R, `∧∨¬→` | 12 questões, P/Q/R, `∧∨¬→↔` |
| Hierarquia de Cmds | 8 expressões, `∧∨` | 10 expressões, `∧∨→` | 12 expressões, `∧∨→↔` |


## 🛠️ Scripts de Desenvolvimento

| Script (raiz) | Comando | Descrição |
|---|---|---|
| `npm run dev:frontend` | `vite` | Servidor frontend com HMR |
| `npm run dev:backend` | `nest start --watch` | Backend com reload automático |
| `npm run start:dev` | ambos em paralelo | Desenvolvimento completo |
| `npm run build` | `tsc + vite build + nest build` | Build de produção |
| `npm run typecheck` | `tsc --noEmit` (ambos) | Verificação de tipos |
| `npm run docker:up` | `docker compose up --build` | Stack completa em containers |
| `npm run docker:down` | `docker compose down` | Derrubar containers |
| `npm run studio` | `prisma studio :5555` | GUI do banco de dados |


<h2 align="left">🔐 TypeScript — Configuração Estrita <br>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" height="18"/></h2>

O projeto usa `noUnusedLocals: true` e `noUnusedParameters: true` em ambos os workspaces via `tsconfig.base.json`. Isso garante que nenhuma variável, import ou parâmetro desnecessário seja introduzido no código.

```json
{
  "compilerOptions": 
  {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

> **Impacto nos componentes de jogo:** Os componentes `LogicaGame` e `PrecedenciaGame` desestruturaram apenas as props que realmente utilizam. Props como `p1` e `onNovoJogo` não são importadas nesses modos, pois o design com fases não possui tela de resultado nem botão "novo jogo".