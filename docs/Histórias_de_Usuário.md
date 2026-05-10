# 🧑🏻‍🚀 Histórias de Usuário — Kuhaku

> **Formato:** Como `[papel]`, quero `[funcionalidade]`, para que `[benefício]`.

---

## ✅ Implementadas

### 🏠 Tela Inicial

| # | História |
|---|---|
| US-01 | Como **visitante**, quero ver os três modos de jogo disponíveis na tela inicial, para que eu possa escolher qual tipo de missão quero jogar. |
| US-02 | Como **visitante**, quero acessar o ranking global diretamente da tela inicial, para que eu possa ver os melhores astronautas antes de jogar. |

---

### ⚙️ Configuração de Partida (Setup)

| # | História |
|---|---|
| US-03 | Como **jogador**, quero escolher a dificuldade da missão (Cadete / Piloto / Comandante), para que eu possa ajustar o desafio ao meu nível. |
| US-04 | Como **jogador no modo VS**, quero inserir os nomes dos dois astronautas antes de iniciar, para que a partida seja personalizada para cada jogador. |
| US-05 | Como **jogador no modo Memória**, quero ver o tamanho do tabuleiro correspondente à dificuldade (4×4 / 4×5 / 6×6), para que eu saiba o nível de complexidade antes de começar. |

---

### 🔭 Operação Resgate (NUMBER_GUESS — Solo)

| # | História |
|---|---|
| US-06 | Como **jogador solo**, quero tentar adivinhar uma frequência secreta dentro de um canal (1–10 / 1–50 / 1–100), para que eu complete a missão de resgate. |
| US-07 | Como **jogador solo**, quero receber feedback proporcional ao range após cada tentativa ("Sem sinal", "Interferência estática", "Sinal detectado", "Frequência muito próxima", "Sinal estabelecido!"), para que eu saiba quão perto estou do alvo. |
| US-08 | Como **jogador solo**, quero saber quantas tentativas restam, para que eu possa gerenciar minha estratégia. |
| US-09 | Como **jogador solo**, quero ver uma barra de progresso das tentativas, para que eu acompanhe visualmente o andamento da missão. |
| US-10 | Como **jogador solo**, quero salvar meu resultado no ranking com um apelido ao vencer ou perder, para que minha missão fique registrada no Hall da Fama. |
| US-11 | Como **jogador solo**, quero iniciar uma nova missão sem voltar à tela inicial ao terminar uma partida, para que eu possa jogar novamente rapidamente. |

---

### 📡 Batalha de Sinais (VS_GUESS — 2 Jogadores)

| # | História |
|---|---|
| US-12 | Como **jogador no modo VS**, quero disputar 3 rodadas alternando turnos com outro astronauta, para que possamos descobrir quem sintoniza a frequência secreta primeiro — ou que a rodada encerre e avance quando as tentativas de ambos se esgotarem. |
| US-13 | Como **jogador no modo VS**, quero ver o placar atualizado após cada rodada (incluindo o preview antes de avançar), para que eu acompanhe quem está vencendo a batalha. |
| US-14 | Como **jogador no modo VS**, quero ver o histórico de palpites de ambos os jogadores durante a rodada, para que eu entenda o progresso de cada astronauta. |
| US-15 | Como **jogador no modo VS**, quero ver a tela de resultado final com o vencedor da batalha após as 3 rodadas, para que o campeão seja revelado. |
| US-16 | Como **jogador no modo VS**, quero que ambos os astronautas possam salvar seus resultados no ranking individualmente ao final, para que os dois apareçam no Hall da Fama. |

---

### 🌕 Mapas Estelares (NUMBER_GUESS — Memória)

| # | História |
|---|---|
| US-17 | Como **jogador**, quero virar pares de coordenadas em um grid para combiná-las, para que eu complete o mapa estelar da missão. |
| US-18 | Como **jogador**, quero ver um cronômetro durante a partida de memória, para que eu saiba quanto tempo levo para completar o mapa. |
| US-19 | Como **jogador**, quero ver um contador de erros durante a partida de memória, para que eu acompanhe meu desempenho. |
| US-20 | Como **jogador**, quero salvar meu resultado no ranking ao completar todos os pares, para que minha conquista fique registrada. |

---

### 🏆 Ranking Global (Hall da Fama)

