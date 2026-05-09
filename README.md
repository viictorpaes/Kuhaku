<h1 align="center">Jogo da Adivinhação (Kuhaku 🧑🏻‍🚀)</h1>

<h2 align="center">💻⛏️ Tecnologias e Ferramentas Utilizadas: </h2>

<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" height="35" alt="VS Code"/><br>
  <img src="https://img.shields.io/badge/Node.js-111827?style=for-the-badge&logo=nodedotjs&logoColor=339933" height="35" alt="Node.js"/>
  <img src="https://img.shields.io/badge/NestJS-111827?style=for-the-badge&logo=nestjs&logoColor=E0234E" height="35" alt="NestJS"/>
  <img src="https://img.shields.io/badge/TypeScript-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" height="35" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB" height="35" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=purple" height="35" alt="Vite"/>
  <img src="https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26" height="35" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-111827?style=for-the-badge&logo=css3&logoColor=1572B6" height="35" alt="CSS3"/>
  <img src="https://img.shields.io/badge/TailwindCSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" height="35" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Prisma-111827?style=for-the-badge&logo=prisma&logoColor=5A67D8" height="35" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Docker-111827?style=for-the-badge&logo=docker&logoColor=2496ed" height="35" alt="Docker"/>
  <img src="https://img.shields.io/badge/Architecture-111827?style=for-the-badge&logo=instructure&logoColor=white" height="35" alt="Architecture"/>
  <img src="https://img.shields.io/badge/Figma-111827?style=for-the-badge&logo=figma&logoColor=F24E1E" height="35" alt="Figma"/> <br>
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
│   │   │   │   ├── card-guess.dto.ts <img src="https://img.shields.io/badge/DTO_CardGuess-111827?style=flat&logo=typescript&logoColor=4ade80" height="18"/>
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
├── frontend <img src="https://img.shields.io/badge/HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18"/> <img src="https://img.shields.io/badge/-React-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/> <img src="https://img.shields.io/badge/-Vite-111827?style=flat&logo=vite&logoColor=purple" height="18"/> <img src="https://img.shields.io/badge/-TailwindCSS-111827?style=flat&logo=tailwindcss&logoColor=06B6D4" height="18"/> <img src="https://img.shields.io/badge/-TypeScript-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>/
│   ├── src <img src="https://img.shields.io/badge/src-61DAFB?style=flat&logo=react&logoColor=black" height="18"/>/
│   │   ├── components <img src="https://img.shields.io/badge/components-2B2D42?style=flat&logo=react&logoColor=61DAFB" height="18"/>/
│   │   │   ├── home.tsx <img src="https://img.shields.io/badge/-Home-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   │   ├── game.tsx <img src="https://img.shields.io/badge/-Game-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   │   ├── ranking.tsx <img src="https://img.shields.io/badge/-Ranking-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   │   └── setup.tsx <img src="https://img.shields.io/badge/-Setup-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   ├── App.tsx <img src="https://img.shields.io/badge/-React-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   ├── constants.ts <img src="https://img.shields.io/badge/-Constants-111827?style=flat&logo=typescript&logoColor=red" height="18"/>
│   │   ├── index.css <img src="https://img.shields.io/badge/-CSS3-111827?style=flat&logo=css3&logoColor=1572B6" height="18"/>
│   │   ├── main.tsx <img src="https://img.shields.io/badge/-Main-111827?style=flat&logo=react&logoColor=61DAFB" height="18"/>
│   │   ├── types.ts <img src="https://img.shields.io/badge/-Types-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   ├── index.html <img src="https://img.shields.io/badge/-HTML5-111827?style=flat&logo=html5&logoColor=E34F26" height="18"/>
│   ├── postcss.config.cts <img src="https://img.shields.io/badge/-PostCSS-111827?style=flat&logo=postcss&logoColor=DD3A0A" height="18"/>
│   ├── tailwind.config.cts <img src="https://img.shields.io/badge/-TailwindCSS-111827?style=flat&logo=tailwindcss&logoColor=06B6D4" height="18"/>
│   ├── tsconfig.json <img src="https://img.shields.io/badge/TypeScript-Config-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   ├── tsconfig.node.json <img src="https://img.shields.io/badge/TypeScript-Node_Config-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
│   ├── vite.config.d.ts <img src="https://img.shields.io/badge/Vite-Types-111827?style=flat&logo=vite&logoColor=purple" height="18"/>
│   ├── vite.config.js <img src="https://img.shields.io/badge/-Vite_JS-111827?style=flat&logo=vite&logoColor=purple" height="18"/>
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


