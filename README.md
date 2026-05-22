<h1 align="center"> Kuhaku 🧑🏻‍🚀⚔️🪐 <br>
<img src="./img/logo_atualizada.jpeg" width="450" alt="logo"></h1>

<h2 align="center">💻⛏️ Tecnologias e Ferramentas Utilizadas: </h2>

<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" height="35" alt="VS Code"/><br>
  <img src="https://img.shields.io/badge/Node.js-111827?style=for-the-badge&logo=nodedotjs&logoColor=339933" height="35" alt="Node.js"/>
  <img src="https://img.shields.io/badge/NestJS-111827?style=for-the-badge&logo=nestjs&logoColor=E0234E" height="35" alt="NestJS"/>
  <img src="https://img.shields.io/badge/TypeScript-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" height="35" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB" height="35" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=purple" height="35" alt="Vite"/>
  <img src="https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26" height="35" alt="HTML5"/>
   <img src="https://img.shields.io/badge/-CSS-111827?style=flat-square&logo=css&logoColor=663399" height="35"/>
  <img src="https://img.shields.io/badge/TailwindCSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" height="35" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Prisma-111827?style=for-the-badge&logo=prisma&logoColor=5A67D8" height="35" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Docker-111827?style=for-the-badge&logo=docker&logoColor=2496ed" height="35" alt="Docker"/>
  <img src="https://img.shields.io/badge/Architecture-111827?style=for-the-badge&logo=instructure&logoColor=white" height="35" alt="Architecture"/>
  <img src="https://img.shields.io/badge/Figma-111827?style=for-the-badge&logo=figma&logoColor=F24E1E" height="35" alt="Figma"/>
  <img src="https://img.shields.io/badge/%E2%9A%94%EF%B8%8F_Star_Wars-111827?style=for-the-badge&labelColor=111827&logo=starwars&logoColor=FFE81F" height="35" alt="Star Wars"/> <br>
  <img src="https://img.shields.io/badge/Git-111827?style=for-the-badge&logo=git&logoColor=F05032" height="35" alt="Git"/>
  <img src="https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=white" height="35" alt="GitHub"/>
  <img src="https://img.shields.io/badge/GitHub_Desktop-111827?style=for-the-badge&logo=github&logoColor=purple" height="35" alt="GitHub Desktop"/>
</p>


<h2 align="center"> 🏰 Arquitetura do Projeto <br>
<img src="https://img.shields.io/badge/Architecture-111827?style=flat-square&logo=instructure&logoColor=white"/></h2>


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
│   └── Histórias_de_Usuário.md <img src="https://img.shields.io/badge/User_Stories-111827?style=flat&logo=markdown&logoColor=blue" height="18"/>
│
├── img/ <img src="https://img.shields.io/badge/Assets-green?style=flat&logo=image&logoColor=white" height="18"/>
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


<h2 align="center">Telas 📱 <br>
<img src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=purple" height="25" alt="Vite"/>
<img src="https://img.shields.io/badge/🧑‍🚀_Astronautas-111827?style=for-the-badge" height="25" alt="Astronautas"/></h2>

<table align="center" width="780">
  <tr><th align="center">🏠 Tela Inicial</th></tr>
  <tr><td align="center"><b>Página de entrada do Kuhaku — o astronauta escolhe sua missão entre os seis modos de jogo disponíveis.</b></td></tr>
  <tr><td align="center"><img src="img/tela_inicial.jpeg" width="750" alt="Tela Inicial"/></td></tr>
</table>

<br>

<table align="center" width="780">
  <tr><th align="center">📡 Batalha de Sinais</th></tr>
  <tr><td align="center"><b>Modo multiplayer local: dois astronautas disputam na mesma frequência secreta. Turnos alternados com timer de 15s por jogada — quem sintonizar primeiro vence a rodada. 3 rodadas no total. Ambos podem se cadastrar no ranking ao final. Dificuldades: 🌍 Cadete · 🚀 Piloto · 👨‍🚀 Comandante.</b></td></tr>
  <td align="center"><img src="img/batalha_de_sinais.jpeg" width="750" alt="Batalha de Sinais"/></td></tr>
</table>

<br>

<table align="center" width="780">
  <tr><th align="center">🌕 Mapas Estelares — Solo</th></tr>
  <tr><td align="center"><b>Modo single-player de memória: encontre os pares de coordenadas estelares com cronômetro regressivo (60s + 25s de bônus por par encontrado). Grids: 4×4, 4×5 ou 6×6 conforme a dificuldade.</b></td></tr>
  <tr><td align="center"><img src="img/mapas_estrelares.jpeg" width="750" alt="Mapas Estelares"/></td></tr>
</table>

<br>

<table align="center" width="780">
  <tr><th align="center">🌕 1v1 Mapas Estelares</th></tr>
  <tr><td align="center"><b>Modo multiplayer de memória: dois astronautas disputam quem encontra mais pares de coordenadas no mesmo grid. Turnos alternados com timer por jogada. Grids: 4×4, 4×5 ou 6×6.</b></td></tr>
  <tr><td align="center"><img src="img/1v1_mapas_estrelares.jpeg" width="750" alt="1v1 Mapas Estelares"/></td></tr>
</table>

<br>

<table align="center" width="780">
  <tr><th align="center">🔭 Operação Resgate</th></tr>
  <tr><td align="center"><b>Modo single-player de adivinhação: sintonize a frequência de resgate correta dentro do número de tentativas. Range customizável. Feedback proporcional ao intervalo. Dificuldades: 🌍 Cadete (5 tent.) · 🚀 Piloto (8 tent.) · 👨‍🚀 Comandante (10 tent.).</b></td></tr>
  <tr><td align="center"><img src="img/operação_resgate.jpeg" width="750" alt="Operação Resgate"/></td></tr>
</table>

<br>

<table align="center" width="780">
  <tr><th align="center">🧠 Protocolo Lógico</th></tr>
  <tr><td align="center"><b>A base espacial intercepta transmissões cifradas do cosmos. O astronauta decodifica cada sinal lógico avaliando fórmulas proposicionais (∧ ∨ ¬ → ↔) como VERDADEIRAS ou FALSAS. Cada transmissão revela seu tipo — 🌟 Tautologia, 🕳️ Contradição ou 🪐 Contingência. Timer por questão. Dificuldades: 🌍 Cadete (8 · P,Q · ∧∨¬ · 30s), 🚀 Piloto (10 · P,Q,R · ∧∨¬→ · 20s), 👨‍🚀 Comandante (12 · todos · 15s).</b></td></tr>
  <tr><td align="center"><img src="img/protocolo_lógico.jpeg" width="750" alt="Protocolo Lógico"/></td></tr>