| # | História |
|---|---|
| US-21 | Como **visitante**, quero ver o ranking global com os 10 melhores astronautas, para que eu conheça os maiores exploradores da galáxia. |
| US-22 | Como **visitante**, quero filtrar o ranking por tipo de missão (🌌 Galáxia / 📡 Batalha de Sinais / 🔭 Operação Resgate), para que eu compare desempenhos por modo de jogo. |
| US-23 | Como **visitante**, quero ver medalhas 🥇🥈🥉 para o top 3 e posição numérica para os demais, para que o pódio seja destacado visualmente. |
| US-24 | Como **visitante**, quero que o ranking ordene por menor média de tentativas, para que os jogadores mais eficientes sejam melhor posicionados. |
| US-25 | Como **visitante**, quero voltar à tela inicial a partir do ranking, para que eu possa iniciar uma nova missão após consultar o Hall da Fama. |

---

## 🚀 Podem Ser Implementadas no Futuro

> As histórias abaixo são viáveis com base na infraestrutura já existente (módulos, endpoints e banco de dados do projeto).

---

### 🔐 Autenticação de Usuário

> *Módulo `auth` com JWT e bcrypt já existe no backend — falta a tela de login no frontend.*

| # | História |
|---|---|
| US-F01 | Como **astronauta cadastrado**, quero fazer login com e-mail e senha, para que meu histórico de missões seja preservado entre sessões. |
| US-F02 | Como **visitante**, quero criar uma conta com e-mail e senha, para que eu tenha um perfil permanente no sistema. |
| US-F03 | Como **astronauta logado**, quero que minhas partidas sejam associadas automaticamente à minha conta, para que eu não precise inserir meu apelido manualmente ao salvar no ranking. |

---

### 👤 Perfil e Estatísticas do Astronauta

> *Endpoints `GET /api/users/:id/stats`, `/achievements` e `/summary` já existem no backend.*

| # | História |
|---|---|
| US-F04 | Como **astronauta cadastrado**, quero ver minhas estatísticas de missões (vitórias, derrotas, média de tentativas), para que eu acompanhe minha evolução. |
| US-F05 | Como **astronauta cadastrado**, quero ver meu histórico de partidas jogadas com detalhes (modo, dificuldade, tentativas, resultado), para que eu revise minhas missões passadas. |
| US-F06 | Como **astronauta cadastrado**, quero ver minhas conquistas desbloqueadas (achievements), para que eu me sinta recompensado por marcos atingidos. |
| US-F07 | Como **astronauta cadastrado**, quero atualizar meu nome de exibição ou e-mail, para que meu perfil fique sempre correto. |

---

### 🎮 Novos Modos e Recursos de Jogo

| # | História |
|---|---|
| US-F09 | Como **jogador**, quero receber efeitos sonoros e animações ao acertar ou errar, para que a experiência de jogo seja mais imersiva. |
| US-F10 | Como **jogador no modo VS**, quero jogar online contra outro astronauta em tempo real via WebSocket, para que a Batalha de Sinais seja disputada remotamente. |
| US-F11 | Como **jogador**, quero ver um modo torneio com chaveamento eliminatório, para que grupos de astronautas possam competir em campeonatos. |

---

### 📊 Ranking Avançado

| # | História |
|---|---|
| US-F12 | Como **visitante**, quero ver o ranking filtrado por período (diário / semanal / mensal), para que eu acompanhe os astronautas mais ativos recentemente. |
| US-F13 | Como **astronauta cadastrado**, quero ver minha posição no ranking global ao salvar uma partida, para que eu saiba onde estou entre todos os jogadores. *(Parcialmente implementado: endpoint retorna posição/total)* |
| US-F14 | Como **visitante**, quero ver o ranking de um usuário específico com suas melhores partidas por modo, para que eu compare meu desempenho com o de outros astronautas. |

---

### 🔔 Experiência e Acessibilidade

| # | História |
|---|---|
| US-F15 | Como **jogador**, quero que o jogo funcione offline ou em modo PWA, para que eu possa jogar sem conexão com a internet. |
| US-F16 | Como **jogador**, quero escolher entre tema claro e tema escuro, para que o visual se adapte à minha preferência. |
| US-F17 | Como **jogador**, quero compartilhar meu resultado em redes sociais com uma imagem gerada automaticamente, para que eu mostre minha conquista aos amigos. |

---

## 📋 Resumo

| Status | Quantidade |
|---|---|
| ✅ Implementadas | 25 histórias |
| 🚀 Futuras | 17 histórias |
| **Total** | **42 histórias** |