<h2 align="center">Telas <br>
<img src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=purple" height="25" alt="Vite"/></h2>

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

>
>
> ```bash
> # 1. Sobe o banco Dockerizado `PostgresSql`
> docker compose up db -d
>
> # 2. Entra no backend e prepara o banco
> cd backend
> npm run prisma:generate # gera o Prisma Client
> npm run prisma:migrate:deploy # cria as tabelas (inclui GameType: NUMBER_GUESS | VS_GUESS | CARD_GUESS)
> npm run prisma:seed # popula usuários iniciais (admin, dev, user)
>
> # OPCIONAL: popula dados de teste com usuários e partidas
> npx tsx --env-file=.env prisma/test-user.ts # cria usuários de teste com senha (bcrypt)
> npx tsx --env-file=.env prisma/test-game.ts # cria partidas NUMBER_GUESS e CARD_GUESS
> cd ..
>
> # 3. Sobe backend (:3001) + frontend (:5173)
> npm run start:dev
>
> # Apenas o frontend (:5173)
> npm run dev:frontend
> ```
>

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
# NOTA: rode estes comandos dentro da pasta `backend/`
cd backend

# Inicializa o Prisma no projeto (cria /prisma e schema.prisma)
npx prisma init

# Gera o Prisma Client (rode sempre após alterar o schema.prisma)
npx prisma generate

# Cria e aplica uma nova migration em desenvolvimento
npx prisma migrate dev --name init

# Após adicionar GameType ao schema (necessário para o jogo de cartas):
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
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC"/>
  <img src="https://img.shields.io/badge/NestJS-11.1.19-E0234E?style=for-the-badge&logo=nestjs&logoColor=E0234E"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=for-the-badge&logo=typescript&logoColor=blue"/> <br>
  <img src="https://img.shields.io/badge/React-19.0.0-cyan?style=for-the-badge&logo=react&logoColor=cyan"/> 
  <img src="https://img.shields.io/badge/Vite-6.2.0-purple?style=for-the-badge&logo=vite&logoColor=purple"/> <br>
  <img src="https://img.shields.io/badge/Prisma-7.8.0-5A67D8?style=for-the-badge&logo=prisma&logoColor=5A67D8"/>
  <img src="https://img.shields.io/badge/PostgreSQL-8.16.3-336791?style=for-the-badge&logo=postgresql&logoColor=white"/> <br>
  <img src="https://img.shields.io/badge/RxJS-7.8.1-B7178C?style=for-the-badge&logo=reactivex&logoColor=purple"/>
  <img src="https://img.shields.io/badge/tsx-4.20.5-yellow?style=for-the-badge&logo=typescript&logoColor=yellow"/> <br>
  <img src="https://img.shields.io/badge/Docker-Engine-2496ED?style=for-the-badge&logo=docker&logoColor=2496ED"/>
</p>

<h2 align="center">📂 Modularização SCM (Service, Module & Controller)<br>
<img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>
<img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
<img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
<img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
</h2>
 
### ![Controller](https://img.shields.io/badge/Controller-TypeScript-white?style=flat-square&logo=typescript) `.controller.ts`
 
Camada de **entrada da API**. Recebe as requisições HTTP e define as rotas (`@Get`, `@Post`, `@Put`, `@Delete`). Não contém lógica de negócio — apenas delega ao Service. É aqui que os decorators do Swagger (`@ApiOperation`, `@ApiResponse`) são aplicados.
 
**Arquivos neste projeto:** `app.controller.ts` `game.controller.ts` `auth.controller.ts` `user.controller.ts`
 
---
 
### ![Service](https://img.shields.io/badge/Service-TypeScript-white?style=flat-square&logo=typescript) `.service.ts`
 