</table>

<br>

<table align="center" width="780">
  <tr><th align="center">⚙️ Hierarquia de Comandos</th></tr>
  <tr><td align="center"><b>O computador da nave perdeu os parênteses das equações lógicas! Adicione os parênteses corretos para restaurar a ordem de precedência dos operadores (∧ antes de ∨, ∨ antes de →, → antes de ↔). Timer por questão. Dificuldades: 🌍 Cadete (8 · ∧∨ · 45s), 🚀 Piloto (10 · ∧∨→ · 35s), 👨‍🚀 Comandante (12 · ∧∨→↔ · 25s).</b></td></tr>
  <tr><td align="center"><img src="img/hierarquia_de_comandos.jpeg" width="750" alt="Hierarquia de Comandos"/></td></tr>
</table>

<br>

<table align="center" width="780">
  <tr><th align="center">🏆 Hall da Fama</th></tr>
  <tr><td align="center"><b>Ranking Galáctico com a pontuação de todos os astronautas por modalidade — filtre por Batalha de Sinais, Operação Resgate, Mapas Estelares, Protocolo Lógico ou Hierarquia de Comandos.</b></td></tr>
  <tr><td align="center"><img src="img/hall_da_fama.jpeg" width="750" alt="Hall da Fama"/></td></tr>
</table>

<h2 align="center">🕹️ Comandos</h2>
 
<p align="left">Clone o repositório via GitHub Desktop ou terminal: <br>
 <img src="https://img.shields.io/badge/-GitHub_Desktop-111827?style=flat-square&logo=github&logoColor=purple"/>
</p>
 
```bash
git clone https://github.com/viictorpaes/Kuhaku
```

<h3 align="center">Rodar localmente <br>
<img src="https://img.shields.io/badge/Local_Host-111827?style=flat-square&logo=readme&logoColor=white"/>
</h3>


```bash
# 1. Sobe o banco PostgreSQL via Docker
docker compose up db -d

# 2. Prepara o banco (rode dentro de backend/)
cd backend
npm run prisma:generate       # gera o Prisma Client
npm run prisma:migrate:deploy # aplica migrations (cria tabelas e GameTypes)
npm run prisma:seed           # popula usuários iniciais (admin, dev, user)

# OPCIONAL — dados de teste
npx tsx --env-file=.env prisma/test-user.ts  # cria usuários com senha bcrypt
npx tsx --env-file=.env prisma/test-game.ts  # cria partidas NUMBER_GUESS de exemplo
cd ..

# 3. Inicia o projeto completo
npm run start:dev      # backend (:3001) + frontend (:5173)
npm run dev:frontend   # só o frontend (:5173)
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
<img src="https://img.shields.io/badge/Prisma_Studio-4ade80?style=flat-square&logo=prisma&logoColor=black"/>
</h2>

> 📖 [Prisma Docs](https://www.prisma.io/docs)

> ⚠️ Os comandos do Prisma devem ser rodados de dentro da pasta `backend/`. <br>
> 💡 **Atenção:** O Prisma Studio será iniciado por padrão na porta **5555** 🚪.

```bash
# Inicializa o Prisma no projeto (cria /prisma e schema.prisma)
npx prisma init

# Gera o Prisma Client (rode sempre após alterar o schema.prisma)
npx prisma generate

# Cria e aplica uma nova migration em desenvolvimento
npx prisma migrate dev --name init

npx prisma migrate dev --name add-vs-guess-gametype

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

# Abre o Prisma Studio no navegador (roda na porta 5555)
npx prisma studio --port 5555

# Abre o Prisma Studio sem abrir o navegador
npx prisma studio --browser none

# Formata o schema.prisma
npx prisma format

# Valida o schema.prisma
npx prisma validate

# Introspecta o banco existente
npx prisma introspect
```

<h2 align="center">3. NPM Scripts<br>
<img src="https://img.shields.io/badge/-NPM-111827?style=flat-square&logo=npm&logoColor=CB3837"/>
</h2>

> ⚠️ Os comandos abaixo devem ser rodados na **raiz** do projeto.

```bash
# Inicia o backend e o frontend juntos (modo desenvolvimento)
npm run start:dev

# Inicia apenas o frontend (porta 5173)
npm run dev:frontend

# Inicia apenas o backend (porta 3001)
npm run dev:backend

# Compila frontend e backend para produção
npm run build

# Verifica tipos TypeScript em todo o projeto
npm run typecheck

# Sobe os containers Docker com rebuild
npm run docker:up

# Para e remove os containers Docker
npm run docker:down

# Abre o Prisma Studio no navegador (porta 5555)
npm run studio
```


<h2 align="center">4. Frontend<br>
<img src="https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26" height="22" alt="HTML5"/>
<img src="https://img.shields.io/badge/CSS3-111827?style=for-the-badge&logo=css3&logoColor=1572B6" height="22" alt="CSS3"/>
  <img src="https://img.shields.io/badge/TailwindCSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" height=22" alt="TailwindCSS"/>
<img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" height="22" alt="React"/>
<img src="https://img.shields.io/badge/-Vite-111827?style=flat-square&logo=vite&logoColor=purple"/>
<img src="https://img.shields.io/badge/-NPM-111827?style=flat-square&logo=npm&logoColor=CB3837"/>
</h2>

> 📖 [Vite Docs](https://vitejs.dev/guide)

> ⚠️ Os comandos devem ser rodados de dentro da pasta `frontend/`

```bash
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

<h2 align="center">📂 Modularização SCM (Service, Module & Controller)<br>
<img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>
<img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
<img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
<img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
</h2>
 
### ![Controller](https://img.shields.io/badge/Controller-TypeScript-F7DF1E?style=flat-square&logo=typescript&logoColor=F7DF1E) `.controller.ts`
 
Camada de **entrada da API**. Recebe as requisições HTTP e define as rotas (`@Get`, `@Post`, `@Put`, `@Delete`). Não contém lógica de negócio — apenas delega ao Service. É aqui que decorators de documentação e metadados de rota são aplicados.
 
**Arquivos neste projeto:** `app.controller.ts` `game.controller.ts` `auth.controller.ts` `user.controller.ts`
 
---
 
### ![Service](https://img.shields.io/badge/Service-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=3178C6) `.service.ts`
 
Camada de **lógica de negócio**. Processa os dados recebidos do Controller, aplica as regras da aplicação (validações, hash de senha com `bcrypt`, geração de JWT) e comunica com o banco via Prisma. Injetado no Controller via `@Injectable()`.
 
**Arquivos neste projeto:** `prisma.service.ts` `game.service.ts` `auth.service.ts` `user.service.ts`
 
