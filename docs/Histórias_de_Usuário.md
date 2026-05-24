# 🧑🏻‍🚀 Histórias de Usuário — Kuhaku

> [!NOTE]
> **Formato:** Como `[papel]`, quero `[funcionalidade]`, para que `[benefício]`.


![Histórias Implementadas](https://img.shields.io/badge/HUs%20Implementadas-47-brightgreen?style=flat-square&logo=checkmarx&logoColor=white)
![Histórias Futuras](https://img.shields.io/badge/HUs%20Futuras-16-blue?style=flat-square&logo=rocket&logoColor=white)

## ✅ Implementadas

### 🏠 Tela Inicial

| # | História |
|---|---|
| US-01 | Como **visitante**, quero ver os seis modos de jogo disponíveis na tela inicial (Batalha de Sinais, Operação Resgate, Mapas Estelares, Duelo de Mapas, Protocolo Lógico e Hierarquia de Comandos), para que eu possa escolher qual tipo de missão quero jogar. |
| US-02 | Como **visitante**, quero acessar o ranking global diretamente da tela inicial, para que eu possa ver os melhores astronautas antes de jogar. |

---

### ⚙️ Configuração de Partida (Setup)

| # | História |
|---|---|
| US-03 | Como **jogador**, quero escolher a dificuldade da missão (Cadete / Piloto / Comandante), para que eu possa ajustar o desafio ao meu nível. |
| US-04 | Como **jogador nos modos VS**, quero inserir os nomes dos dois astronautas antes de iniciar, para que a partida seja personalizada para cada jogador. |
| US-05 | Como **jogador no modo Mapas Estelares**, quero ver o tamanho do tabuleiro correspondente à dificuldade (4×4 / 4×5 / 6×6) e o timer progressivo configurado, para que eu saiba o nível de complexidade antes de começar. |
| US-06 | Como **jogador no modo Operação Resgate**, quero ativar a "Missão Livre" para personalizar o range (1-100 a 1-100k) e o timer por tentativa (sem limite, 60s, 30s, 20s, 10s ou 5s), para que eu crie desafios além das três dificuldades padrão. |

---

### 🔭 Operação Resgate (Solo)

| # | História |
|---|---|
| US-07 | Como **jogador solo**, quero tentar adivinhar uma frequência secreta dentro de um canal (1–10 / 1–50 / 1–100 no modo padrão, ou range personalizado no Modo Livre), para que eu complete a missão de resgate. |
| US-08 | Como **jogador solo**, quero receber feedback proporcional ao range após cada tentativa ("Sem sinal", "Interferência estática", "Sinal detectado", "Frequência muito próxima", "Sinal estabelecido!"), para que eu saiba quão perto estou do alvo. |
| US-09 | Como **jogador solo**, quero ver quantas tentativas restam e uma barra de progresso visual, para que eu possa gerenciar minha estratégia e acompanhar o andamento da missão. |
| US-10 | Como **jogador solo no Modo Livre**, quero ver um timer individual por tentativa (contagem regressiva que recomeça a cada palpite), para que cada tentativa seja feita sob pressão de tempo. |
| US-11 | Como **jogador solo**, quero salvar meu resultado no ranking com um apelido ao vencer ou perder, para que minha missão fique registrada no Hall da Fama. |
| US-12 | Como **jogador solo**, quero iniciar uma nova missão sem voltar à tela inicial ao terminar uma partida, para que eu possa jogar novamente rapidamente. |

---

### 📡 Batalha de Sinais (VS — 2 Jogadores)

| # | História |
|---|---|
| US-13 | Como **jogador no modo VS**, quero disputar 3 rodadas alternando turnos com outro astronauta, cada turno com timer de 30s, para que possamos descobrir quem sintoniza a frequência secreta primeiro. |
| US-14 | Como **jogador no modo VS**, quero que o turno seja perdido automaticamente ao esgotar o timer de 30s e a rodada encerre quando as tentativas de ambos se esgotarem, para que haja pressão de tempo na disputa. |
| US-15 | Como **jogador no modo VS**, quero ver o placar atualizado após cada rodada (incluindo preview antes de avançar), para que eu acompanhe quem está vencendo a batalha. |
| US-16 | Como **jogador no modo VS**, quero ver o histórico de palpites de ambos os jogadores durante a rodada, para que eu entenda o progresso de cada astronauta. |
| US-17 | Como **jogador no modo VS**, quero ver a tela de resultado final com o vencedor da batalha após as 3 rodadas, para que o campeão seja revelado. |
| US-18 | Como **jogador no modo VS**, quero que ambos os astronautas possam salvar seus resultados no ranking individualmente ao final, para que os dois apareçam no Hall da Fama. |

---

### 🌕 Mapas Estelares (Memória Solo)

| # | História |
|---|---|
| US-19 | Como **jogador**, quero virar pares de coordenadas em um grid para combiná-las, para que eu complete o mapa estelar da missão. |
| US-20 | Como **jogador**, quero jogar com um timer progressivo que começa em 60s e recebe +25s a cada par encontrado, para que eu seja recompensado pela velocidade e pressionado pelo tempo. |
| US-21 | Como **jogador**, quero que o jogo encerre imediatamente com Game Over quando o timer chegar a 0s, para que haja uma consequência real para a lentidão. |
| US-22 | Como **jogador**, quero ver um contador de erros durante a partida, para que eu acompanhe meu desempenho. |
| US-23 | Como **jogador**, quero salvar meu resultado no ranking ao completar todos os pares, para que minha conquista fique registrada no Hall da Fama. |

---

### ⚔️ Duelo de Mapas (Memória 1v1)

| # | História |
|---|---|
| US-24 | Como **jogador no Duelo de Mapas**, quero inserir os nomes dos dois astronautas e escolher a dificuldade antes de iniciar o duelo, para que a partida seja personalizada. |
| US-25 | Como **jogador no Duelo de Mapas**, quero que cada astronauta enfrente o mesmo tabuleiro individualmente com seu próprio timer progressivo, para que os tempos sejam comparáveis de forma justa. |
| US-26 | Como **jogador no Duelo de Mapas**, quero que o astronauta eliminado (timer zerado) perca a disputa, para que a pressão temporal seja um fator decisivo de eliminação. |
| US-27 | Como **jogador no Duelo de Mapas**, quero ver o resultado final comparando tempo restante e erros dos dois astronautas, para que o vencedor seja revelado com clareza. |

---

### 🧠 Protocolo Lógico (Lógica Proposicional)

| # | História |
|---|---|
| US-28 | Como **jogador**, quero classificar fórmulas lógicas como VERDADEIRAS ou FALSAS dado um conjunto de valores de P, Q e R, para que eu pratique lógica proposicional. |
| US-29 | Como **jogador**, quero ver a classificação da fórmula (TAUTOLOGIA / CONTRADIÇÃO / CONTINGÊNCIA) e uma dica explicativa após responder, para que eu aprenda o tipo de sinal lógico em questão. |
| US-30 | Como **jogador**, quero ter um timer por questão que varia conforme a dificuldade, para que eu responda sob pressão de tempo. |
| US-31 | Como **jogador**, quero acumular um Streak Combo ao acertar questões consecutivas (3×, 5×, 10×), para que eu seja recompensado visualmente por sequências de acertos. |
| US-32 | Como **jogador**, quero ver o resultado final da missão com número de acertos, falhas e transmissões totais, para que eu avalie meu desempenho. |
| US-33 | Como **jogador**, quero salvar meu resultado no ranking do Protocolo Lógico, para que minha pontuação apareça no Hall da Fama. |

---

### ⚙️ Hierarquia de Comandos (Precedência de Operadores)

| # | História |
|---|---|
| US-34 | Como **jogador**, quero adicionar parênteses em expressões lógicas para restaurar a ordem correta de precedência dos operadores (∧ > ∨ > → > ↔), para que eu pratique as regras de agrupamento da lógica proposicional. |
| US-35 | Como **jogador**, quero selecionar tokens clicando neles e usar o botão "Adicionar ( )" para envolver uma subexpressão, para que a interação de agrupamento seja intuitiva. |
| US-36 | Como **jogador**, quero desfazer o último agrupamento e resetar a expressão ao estado original, para que eu possa corrigir erros sem reiniciar a questão. |
| US-37 | Como **jogador**, quero ter um timer por expressão que varia conforme a dificuldade, para que cada exercício seja feito sob pressão de tempo. |
| US-38 | Como **jogador**, quero acumular um Streak Combo ao acertar expressões consecutivas, para que eu seja recompensado por sequências corretas. |
| US-39 | Como **jogador**, quero salvar meu resultado no ranking da Hierarquia de Comandos, para que minha conquista fique registrada no Hall da Fama. |

---

### 🎵 Sistema de Áudio

| # | História |
|---|---|
| US-40 | Como **jogador**, quero ouvir a trilha sonora da base espacial (tema Star Wars) nas telas de menu e setup, para que a experiência de navegação seja mais imersiva. |
| US-41 | Como **jogador**, quero silenciar ou reativar a música com um botão no cabeçalho do jogo, para que eu controle o áudio conforme minha preferência. |
| US-42 | Como **jogador**, quero ouvir sons de acerto e erro ao fazer palpites, para que o feedback visual seja reforçado pelo áudio. |

---

### 🏆 Ranking Global (Hall da Fama)

| # | História |
|---|---|
| US-43 | Como **visitante**, quero ver o ranking global com os 10 melhores astronautas, para que eu conheça os maiores exploradores da galáxia. |
| US-44 | Como **visitante**, quero filtrar o ranking por tipo de missão (🔭 Operação Resgate / 📡 Batalha de Sinais / 🌕 Mapas Estelares / 🧠 Protocolo Lógico / ⚙️ Hierarquia de Comandos), para que eu compare desempenhos por modo de jogo. |
| US-45 | Como **visitante**, quero ver medalhas 🥇🥈🥉 para o top 3 e posição numérica para os demais, para que o pódio seja destacado visualmente. |
| US-46 | Como **visitante**, quero que o ranking ordene por menor média de tentativas ou erros, para que os jogadores mais eficientes sejam melhor posicionados. |
| US-47 | Como **visitante**, quero voltar à tela inicial a partir do ranking, para que eu possa iniciar uma nova missão após consultar o Hall da Fama. |

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
| US-F08 | Como **jogador no modo VS**, quero jogar online contra outro astronauta em tempo real via WebSocket, para que a Batalha de Sinais seja disputada remotamente. |
| US-F09 | Como **jogador**, quero ver um modo torneio com chaveamento eliminatório, para que grupos de astronautas possam competir em campeonatos. |
| US-F10 | Como **jogador**, quero disputar o Duelo de Mapas em tempo real (dois jogadores simultâneos no mesmo tabuleiro), para que o confronto seja instantâneo e não sequencial. |

---

### 📊 Ranking Avançado

| # | História |
|---|---|
| US-F11 | Como **visitante**, quero ver o ranking filtrado por período (diário / semanal / mensal), para que eu acompanhe os astronautas mais ativos recentemente. |
| US-F12 | Como **astronauta cadastrado**, quero ver minha posição no ranking global ao salvar uma partida, para que eu saiba onde estou entre todos os jogadores. *(Parcialmente implementado: endpoint retorna posição/total)* |
| US-F13 | Como **visitante**, quero ver o ranking de um usuário específico com suas melhores partidas por modo, para que eu compare meu desempenho com o de outros astronautas. |

---

### 🔔 Experiência e Acessibilidade

| # | História |
|---|---|
| US-F14 | Como **jogador**, quero que o jogo funcione offline ou em modo PWA, para que eu possa jogar sem conexão com a internet. |
| US-F15 | Como **jogador**, quero escolher entre tema claro e tema escuro, para que o visual se adapte à minha preferência. |
| US-F16 | Como **jogador**, quero compartilhar meu resultado em redes sociais com uma imagem gerada automaticamente, para que eu mostre minha conquista aos amigos. |

---

## 📋 Resumo

| Status | Quantidade |
|---|---|
| ✅ Implementadas | 47 histórias |
| 🚀 Futuras | 16 histórias |
| **Total** | **63 histórias** |