Camada de **lógica de negócio**. Processa os dados recebidos do Controller, aplica as regras da aplicação (validações, hash de senha com `bcrypt`, geração de JWT) e comunica com o banco via Prisma. Injetado no Controller via `@Injectable()`.
 
**Arquivos neste projeto:** `prisma.service.ts` `game.service.ts` `auth.service.ts` `user.service.ts`
 
---
 
### ![Module](https://img.shields.io/badge/Module-TypeScript-white?style=flat-square&logo=typescript) `.module.ts`
 
**Unidade de organização** do NestJS. Agrupa e registra o Controller e o Service de um domínio (`imports`, `providers`, `controllers`, `exports`). Permite que outros módulos reutilizem os providers via `exports`. O `AppModule` é o módulo raiz que importa todos os demais.
 
**Arquivos neste projeto:** `app.module.ts` `game.module.ts` `auth.module.ts`, `user.module.ts`


<h2 align="center">🎮 Modos de Jogo</h2>

| Modo | Tipo | Descrição | Dificuldade |
|---|---|---|---|
| **Batalha de Sinais** | `VS_GUESS` (backend) | 2 astronautas adivinham a mesma frequência secreta. Turno alternado — quem sintonizar primeiro vence a rodada. 3 rodadas. Ambos podem se cadastrar no ranking ao final. | Cadete 1–10 · Piloto 1–50 · Comandante 1–100 |
| **Operação Resgate** | `NUMBER_GUESS` (backend) | Solo. Feedback de sinal proporcional ao range. | Cadete (5 tent.) · Piloto (7 tent.) · Comandante (10 tent.) |
| **Mapas Estelares** | `NUMBER_GUESS` (backend) | Solo. Grid de pares de coordenadas para virar e combinar. Cronômetro + contador de erros. Salva no ranking ao vencer. | Cadete 4×4 (8 pares) · Piloto 4×5 (10 pares) · Comandante 6×6 (18 pares) |

**GameTypes do backend (Prisma):** `NUMBER_GUESS` · `VS_GUESS` · `CARD_GUESS`

**Máximo de tentativas por dificuldade (NUMBER_GUESS):** EASY → 5 · MEDIUM → 7 · HARD → 10