---
 
### ![Module](https://img.shields.io/badge/Module-TypeScript-E0234E?style=flat-square&logo=typescript&logoColor=E0234E) `.module.ts`
 
**Unidade de organização** do NestJS. Agrupa e registra o Controller e o Service de um domínio (`imports`, `providers`, `controllers`, `exports`). Permite que outros módulos reutilizem os providers via <b>`exports`</b>. O `AppModule` é o módulo raiz que importa todos os demais.
 
**Arquivos neste projeto:** `app.module.ts` `game.module.ts` `auth.module.ts` `user.module.ts`


<h2 align="center">🎮 Modos de Jogo <br>
<img src="https://img.shields.io/badge/%F0%9F%8E%AE_Modos_de_Jogo-111827?style=for-the-badge&labelColor=111827&logoColor=white" height="18" alt="Modos de Jogo"/>
</h2>

| Modo | Frontend `Modo` | Backend `GameType` | Descrição | Dificuldade |
|---|---|---|---|---|
| **📡 Batalha de Sinais** | `vs` | `VS_GUESS` | 2 astronautas adivinham a mesma frequência. Turnos alternados · timer 15s/jogada · 3 rodadas · 12 tentativas/rodada. Ambos se cadastram no ranking ao final. | 🌍 Cadete 1–10 · 🚀 Piloto 1–50 · 👨‍🚀 Comandante 1–100 |
| **🔭 Operação Resgate** | `solo` | `NUMBER_GUESS` | Solo. Adivinha a frequência com feedback proporcional ao range. Range customizável via `customRange`. | 🌍 Cadete (5 tent.) · 🚀 Piloto (8 tent.) · 👨‍🚀 Comandante (10 tent.) |
| **🌕 Mapas Estelares** | `memoria` | `CARD_GUESS` | Solo. Grid de pares com cronômetro regressivo (60s base + 25s bônus/par). Redireciona para ranking CARD_GUESS após salvar. | 🌍 Cadete 4×4 (8p) · 🚀 Piloto 4×5 (10p) · 👨‍🚀 Comandante 6×6 (18p) |
| **🌕 1v1 Mapas Estelares** | `memoria-vs` | `CARD_GUESS` | 2 astronautas disputam pares no mesmo grid. Turnos alternados com timer. | 🌍 Cadete 4×4 · 🚀 Piloto 4×5 · 👨‍🚀 Comandante 6×6 |
| **🧠 Protocolo Lógico** | `logica` | `LOGIC_PUZZLE` | Solo. Avalia fórmulas proposicionais (∧ ∨ ¬ → ↔) como V/F + classifica em Tautologia/Contradição/Contingência. Timer por questão. | 🌍 Cadete (8 · P,Q · 30s) · 🚀 Piloto (10 · P,Q,R · 20s) · 👨‍🚀 Cmd (12 · 15s) |
| **⚙️ Hierarquia de Comandos** | `precedencia` | `PRECEDENCE_PUZZLE` | Solo. Reinsere parênteses para restaurar a precedência (∧>∨>→>↔). Timer por questão. | 🌍 Cadete (8 · ∧∨ · 45s) · 🚀 Piloto (10 · ∧∨→ · 35s) · 👨‍🚀 Cmd (12 · 25s) |

**GameTypes do backend (Prisma):** `NUMBER_GUESS` · `VS_GUESS` · `CARD_GUESS` · `LOGIC_PUZZLE` · `PRECEDENCE_PUZZLE`

**Tentativas por dificuldade (NUMBER_GUESS):** EASY → 5 · MEDIUM → 8 · HARD → 10

**Tentativas por rodada (VS_GUESS):** 12 independente da dificuldade — turnos alternados · timer 15s/jogada

**Endpoints:**
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/games/:id/finish` | Salva/encerra a partida — revela o target |
| `POST` | `/api/games/:id/save` | Salva resultado no ranking com apelido `{ name }` → retorna `{ saved: true, position, total }` (`position` pode ser `null` se o jogador não venceu nenhuma partida) |
| `GET` | `/api/ranking/global?gameType=VS_GUESS` | Ranking — 📡 Batalha de Sinais |
| `GET` | `/api/ranking/global?gameType=NUMBER_GUESS` | Ranking — 🔭 Operação Resgate |
| `GET` | `/api/ranking/global?gameType=CARD_GUESS` | Ranking — 🌕 Mapas Estelares (solo + 1v1) |
| `GET` | `/api/ranking/global?gameType=LOGIC_PUZZLE` | Ranking — 🧠 Protocolo Lógico |
| `GET` | `/api/ranking/global?gameType=PRECEDENCE_PUZZLE` | Ranking — ⚙️ Hierarquia de Comandos |

**Feedback de número (proporcional ao intervalo):**

| Diferença | Interno (backend) | Exibido ao jogador (frontend) |
|---|---|---|
| 0 | acertou ✅ | 📡 Sinal estabelecido! Resgate a caminho! |
| ≤ 10% do range | pegando fogo 🔥🔥🔥 | 🔭 Frequência muito próxima! |
| ≤ 20% do range | quente 🌡️ | 📶 Sinal detectado! |
| ≤ 40% do range | morno ☔️ | 🌌 Interferência estática... |
| > 40% do range | frio ❄️ | 🔇 Sem sinal no espaço... |


<h2 align="center"><b>Lógica do Jogo em</b>: <i>backend/src/game/</i> <br>
<img src="https://img.shields.io/badge/<>src-green?style=flat&logo=image&logoColor=white" height="18"/><img src="https://img.shields.io/badge/-Game-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/><img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/></h2>

1. `backend/src/game/ts/` <br>
<img src="https://img.shields.io/badge/-Game-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>

```ts
// Arquivo: backend/src/game/ts/game.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from '../../game/dto/create-game.dto';
import { CreateUserDto } from '../dto/user.dto';
import { GuessDto } from '../dto/guess.dto';
import { UpdateUserDto } from '../dto/user_update.dto';

@Controller('api')
export class GameController
{
  constructor(private readonly gameService: GameService) 
  {}

  @Post('users')
  async criarUsuario(@Body() dto: CreateUserDto)
  {
    return this.gameService.createUser(dto.email, dto.name);
  }

  @Put('users/:id')
  async atualizarUsuario(@Param('id') id: string, @Body() dto: UpdateUserDto)
  {
    return this.gameService.updateUser(id, dto as any);
  }

  @Delete('users/:id')
  async removerUsuario(@Param('id') id: string)
  {
    return this.gameService.removeUser(id);
  }

