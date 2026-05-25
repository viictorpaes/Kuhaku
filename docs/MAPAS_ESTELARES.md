<h1 align="center">🌕 Mapas Estelares
<br>
<img src="https://img.shields.io/badge/Modo-CARD__GUESS-f59e0b?style=for-the-badge&logo=grid&logoColor=white" height="28"/>
<img src="https://img.shields.io/badge/Solo_%26_1v1-disponível-fbbf24?style=for-the-badge" height="28"/>
<img src="https://img.shields.io/badge/Pares-8_%7C_10_%7C_18-f97316?style=for-the-badge" height="28"/>
</h1>

<table align="center" width="760">
  <tr>
    <th align="center">🌕 Solo — Mapas Estelares</th>
    <th align="center">🌕 1v1 — Duelo de Mapas</th>
  </tr>
  <tr>
    <td align="center"><img src="../img/mapas_estelares_par.png" width="360" alt="Mapas Estelares Solo"/></td>
    <td align="center"><img src="../img/duelo_de_mapas_resultado.png" width="360" alt="1v1 Mapas Estelares"/></td>
  </tr>
</table>

> [!NOTE]
> **Lore:** As coordenadas estelares foram embaralhadas por uma tempestade cósmica. O astronauta precisa reconstruir o mapa do universo encontrando os pares de estrelas gêmeas antes que o tempo se esgote.


## 🎯 Objetivo

Encontre todos os **pares de cartas idênticas** no grid antes do tempo acabar. No modo solo, cada par encontrado adiciona **bônus de tempo**. No modo 1v1, vence quem encontrar **mais pares** ao final.


## 📋 Regras — Modo Solo

| Regra | Detalhe |
|---|---|
| 👤 Jogadores | 1 (Solo) |
| ⏱️ Timer base | **60 segundos** |
| ⏱️ Bônus por par | **+25 segundos** ao encontrar cada par |
| 🃏 Cartas viradas | 2 por vez — se iguais, permanecem abertas |
| 🏆 Vitória | Encontrar todos os pares antes do timer zerar |
| 💾 Ranking | Redirecionamento automático para `CARD_GUESS` ao salvar |

> [!CAUTION]
> Quando o timer chega a **0**, o jogo encerra imediatamente com **Game Over** — mesmo que esteja faltando apenas um par. Gerencie bem o tempo e priorize virar cartas que você já memorizou.


## 📋 Regras — Modo 1v1

| Regra | Detalhe |
|---|---|
| 👥 Jogadores | 2 (local) |
| 🔄 Turnos | Alternados — quem acerta continua jogando |
| ⏱️ Timer por turno | Configurável na tela de setup |
| 🃏 Grid | Compartilhado entre os dois jogadores |
| 🏆 Vencedor | Quem encontrar mais pares ao final |


## 🌍 Grids por Dificuldade

| Dificuldade | Patente | Grid | Pares | Cartas totais |
|---|---|---|---|---|
| 🌍 **Cadete** | Recruta | `4 × 4` | 8 pares | 16 cartas |
| 🚀 **Piloto** | Tenente | `4 × 5` | 10 pares | 20 cartas |
| 👨‍🚀 **Comandante** | Elite | `6 × 6` | 18 pares | 36 cartas |


## ⏱️ Progressão de Tempo — Modo Solo

| Dificuldade | Tempo inicial | Bônus/par | Máx. possível¹ |
|---|---|---|---|
| 🌍 Cadete (4×4, 8p) | 60s | +25s/par | 260s |
| 🚀 Piloto (4×5, 10p) | 60s | +25s/par | 310s |
| 👨‍🚀 Comandante (6×6, 18p) | 60s | +25s/par | 510s |

> [!NOTE]
> ¹ Calculado assumindo que todos os pares são encontrados antes do timer zerar e o bônus é acumulativo. Na prática, erros não subtraem tempo — apenas desperdiçam o turno.


## 🖥️ Informações Técnicas

| Campo | Valor |
|---|---|
| Frontend `Modo` (Solo) | `memoria` |
| Frontend `Modo` (1v1) | `memoria-vs` |
| Backend `GameType` | `CARD_GUESS` (ambos os modos) |

> [!NOTE]
> Os modos **Solo** e **1v1** compartilham o mesmo `GameType` (`CARD_GUESS`) e, portanto, aparecem juntos no ranking de Mapas Estelares.
| Timer base | `MEMORIA_TIMER_INICIAL = 60s` |
| Bônus por par | `MEMORIA_BONUS_PAR = 25s` |
| Grid (Cadete) | `MEMORIA_GRID.EASY: { cols: 4, rows: 4, pairs: 8 }` |
| Grid (Piloto) | `MEMORIA_GRID.MEDIUM: { cols: 4, rows: 5, pairs: 10 }` |
| Grid (Cmd) | `MEMORIA_GRID.HARD: { cols: 6, rows: 6, pairs: 18 }` |
| Endpoint criar jogo | `POST /api/games` → `{ gameType: "CARD_GUESS" }` |
| Endpoint encerrar | `POST /api/games/:id/finish` → `{ won: true }` |
| Endpoint salvar | `POST /api/games/:id/save` → `{ name: string }` |
| Ranking | `GET /api/ranking/global?gameType=CARD_GUESS` |


## 🏆 Critério de Ranking

O ranking **Mapas Estelares** (solo + 1v1 combinados) ordena por:

1. **Taxa de vitória** (`winRate`) — percentual de grids completados
2. **Média ponderada de tentativas** — `mediana × 0,5 + média × 0,3 + moda × 0,2` (desempate)

| Estatística | Significado |
|---|---|
| 🎯 Mediana | Número de viradas na partida do meio |
| 📊 Média | Viradas médias em todas as vitórias |
| 📐 Moda | Número de viradas mais frequente |
| 🏅 Recorde | Menor número de viradas em uma única vitória |
| 📈 Taxa de Vitória | `grids_completos / grids_jogados` |

> [!TIP]
> **Dica de elite:** No Cadete (4×4), anote mentalmente a posição das cartas nas primeiras viradas. Com memória perfeita, é possível completar o grid em apenas 8 pares (16 viradas mínimas).