**Endpoints:**
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/games/:id/card-guess` | Palpite de carta `{ suit, value }` |
| `POST` | `/api/games/:id/finish` | Salva/encerra a partida — revela o target |
| `POST` | `/api/games/:id/save` | Salva resultado no ranking com apelido `{ name }` |
| `GET` | `/api/ranking/global?gameType=VS_GUESS` | Ranking filtrado por Adivinhação Em Dupla |
| `GET` | `/api/ranking/global?gameType=NUMBER_GUESS` | Ranking filtrado por Adivinhação Solo |
| `GET` | `/api/ranking/global?gameType=CARD_GUESS` | Ranking filtrado por Jogo das Cartas |

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
import { CardGuessDto } from '../dto/card-guess.dto';

@Controller('api')
export class GameController
{
  constructor(private readonly gameService: GameService) 
  {}

  // ── usuários ──────────────────────────────────────

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

  // ── jogos ─────────────────────────────────────────

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


  @Post('games/:id/card-guess')
  async fazerPalpiteCarta(@Param('id') id: string, @Body() dto: CardGuessDto)
  {
    return this.gameService.makeCardGuess(id, dto.suit, dto.value);
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

  // ── consultas de usuário ──────────────────────────

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

  // ── ranking ───────────────────────────────────────

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
import { CardSuit } from '../dto/card-guess.dto';

const SUITS        = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;
const SUIT_SYMBOLS = ['♠', '♥', '♦', '♣'] as const;
const CARD_VALUES  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'] as const;

// ── helpers de número ──────────────────────────────────────────────────────

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

// ── helpers de carta ───────────────────────────────────────────────────────

// Deck por dificuldade: EASY → ♠ (13) | MEDIUM → ♠+♥ (26) | HARD → baralho completo (52)
function getCardLimitByDifficulty(difficulty: Difficulty): number
{
  switch (difficulty)
  {
    case 'EASY':   return 13;
    case 'MEDIUM': return 26;
    case 'HARD':   return 52;
  }
}

// Codificação: suit×13 + value (1–52). Ex: 5♥ = 1×13+5 = 18
function encodeCard(suit: CardSuit, value: number): number
{
  return SUITS.findIndex(s => s === suit) * 13 + value;
}

function decodeCard(encoded: number): { suit: CardSuit; value: number; display: string }
{
  const suitIndex = Math.floor((encoded - 1) / 13);
  const value     = ((encoded - 1) % 13) + 1;
  return { suit: SUITS[suitIndex] as CardSuit, value, display: `${CARD_VALUES[value - 1]}${SUIT_SYMBOLS[suitIndex]}` };
}

function getCardFeedback(target: number, guess: number): { feedback: string; direction: 'higher' | 'lower' | 'correct' | 'wrong_suit' }
{
  const tar = decodeCard(target);
  const gue = decodeCard(guess);
  if (target === guess)        return { feedback: 'acertou ✅',                   direction: 'correct'    };
  if (tar.value === gue.value) return { feedback: 'valor certo, naipe errado 🎯', direction: 'wrong_suit' };
  const isHigher = tar.value > gue.value;
  return { feedback: isHigher ? 'valor maior ⬆️' : 'valor menor ⬇️', direction: isHigher ? 'higher' : 'lower' };
}

// ── service ────────────────────────────────────────────────────────────────

@Injectable()
export class GameService
{
  constructor(private readonly prismaService: PrismaService) {}

  async createGame(dto: CreateGameDto)
  {
    const gameType: GameType = dto.gameType ?? 'NUMBER_GUESS';
    const limit  = gameType === 'CARD_GUESS' ? getCardLimitByDifficulty(dto.difficulty) : getLimitByDifficulty(dto.difficulty);
    const target = Math.floor(Math.random() * limit) + 1;
    return this.prismaService.prisma.game.create({ data: { userId: dto.userId ?? null, gameType, difficulty: dto.difficulty, target, attempts: 0, won: false } });
  }

  async makeGuess(gameId: string, value: number): Promise<any> { /* valida range, registra guess, atualiza estado */ }

  async makeCardGuess(gameId: string, suit: CardSuit, value: number): Promise<any> { /* valida naipe/valor, codifica, registra guess */ }

  async finishGame(gameId: string, won?: boolean): Promise<any>
  {
    const updateData: Record<string, any> = {};
    if (!game.endedAt)     updateData.endedAt = new Date();
    if (won !== undefined) updateData.won = won;
    // ...
  }
}
```

2. `backend/src/game/dto/` <br>
<img src="https://img.shields.io/badge/DTO_Create-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/><img src="https://img.shields.io/badge/DTO_Update-111827?style=flat&logo=typescript&logoColor=yellow" height="18"/>

### DTOs (Data Transform Objects) usados pelo módulo de jogo — definem a forma dos dados esperados nas requisições. <br>
<img src="https://img.shields.io/badge/-Data_Transform_Object_(DTO)-111827?style=flat&logo=typescript&logoColor=orange" height="18" alt="DTO"/>

```ts
// Arquivo: backend/src/game/dto/card-guess.dto.ts
export type CardSuit = 'SPADES' | 'HEARTS' | 'DIAMONDS' | 'CLUBS';

export class CardGuessDto
{
  suit!: CardSuit;
  value!: number;    
}
```

```ts
// Arquivo: backend/src/game/dto/create-game.dto.ts
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type GameType   = 'NUMBER_GUESS' | 'VS_GUESS' | 'CARD_GUESS';

export class CreateGameDto
{
  userId?:    string;
  difficulty!: Difficulty;
  gameType?:  GameType;
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
<img src="https://img.shields.io/badge/Types-111827?style=flat&logo=typescript&logoColor=3178C6" height="18" alt="types"/>

```ts
// frontend/src/types.ts
export type Tela = 'home' | 'setup' | 'game' | 'result' | 'ranking';
export type Modo = 'solo' | 'vs' | 'memoria'; 
export type Dificuldade = 'EASY' | 'MEDIUM' | 'HARD';
export type Direcao = 'higher' | 'lower' | 'correct';

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
}
```

```ts
// frontend/src/constants.ts
import type { Dificuldade } from './types';