  @Post('games')
  async criarJogo(@Body() dto: CreateGameDto)
  {
    return this.gameService.createGame(dto);
  }

  @Post('games/:id/guess')
  async fazerPalpite(@Param('id') id: string, @Body() dto: GuessDto)
  {
    return this.gameService.makeGuess(id, dto.value);
  }

  @Post('games/:id/finish')
  async encerrarJogo(@Param('id') id: string, @Body() body?: { won?: boolean })
  {
    return this.gameService.finishGame(id, body?.won);
  }

  @Post('games/:id/save')
  async salvarNoRanking(@Param('id') id: string, @Body() body: { name: string })
  {
    return this.gameService.saveGameToRanking(id, body.name);
  }

  @Get('games/:id/history')
  async obterHistoricoDoJogo(@Param('id') id: string)
  {
    return this.gameService.getGameHistory(id);
  }

  @Get('games/:id/summary')
  async resumoDoJogo(@Param('id') id: string)
  {
    return this.gameService.getGameSummary(id);
  }

  @Get('users/:id/games')
  async listarJogosDoUsuario(@Param('id') id: string)
  {
    return this.gameService.listUserGames(id);
  }

  @Get('users/:id/stats')
  async estatisticasDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserStats(id);
  }

  @Get('users/:id/achievements')
  async conquistasDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserAchievements(id);
  }

  @Get('users/:id/summary')
  async resumoCompletoDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserSummary(id);
  }

  @Get('ranking/global')
  async rankingGlobal(@Query('limit') limit?: string, @Query('gameType') gameType?: string)
  {
    return this.gameService.getGlobalRanking(limit ? parseInt(limit, 10) : 10, gameType);
  }

  @Get('ranking/user/:id')
  async rankingDoUsuario(@Param('id') id: string)
  {
    return this.gameService.getUserRanking(id);
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

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto, Difficulty, GameType } from '../dto/create-game.dto';

function getLimitByDifficulty(difficulty: Difficulty): number
{
  switch (difficulty)
  {
    case 'EASY':   return 10;
    case 'MEDIUM': return 50;
    case 'HARD':   return 100;
  }
}

function getMaxAttempts(difficulty: Difficulty): number
{
  switch (difficulty)
  {
    case 'EASY':   return 5;
    case 'MEDIUM': return 7;
    case 'HARD':   return 10;
  }
}

function getNumberFeedback(diff: number, limit: number): string
{
  if (diff === 0)                       return 'acertou ✅';
  if (diff <= Math.ceil(limit * 0.10))  return 'pegando fogo 🔥🔥🔥';
  if (diff <= Math.ceil(limit * 0.20))  return 'quente 🌡️';
  if (diff <= Math.ceil(limit * 0.40))  return 'morno ☔️';
  return 'frio ❄️';
}

@Injectable()
export class GameService
{
  constructor(private readonly prismaService: PrismaService) {}

  async createGame(dto: CreateGameDto)
  {
    const gameType: GameType = dto.gameType ?? 'NUMBER_GUESS';
    const limit  = getLimitByDifficulty(dto.difficulty);
    const target = Math.floor(Math.random() * limit) + 1;
    return this.prismaService.prisma.game.create({ data: { userId: dto.userId ?? null, gameType, difficulty: dto.difficulty, target, attempts: 0, won: false } });
  }

  async makeGuess(gameId: string, value: number): Promise<any>
  {
    // maxAttempts: 12 para VS_GUESS, getMaxAttempts(difficulty) para NUMBER_GUESS
    // retorna { feedback, direction, attemptsLeft } ou { gameOver: true, target }
  }

  async finishGame(gameId: string, won?: boolean): Promise<any>
  {
    const updateData: Record<string, any> = {};
    if (!game.endedAt)     updateData.endedAt = new Date();
    if (won !== undefined) updateData.won = won;
  }
}
```

2. `backend/src/game/dto/` <br>
<img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/>

### DTOs (Data Transform Objects) usados pelo módulo de jogo — definem a forma dos dados esperados nas requisições. <br>
<img src="https://img.shields.io/badge/-Data_Transform_Object_(DTO)-111827?style=flat&logo=typescript&logoColor=orange" height="18" alt="DTO"/>

```ts
// Arquivo: backend/src/game/dto/create-game.dto.ts
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type GameType   = 'NUMBER_GUESS' | 'VS_GUESS' | 'CARD_GUESS' | 'LOGIC_PUZZLE' | 'PRECEDENCE_PUZZLE';

export class CreateGameDto
{
  userId?:      string;
  difficulty!:  Difficulty;
  gameType?:    GameType;
  customRange?: number;   // range máximo customizado para NUMBER_GUESS
}
```

```ts
// Arquivo: backend/src/game/dto/guess.dto.ts
export class GuessDto
{
  gameId!: string;
  value!:  number; 
}
```

```ts
// Arquivo: backend/src/game/dto/user.dto.ts
export class CreateUserDto
{
  email!:  string;
  name?:   string;
}
```

```ts
// Arquivo: backend/src/game/dto/user_update.dto.ts
export class UpdateUserDto
{
  name?:  string;
  email?: string;
}
```

<h2 align="center">
  <b>Visual do Jogo em</b>: <i>frontend/src/</i> <br>
  <img src="https://img.shields.io/badge/<>src-green?style=flat&logo=image&logoColor=white" height="18" alt="Source"/>
  <img src="https://img.shields.io/badge/-HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18" alt="HTML5"/>
  <img src="https://img.shields.io/badge/-CSS3-111827?style=flat&logo=css3&logoColor=1572B6" height="18" alt="CSS3"/>
  <img src="https://img.shields.io/badge/-TailwindCSS-111827?style=flat&logo=tailwindcss&logoColor=06B6D4" height="18" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/-React-111827?style=flat&logo=react&logoColor=61DAFB" height="18" alt="React"/>
  <img src="https://img.shields.io/badge/-Vite-111827?style=flat&logo=vite&logoColor=purple" height="18" alt="Vite"/>
  <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=TypeScript&logoColor=3178C6" height="18" alt="TypeScript"/>
</h2>

1. `frontend/src/types.ts` + `frontend/src/constants.ts` <br>
<img src="https://img.shields.io/badge/Types-111827?style=flat&logo=typescript&logoColor=3178C6" height="18" alt="types"/><img src="https://img.shields.io/badge/-Constants-111827?style=flat&logo=typescript&logoColor=red" height="18"/>

```ts
// frontend/src/types.ts
export type Tela = 'home' | 'setup' | 'game' | 'result' | 'ranking';
export type Modo = 'solo' | 'vs' | 'memoria' | 'memoria-vs' | 'logica' | 'precedencia';
export type Dificuldade = 'EASY' | 'MEDIUM' | 'HARD';
export type Direcao = 'higher' | 'lower' | 'correct' | 'timeout';

export interface Palpite 
{
  valor: number;
  feedback: string;
  direcao: Direcao;
  jogador: 1 | 2;
}

export interface ConfigJogo 
{
  dificuldade: Dificuldade;
  p1: string;
  p2: string;
  timerSegundos?: number | null;
  rangeMax?: number;
}
```

```ts
// frontend/src/constants.ts
import type { Dificuldade } from './types';

export const TOTAL_ROUNDS_VS    = 3;
export const MAX_TENTATIVAS_VS  = 12;
export const TIMER_VS_TURNO     = 15;   // segundos por jogada no modo VS

export const MAX_TENTATIVAS_SOLO: Record<Dificuldade, number> =
{
  EASY: 5,
  MEDIUM: 8,
  HARD: 10,
};

export const RANGE_LABEL: Record<Dificuldade, string> =
{
  EASY:   'Canal 1-10',
  MEDIUM: 'Canal 1-50',
  HARD:   'Canal 1-100',
};

export const RANGE_MAX: Record<Dificuldade, number> =
{
  EASY:   10,
  MEDIUM: 50,
  HARD:   100,
};

export const DIF_LABEL: Record<Dificuldade, string> =
{
  EASY:   '🌍 Cadete',
  MEDIUM: '🚀 Piloto',
  HARD:   '👨‍🚀 Comandante',
};

export const DIF_COLOR: Record<Dificuldade, { bg: string; hover: string; btn: string }> =
{
  EASY:   { bg: 'bg-cyan-700',   hover: 'hover:bg-cyan-600',   btn: 'bg-cyan-700 hover:bg-cyan-600'     },
  MEDIUM: { bg: 'bg-blue-700',   hover: 'hover:bg-blue-600',   btn: 'bg-blue-700 hover:bg-blue-600'     },
  HARD:   { bg: 'bg-violet-700', hover: 'hover:bg-violet-600', btn: 'bg-violet-700 hover:bg-violet-600' },
};

export const MEMORIA_GRID: Record<Dificuldade, { cols: number; rows: number; label: string; pairs: number }> =
{
  EASY:   { cols: 4, rows: 4, label: '4×4', pairs: 8  },
  MEDIUM: { cols: 4, rows: 5, label: '4×5', pairs: 10 },
  HARD:   { cols: 6, rows: 6, label: '6×6', pairs: 18 },
};

// timer base e bônus por par no modo Memória
export const MEMORIA_TIMER_INICIAL = 60;
export const MEMORIA_BONUS_PAR     = 25;

export const LOGICA_CONFIG: Record<Dificuldade, { count: number; label: string; description: string }> =
{
  EASY:   { count: 8,  label: '🌍 Cadete',     description: 'P, Q · ∧ ∨ ¬ · 8 transmissões'           },
  MEDIUM: { count: 10, label: '🚀 Piloto',      description: 'P, Q, R · ∧ ∨ ¬ → · 10 transmissões'   },
  HARD:   { count: 12, label: '👨‍🚀 Comandante',  description: 'P, Q, R · ∧ ∨ ¬ → ↔ · 12 transmissões' },
};

export const TIMER_LOGICA: Record<Dificuldade, number> =
{
  EASY:   30,
  MEDIUM: 20,
  HARD:   15,
};

export const PARENTESES_CONFIG: Record<Dificuldade, { count: number; label: string; description: string }> =
{
  EASY:   { count: 8,  label: '🌍 Cadete',     description: '∧ ∨ · 8 expressões'       },
  MEDIUM: { count: 10, label: '🚀 Piloto',      description: '∧ ∨ → · 10 expressões'    },
  HARD:   { count: 12, label: '👨‍🚀 Comandante',  description: '∧ ∨ → ↔ · 12 expressões'  },
};

export const TIMER_PRECEDENCIA: Record<Dificuldade, number> =
{
  EASY:   45,
  MEDIUM: 35,
  HARD:   25,
};
```

2. `frontend/src/main.tsx` <br>
<img src="https://img.shields.io/badge/Main-61DAFB?style=flat&logo=react&logoColor=black" height="18" alt="src"/>

```ts
// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

document.documentElement.classList.add('h-full');
document.body.className = 'min-h-screen bg-[#0d1b2e] text-slate-100 antialiased';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'development' ? 'http://localhost:3001' : '');
  (window as any).API_BASE_URL = API_BASE_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

3. `frontend/src/App.tsx` <br>
<img src="https://img.shields.io/badge/App-61DAFB?style=flat&logo=react&logoColor=black" height="18" alt="App"/>