export const TOTAL_ROUNDS_VS = 3;
export const MAX_TENTATIVAS_VS = 12;

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

  const iniciarJogo = useCallback(async (config: ConfigJogo) =>
  {
    setDificuldade(config.dificuldade);
    setP1(config.p1 || 'Jogador 1');
    setP2(config.p2 || 'Jogador 2');
    setRound(1);
    setScore({ p1: 0, p2: 0 });
    setFinalScore(null);
    setVsRoundResults([]);
    const isVs = modo === 'vs';
    const id = await criarJogo(config.dificuldade, isVs ? 'VS_GUESS' : undefined);
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
    const id = await criarJogo(dificuldade!);
    setGameId(id);
  }, [dificuldade]);

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
    return <Ranking onBack={() => setTela('home')} apiUrl={API_URL} />;

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
        onOpenRanking={() => setTela('ranking')}
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

      {/* Card VS — destaque full width */}
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
// components/game.tsx — tela de jogo (3 modos) + tela de resultado VS

// VsGame (Batalha de Sinais): alternância de turnos entre p1/p2, histórico de palpites, placar por rodada
// displayScore antecipa o +1 quando roundOver.winner é definido (sem esperar o clique em "avançar")
// SoloGame (Operação Resgate): barra de progresso, feedback de sinal, SaveRankingPanel ao vencer/perder
// MemoriaGame (Mapas Estelares): grid flip, detecção de pares, cronômetro, contador de erros
// ao completar todos os pares chama POST /api/games/:id/finish com { won: true }
// SaveRankingPanel — reutilizado nos 3 modos + VsResultScreen

// Validação dos modos de número:
const max = RANGE_MAX[dificuldade];
if (isNaN(valor) || valor < 1 || valor > max)
{
  setErro(`Digite um número entre 1 e ${max}`);
  return;
}

// displayScore (VsGame): preview do placar antes do avanço de rodada
const displayScore =
{
  p1: score.p1 + (roundOver?.winner === 1 ? 1 : 0),
  p2: score.p2 + (roundOver?.winner === 2 ? 1 : 0),
};