```ts
// frontend/src/App.tsx
import { useState, useCallback } from 'react';
import { Home } from './components/home';
import { Setup } from './components/setup';
import { Game, VsResultScreen } from './components/game';
import { Ranking } from './components/ranking';
import type { Tela, Modo, Dificuldade, ConfigJogo } from './types';
import type { GameTypeFilter } from './components/ranking';
import { TOTAL_ROUNDS_VS } from './constants';

const API_URL = (window as any).API_BASE_URL ?? 'http://localhost:3001';

async function criarJogo(dificuldade: Dificuldade, gameType?: string): Promise<string>
{
  const res = await fetch(`${API_URL}/api/games`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty: dificuldade, ...(gameType && { gameType }) }),
  });
  const game = await res.json();
  return game.id;
}

export function App()
{
  const [tela, setTela] = useState<Tela>('home');
  const [modo, setModo] = useState<Modo | null>(null);
  const [dificuldade, setDificuldade] = useState<Dificuldade | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [p1, setP1] = useState('Jogador 1');
  const [p2, setP2] = useState('Jogador 2');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const [finalScore, setFinalScore] = useState<{ p1: number; p2: number } | null>(null);
  const [vsRoundResults, setVsRoundResults] = useState<{ gameId: string; winner: 1 | 2 | null }[]>([]);
  const [rankingFilter, setRankingFilter] = useState<GameTypeFilter | undefined>(undefined);

  const iniciarJogo = useCallback(async (config: ConfigJogo) =>
  {
    setDificuldade(config.dificuldade);
    setP1(config.p1 || 'Jogador 1');
    setP2(config.p2 || 'Jogador 2');
    setRound(1);
    setScore({ p1: 0, p2: 0 });
    setFinalScore(null);
    setVsRoundResults([]);
    const isVs         = modo === 'vs';
    const isMemoria    = modo === 'memoria';
    const isLogica     = modo === 'logica';
    const isPrecedencia = modo === 'precedencia';
    const id = await criarJogo(
      config.dificuldade,
      isVs ? 'VS_GUESS' : isMemoria ? 'CARD_GUESS' : isLogica ? 'LOGIC_PUZZLE' : isPrecedencia ? 'PRECEDENCE_PUZZLE' : undefined,
    );
    setGameId(id);
    setTela('game');
  }, [modo]);

  const onRoundEnd = useCallback(async (winner: 1 | 2 | null) =>
  {
    setVsRoundResults((prev) => [...prev, { gameId: gameId!, winner }]);

    const newScore = { ...score };
    if (winner === 1) newScore.p1++;
    if (winner === 2) newScore.p2++;
    setScore(newScore);

    if (round >= TOTAL_ROUNDS_VS)
    {
      setFinalScore(newScore);
      setTela('result');
    }
    else
    {
      setRound((r) => r + 1);
      const id = await criarJogo(dificuldade!, 'VS_GUESS');
      setGameId(id);
    }
  }, [round, score, dificuldade, gameId]);

  const novoJogoSolo = useCallback(async () =>
  {
    const gameType =
      modo === 'memoria'     ? 'CARD_GUESS' :
      modo === 'logica'      ? 'LOGIC_PUZZLE' :
      modo === 'precedencia' ? 'PRECEDENCE_PUZZLE' : undefined;
    const id = await criarJogo(dificuldade!, gameType);
    setGameId(id);
  }, [dificuldade, modo]);

  const voltarParaHome = () =>
  {
    setTela('home');
    setModo(null);
    setDificuldade(null);
    setGameId(null);
    setRound(1);
    setScore({ p1: 0, p2: 0 });
    setFinalScore(null);
    setVsRoundResults([]);
  };

  if (tela === 'ranking')
    return <Ranking onBack={() => { setRankingFilter(undefined); setTela('home'); }} apiUrl={API_URL} initialFilter={rankingFilter} />;

  if (tela === 'result')
  {
    return (
      <VsResultScreen
        p1={p1}
        p2={p2}
        finalScore={finalScore!}
        vsRoundResults={vsRoundResults}
        apiUrl={API_URL}
        onJogarNovamente={() => iniciarJogo({ dificuldade: dificuldade!, p1, p2 })}
        onVoltarHome={voltarParaHome}
        onOpenRanking={() => setTela('ranking')}
      />
    );
  }

  if (tela === 'setup')
  {
    return (
      <Setup
        modo={modo!}
        onStart={iniciarJogo}
        onBack={() => setTela('home')}
        onOpenRanking={() => setTela('ranking')}
      />
    );
  }

  if (tela === 'game')
  {
    return (
      <Game
        key={gameId!}
        gameId={gameId!}
        modo={modo!}
        dificuldade={dificuldade!}
        p1={p1}
        p2={p2}
        round={round}
        score={score}
        apiUrl={API_URL}
        onBack={voltarParaHome}
        onOpenRanking={(filter) => { setRankingFilter(filter as GameTypeFilter | undefined); setTela('ranking'); }}
        onRoundEnd={onRoundEnd}
        onNovoJogo={novoJogoSolo}
      />
    );
  }

  return (
    <Home
      onSelectMode={(m) => { setModo(m); setTela('setup'); }}
      onOpenRanking={() => setTela('ranking')}
    />
  );
}
```

4. `frontend/src/components/` <br>
<img src="https://img.shields.io/badge/components-2B2D42?style=flat&logo=react&logoColor=61DAFB" height="18" alt="components"/>

```ts
// components/home.tsx — tela inicial com seleção de modo de jogo
export function Home({ onSelectMode, onOpenRanking }: HomeProps)
{
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-5xl font-black">
        <span className="text-white">Kuha</span><span style={{ color: '#06b6d4' }}>ku</span>
      </h1>

      <button onClick={() => onSelectMode('vs')} className="w-full rounded-3xl p-6 ..."
        style={{ background: 'linear-gradient(135deg, #0284c7, #0ea5e9, #06b6d4, #0891b2)' }}>
        📡 Batalha de Sinais — 2 astronautas · 3 rodadas
      </button>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => onSelectMode('solo')} className="rounded-3xl p-6 ...">
          🔭 Operação Resgate — Solo · sistema de sinal inteligente
        </button>
        <button onClick={() => onSelectMode('memoria')} className="rounded-3xl p-6 ...">
          🌕 Mapas Estelares — pares de coordenadas · 4×4 / 4×5 / 6×6
        </button>
      </div>

      <button onClick={() => onSelectMode('precedencia')} className="w-full rounded-3xl p-6 ..."
        style={{ background: 'linear-gradient(135deg, #1e1040, #2d1b69, #1a0f3e)' }}>
        ⚙️ Hierarquia de Comandos — parênteses · precedência · ∧ ∨ → ↔
      </button>

      <button onClick={onOpenRanking}>🏆 Ver Ranking da Missão</button>
    </div>
  );
}
```

```ts
// components/setup.tsx — configuração antes de iniciar
// VsSetup:      campos de texto para Astronauta 1 / 2 + seletor de patente (Cadete / Piloto / Comandante)
// SoloSetup:    cards de patente com range de frequência
// MemoriaSetup: cards de tamanho de tabuleiro (4×4 / 4×5 / 6×6) com nº de pares
export function Setup({ modo, onStart, onBack, onOpenRanking }: SetupProps)
{
  if (modo === 'vs')      return <VsSetup {...} />;
  if (modo === 'memoria') return <MemoriaSetup {...} />;
  return <SoloSetup {...} />;
}
```

```ts
// components/game.tsx — tela de jogo (6 modos) + tela de resultado VS

// VsGame: displayScore antecipa o +1 quando roundOver.winner é definido (sem esperar o clique em "avançar")
// rodada encerra quando direction === 'correct' ou dados.gameOver === true (tentativas esgotadas no backend)
// MemoriaGame: ao completar todos os pares chama POST /api/games/:id/finish com { won: true }
// ao salvar (handleSalvar), chama onOpenRanking('CARD_GUESS') → abre o ranking já na aba correta
// LogicaGame: avalia fórmulas proposicionais V/F com timer por questão; classifica em Tautologia/Contradição/Contingência
// PrecedenciaGame: o jogador insere parênteses clicando nos tokens; verificar() compara com normalizar()
// SaveRankingPanel — reutilizado nos 5 modos solo + VsResultScreen; onOpenRanking recebe filtro opcional

// displayScore (VsGame): preview do placar antes do avanço de rodada
const displayScore =
{
  p1: score.p1 + (roundOver?.winner === 1 ? 1 : 0),
  p2: score.p2 + (roundOver?.winner === 2 ? 1 : 0),
};

// SaveRankingPanel — exibido após vitória/derrota (reutilizado nos 5 modos solo + VsResultScreen)
// savedPosition: { position: number | null; total: number } | null
//   null          → exibe formulário de apelido
//   position != null → 🏆 #X de Y jogadores
//   position === null → ✅ Resultado salvo! (participação sem vitória — não aparece no ranking)
function SaveRankingPanel({ saveNome, setSaveNome, saving, savedPosition, saveErro, onSalvar, onOpenRanking })
{
  if (savedPosition)
  {
    if (savedPosition.position != null)
      return <p>🏆 #{savedPosition.position} de {savedPosition.total} jogadores!</p>;
    return <p>✅ Resultado salvo! Vença uma rodada para aparecer no ranking.</p>;
  }
  return (
    <form onSubmit={onSalvar}>
      <input value={saveNome} onChange={(e) => setSaveNome(e.target.value)} placeholder="Seu apelido" maxLength={30} />
      <button type="submit" disabled={saving || !saveNome.trim()}>
        {saving ? '...' : '💾 Salvar'}
      </button>
      {saveErro && <p>{saveErro}</p>}
    </form>
  );
}

// VsResultScreen — resultado final com save para AMBOS os jogadores
// gameIdP1: primeiro round ganho por P1 (fallback: rounds[0])
// gameIdP2: primeiro round ganho por P2 (fallback: primeiro round diferente do gameIdP1)
export function VsResultScreen({ p1, p2, finalScore, vsRoundResults, apiUrl, ... })
{ ... }

export function Game(props: GameProps)
{
  if (props.modo === 'vs')          return <VsGame {...props} />;
  if (props.modo === 'memoria')     return <MemoriaGame {...props} />;
  if (props.modo === 'memoria-vs')  return <MemoriaVsGame {...props} />;
  if (props.modo === 'logica')      return <LogicaGame {...props} />;
  if (props.modo === 'precedencia') return <PrecedenciaGame {...props} />;
  return <SoloGame {...props} />;
}
```

```ts
// components/ranking.tsx — Hall da Fama com filtro por missão
// Tabs: 🌌 Galáxia | 📡 Batalha de Sinais | 🔭 Operação Resgate | 🌕 Mapas Estelares | 🧠 Protocolo Lógico | ⚙️ Hierarquia de Cmds
// GET /api/ranking/global?limit=10&gameType=<filtro>
// Ordenação: menor média de tentativas = melhor posição (LOGIC_PUZZLE/PRECEDENCE_PUZZLE: menor nº de erros)
// Medalhas: 🥇🥈🥉 para top 3 · posição numérica para o restante
// initialFilter: abre o ranking já na aba correta (ex: MemoriaGame abre CARD_GUESS após save)

export type GameTypeFilter = 'all' | 'NUMBER_GUESS' | 'VS_GUESS' | 'CARD_GUESS' | 'LOGIC_PUZZLE' | 'PRECEDENCE_PUZZLE';

const TABS: { label: string; value: GameTypeFilter }[] =
[
  { label: '🌌 Galáxia',               value: 'all'                },
  { label: '📡 Batalha de Sinais',     value: 'VS_GUESS'           },
  { label: '🔭 Operação Resgate',      value: 'NUMBER_GUESS'       },
  { label: '🌕 Mapas Estrelares',      value: 'CARD_GUESS'         },
  { label: '🧠 Protocolo Lógico',      value: 'LOGIC_PUZZLE'       },
  { label: '⚙️ Hierarquia de Cmds',    value: 'PRECEDENCE_PUZZLE'  },
];

const SUBTITULO: Record<GameTypeFilter, string> =
{
  all:               '🌌 Ranking Galáctico — todos os astronautas',
  VS_GUESS:          '📡 Batalha de Sinais — ambos se cadastram ao final',
  NUMBER_GUESS:      '🔭 Operação Resgate — missões solo',
  CARD_GUESS:        '🌕 Mapas Estelares — jogo da memória',
  LOGIC_PUZZLE:      '🧠 Protocolo Lógico — menor número de erros',
  PRECEDENCE_PUZZLE: '⚙️ Hierarquia de Comandos — precedência de operadores',
};

const BADGE_LABEL: Record<GameTypeFilter, string> =
{
  all:               '🌌 Geral',
  VS_GUESS:          '📡 Batalha',
  NUMBER_GUESS:      '🔭 Resgate',
  CARD_GUESS:        '🌕 Mapas',
  LOGIC_PUZZLE:      '🧠 Protocolo',
  PRECEDENCE_PUZZLE: '⚙️ Hierarquia',
};

interface RankingProps
{
  onBack: () => void;
  apiUrl: string;
  initialFilter?: GameTypeFilter;
}

export function Ranking({ onBack, apiUrl, initialFilter }: RankingProps)
{
  const [filtro, setFiltro] = useState<GameTypeFilter>(initialFilter ?? 'all');

  useEffect(() =>
  {
    const query = filtro === 'all' ? '' : `&gameType=${filtro}`;
    fetch(`${apiUrl}/api/ranking/global?limit=10${query}`)
      .then((r) => r.json())
      .then((data) => setRanking(Array.isArray(data) ? data : []));
  }, [apiUrl, filtro]);
}
```

5. `frontend/src/components/song/StarWarsMainTheme.mp3` + `frontend/src/ts/audio.ts` <br>
<img src="https://img.shields.io/badge/%E2%9A%94%EF%B8%8F_Star_Wars-111827?style=for-the-badge&labelColor=111827&logo=starwars&logoColor=FFE81F" height="18" alt="Star Wars"/>
<img src="https://img.shields.io/badge/Web_Audio_API-111827?style=flat&logo=typescript&logoColor=red" height="18"/>
<img src="https://img.shields.io/badge/MP3-111827?style=flat&logo=audacity&logoColor=red" height="18"/>

### 🎵🎧 Sistema de Áudio:

O <mark><b>Kuhaku</b></mark> possui dois mecanismos de áudio independentes, ambos implementados em `frontend/src/ts/audio.ts`:

**1. Trilha sonora de fundo — `starWarsTheme`**

Toca `StarWarsMainTheme.mp3` em loop contínuo durante toda a sessão do jogo. O objeto exportado expõe os métodos `start()`, `stop()`, `mute()` e `unmute()`, e o getter `muted` para verificar o estado atual. A reprodução é iniciada na primeira interação do usuário (obrigatório pelos navegadores modernos para respeitar a política de autoplay).