// SaveRankingPanel — exibido após vitória/derrota
function SaveRankingPanel({ saveNome, setSaveNome, saving, savedPosition, saveErro, onSalvar, onOpenRanking })
{
  if (savedPosition)
    return <p>🏆 #{savedPosition.position} de {savedPosition.total} jogadores!</p>;

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
export function VsResultScreen({ p1, p2, finalScore, vsRoundResults, apiUrl, ... }) { ... }

export function Game(props: GameProps)
{
  if (props.modo === 'vs')      return <VsGame {...props} />;
  if (props.modo === 'memoria') return <MemoriaGame {...props} />;
  return <SoloGame {...props} />;
}
```

```ts
// components/ranking.tsx — Hall da Fama com filtro por missão
// Tabs: 🌌 Galáxia | 📡 Batalha de Sinais (VS_GUESS) | 🔭 Operação Resgate (NUMBER_GUESS) | 🃏 Jogo das Cartas (CARD_GUESS)
// GET /api/ranking/global?limit=10&gameType=<filtro>
// Ordenação: menor média de tentativas = melhor posição
// Medalhas: 🥇🥈🥉 para top 3 · posição numérica para o restante

type GameTypeFilter = 'all' | 'NUMBER_GUESS' | 'VS_GUESS' | 'CARD_GUESS';

const TABS: { label: string; value: GameTypeFilter }[] =
[
  { label: '🌌 Galáxia',          value: 'all'          },
  { label: '📡 Batalha de Sinais', value: 'VS_GUESS'     },
  { label: '🔭 Operação Resgate',  value: 'NUMBER_GUESS' },
  { label: '🃏 Jogo das Cartas',   value: 'CARD_GUESS'   },
];

const SUBTITULO: Record<GameTypeFilter, string> =
{
  all:          '🌌 Ranking Galáctico — todos os astronautas',
  VS_GUESS:     '📡 Batalha de Sinais — ambos se cadastram ao final',
  NUMBER_GUESS: '🔭 Operação Resgate — missões solo',
  CARD_GUESS:   '🃏 Jogo das Cartas',
};

export function Ranking({ onBack, apiUrl }: RankingProps)
{
  const [filtro, setFiltro] = useState<GameTypeFilter>('all');

  useEffect(() =>
  {
    const query = filtro === 'all' ? '' : `&gameType=${filtro}`;
    fetch(`${apiUrl}/api/ranking/global?limit=10${query}`)
      .then((r) => r.json())
      .then((data) => setRanking(Array.isArray(data) ? data : []));
  }, [apiUrl, filtro]);
}
```

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
cd BACKEND
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
cd BACKEND
npx tsx --env-file=.env prisma/test-game.ts
```

```ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Difficulty } from '@prisma/client';
import { Pool } from 'pg';

const SUITS   = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;
const SYMBOLS = ['♠', '♥', '♦', '♣'] as const;
const LABELS  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'] as const;
type  CardSuit = typeof SUITS[number];

function cardLimitByDifficulty(d: Difficulty): number
{
  if (d === 'EASY')   return 13;
  if (d === 'MEDIUM') return 26;
  return 52;
}

function encodeCard(suit: CardSuit, value: number): number
{
  return SUITS.indexOf(suit) * 13 + value;
}

function decodeCard(encoded: number)
{
  const suitIndex = Math.floor((encoded - 1) / 13);
  const value     = ((encoded - 1) % 13) + 1;
  return { suit: SUITS[suitIndex] as CardSuit, value, display: `${LABELS[value - 1]}${SYMBOLS[suitIndex]}` };
}

function cardFeedback(target: number, guess: number): { feedback: string; direction: 'higher' | 'lower' | 'correct' | 'wrong_suit' }
{
  const t = decodeCard(target);
  const g = decodeCard(guess);
  if (target === guess)    return { feedback: 'acertou ✅',                   direction: 'correct'    };
  if (t.value === g.value) return { feedback: 'valor certo, naipe errado 🎯', direction: 'wrong_suit' };
  return t.value > g.value
    ? { feedback: 'valor maior ⬆️', direction: 'higher' }
    : { feedback: 'valor menor ⬇️', direction: 'lower'  };
}

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

async function seedCardGameForUser(userId: string, difficulty: Difficulty)
{
  const limit         = cardLimitByDifficulty(difficulty);
  const target        = randomInt(1, limit);
  const targetDecoded = decodeCard(target);

  const game = await prismaClient.game.create
  (
    {
      data: { userId, difficulty, target, attempts: 0, won: false, gameType: 'CARD_GUESS' as any },
    }
  );

  const guesses: Array<{ value: number; feedback: string }> = [];

  // busca binária no valor usando ♠, depois confirma naipe se necessário
  let low = 1, high = 13;
  while (low <= high)
  {
    const mid    = Math.floor((low + high) / 2);
    const guess  = encodeCard('SPADES', mid);
    const result = cardFeedback(target, guess);
    guesses.push({ value: guess, feedback: result.feedback });
    if (result.direction === 'correct' || result.direction === 'wrong_suit') break;
    if (result.direction === 'higher') low  = mid + 1;
    else                               high = mid - 1;
  }

  const lastDirection = cardFeedback(target, guesses[guesses.length - 1].value).direction;
  if (lastDirection === 'wrong_suit')
  {
    const suitsInDeck = SUITS.slice(0, limit / 13) as CardSuit[];
    for (const suit of suitsInDeck)
    {
      if (suit === 'SPADES') continue;
      const guess  = encodeCard(suit, targetDecoded.value);
      const result = cardFeedback(target, guess);
      guesses.push({ value: guess, feedback: result.feedback });
      if (result.direction === 'correct') break;
    }
  }

  for (const g of guesses)
    await prismaClient.guess.create({ data: { gameId: game.id, value: g.value, feedback: g.feedback } });

  await prismaClient.game.update
  (
    {
      where: { id: game.id },
      data:  { attempts: guesses.length, won: true, endedAt: new Date() },
    }
  );

  return { gameId: game.id, difficulty, targetCard: targetDecoded.display, attempts: guesses.length };
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

      for (const difficulty of difficulties)
      {
        const result = await seedCardGameForUser(user.id, difficulty);
        console.log(`  ✅ CARD_GUESS   ${difficulty}: target=${result.targetCard}, tentativas=${result.attempts} (game: ${result.gameId})`);
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