```ts
export const starWarsTheme = 
{
  get muted() { return audio.muted; },
  start() 
  {
    if (audio.paused) audio.play().catch(() => {});
  },

  stop() 
  {
    audio.pause();
    audio.currentTime = 0;
  },

  mute() { audio.muted = true; },
  unmute() { audio.muted = false; },
};

```

**2. Efeitos sonoros procedurais — Web Audio API**


Usa `AudioContext` para sintetizar sons em tempo real sem arquivos externos:

| Função | Descrição | Frequências |
|---|---|---|
| `playArcadeCorrect()` | Acerto — três notas ascendentes ✅ | 523 Hz → 659 Hz → 784 Hz (`sine`) |
| `playArcadeError()` | Erro — dois beeps descendentes ❌ | 220 Hz → 180 Hz (`sawtooth`) |


```ts
et _audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext
{
  if (!_audioCtx) _audioCtx = new AudioContext();
  return _audioCtx;
}

const _unlock = () => getAudioCtx().resume().catch(() => {});
document.addEventListener('click', _unlock);
document.addEventListener('keydown', _unlock);

function _scheduleBeep(ctx: AudioContext, frequency: number, duration: number, type: OscillatorType, volume: number)
{
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function beep(frequency: number, duration: number, type: OscillatorType = 'square', volume = 0.18)
{
  try
  {
    const ctx = getAudioCtx();
    if (ctx.state === 'running')
      _scheduleBeep(ctx, frequency, duration, type, volume);
    else
      ctx.resume().then(() => _scheduleBeep(ctx, frequency, duration, type, volume)).catch(() => {});
  } catch { }
}

export function playArcadeError() 
{
  beep(220, 0.15, 'sawtooth', 0.2);
  setTimeout(() => beep(180, 0.20, 'sawtooth', 0.2), 120);
}

export function playArcadeCorrect() 
{
  beep(523, 0.10, 'sine', 0.18);
  setTimeout(() => beep(659, 0.10, 'sine', 0.18), 100);
  setTimeout(() => beep(784, 0.18, 'sine', 0.22), 200);
}

```

O contexto é desbloqueado automaticamente em cada `click` ou `keydown` para cobrir o caso de o browser suspender o `AudioContext` após troca de aba ou criação fora de um gesto do usuário.


<h2 align="center">👤🌱 Teste de Criação de Usuário / Seed<br>
<img src="https://img.shields.io/badge/Test_User_Create-111827?style=flat&logo=typescript&logoColor=purple" height="18"/><img src="https://img.shields.io/badge/-Seed-111827?style=flat&logo=typescript&logoColor=2E8B57" height="18"/><img src="https://img.shields.io/badge/-Guess-111827?style=flat&logo=typescript&logoColor=orange" height="18"/>
</h2>

<b>1</b>. `backend/prisma/seed.ts` <br>
<img src="https://img.shields.io/badge/-Seed-111827?style=flat&logo=typescript&logoColor=2E8B57" height="18"/>

```bash
npx prisma db seed
```

```ts
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

const usuarios = 
[
  { email: 'admin@kuhaku.local',  name: 'Admin Kuhaku'         },
  { email: 'dev@kuhaku.local',    name: 'Desenvolvedor Kuhaku'  },
  { email: 'user@kuhaku.local',   name: 'Usuário Padrão'        },
];

async function main() 
{
  console.log('🌱 Iniciando seed de usuários...');

  for (const usuario of usuarios) 
  {
    await prismaClient.user.upsert
    (
      {
        where:  { email: usuario.email },
        update: {},
        create: usuario,
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
```

<b>2</b>. `backend/prisma/test_user.ts` <br>
<img src="https://img.shields.io/badge/Test_User_Create-111827?style=flat&logo=typescript&logoColor=purple" height="18"/>

```bash
cd backend
npx tsx --env-file=.env prisma/test-user.ts
```
 
```ts

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
```

<b>3</b>. `backend/prisma/test-game.ts` <br>
<img src="https://img.shields.io/badge/Test_Game_Create-111827?style=flat&logo=typescript&logoColor=blue" height="18"/><img src="https://img.shields.io/badge/-Guess-111827?style=flat&logo=typescript&logoColor=orange" height="18"/>

```bash
cd backend
npx tsx --env-file=.env prisma/test-game.ts
```

```ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Difficulty } from '@prisma/client';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prismaClient = new PrismaClient({ adapter });

function randomInt(min: number, max: number)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function limitByDifficulty(d: Difficulty)
{
  if (d === 'EASY')   return 10;
  if (d === 'MEDIUM') return 50;
  return 100;
}

function feedbackByDiff(diff: number)
{
  if (diff === 0)  return 'acertou ✅';
  if (diff <= 2)   return 'pegando fogo 🔥🔥🔥';
  if (diff <= 5)   return 'quente 🌡️';
  if (diff <= 15)  return 'morno ☔️';
  return 'frio ❄️';
}

async function seedGameForUser(userId: string, difficulty: Difficulty)
{
  const limit  = limitByDifficulty(difficulty);
  const target = randomInt(1, limit);

  const game = await prismaClient.game.create
  (
    {
      data: { userId, difficulty, target, attempts: 0, won: false },
    }
  );

  let current = randomInt(1, limit);
  let attempts = 0;

  while (current !== target && attempts < 7)
  {
    const diff     = Math.abs(target - current);
    const feedback = feedbackByDiff(diff);
    await prismaClient.guess.create({ data: { gameId: game.id, value: current, feedback } });
    attempts++;
    const step = Math.max(1, Math.ceil(diff / 2));
    current = current < target ? current + step : current - step;
  }

  await prismaClient.guess.create({ data: { gameId: game.id, value: target, feedback: 'acertou ✅' } });
  attempts++;

  await prismaClient.game.update
  (
    {
      where: { id: game.id },
      data:  { attempts, won: true, endedAt: new Date() },
    }
  );

  return { gameId: game.id, difficulty, target, attempts };
}

async function main()
{
  console.log('🎮 Iniciando seed de games e guesses...');

  try
  {
    const users = await prismaClient.user.findMany();
    if (users.length === 0)
    {
      console.error('❌ Nenhum usuário encontrado. Rode test-user.ts primeiro.');
      return;
    }

    const difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

    for (const user of users)
    {
      console.log(`\n👤 ${user.name ?? user.email}`);

      for (const difficulty of difficulties)
      {
        const result = await seedGameForUser(user.id, difficulty);
        console.log(`  ✅ NUMBER_GUESS ${difficulty}: target=${result.target}, tentativas=${result.attempts} (game: ${result.gameId})`);
      }

    }

    console.log('\n✅ Seed de games concluído com sucesso!');
  }
  catch (error)
  {
    console.error(`Erro: ${error}`);
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
```

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
