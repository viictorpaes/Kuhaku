# Ranking Algorithm Spec

![Spec Técnica](https://img.shields.io/badge/Spec_T%C3%A9cnica-111827?style=flat-square&logo=jest&logoColor=green) 
![🏆 Ranking](https://img.shields.io/badge/%F0%9F%8F%86_Algoritmo_de_Ranking-FFD700?style=flat-square&logoColor=111827)

Implementado em `backend/src/game/ts/game.service.ts` → `getGlobalRanking()`.

> Para as **regras do evento** (premiação, estações, fluxo do dia), consulte [`docs/Regras_Evento.md`](../docs/Regras_Evento.md).  
> Para as **histórias de usuário** do ranking, consulte [`docs/Histórias_de_Usuário.md`](../docs/Histórias_de_Usuário.md) (US-43 a US-47).

---

## Critério de ordenação (em cascata) 🌊

### Modos solo (NUMBER_GUESS, CARD_GUESS, LOGIC_PUZZLE, PRECEDENCE_PUZZLE)

| Prioridade | Campo | Direção | Razão |
|---|---|---|---|
| 1° | `winRate` | DESC | Jogadores que vencem mais ficam no topo |
| 2° | `weightedAttempts` | ASC | Menor pontuação ponderada é melhor |
| 3° | `averageAttempts` | ASC | Desempate final por média simples |

### Modos VS (VS_GUESS, CARD_GUESS_VS)

| Prioridade | Campo | Direção | Razão |
|---|---|---|---|
| 1° | `wins` | DESC | Total de rodadas vencidas |
| 2° | `medianAttempts` | ASC | Mediana de tentativas nas vitórias |
| 3° | `averageAttempts` | ASC | Desempate final por média simples |

> Modos VS não usam `winRate` na ordenação — apenas `wins` absolutas.  
> Jogadores com 0 vitórias ainda aparecem em modos VS (com ícone 💀 e `losses`).

---

## Fórmula da pontuação ponderada

```
weightedAttempts = median × 0.5 + mean × 0.3 + mode × 0.2
```

| Estatística | Peso | Comportamento |
|---|---|---|
| Mediana | `× 0.5` | Robusta a sessões atípicas (outlier-resistant) |
| Média   | `× 0.3` | Penaliza inconsistência geral |
| Moda    | `× 0.2` | Reflete o padrão de jogo mais frequente |

> As três estatísticas são calculadas **apenas sobre jogos vencidos** (`won = true`).  
> Jogos perdidos não entram no cálculo de tentativas ponderadas.

### Cálculo da moda (empate de frequência)

Quando dois ou mais valores têm a mesma frequência máxima, a moda é a **média entre eles**:

```
Exemplo: tentativas = [2, 3, 3, 4, 4, 5]
freq: { 2:1, 3:2, 4:2, 5:1 }  → maxFreq = 2 → modes = [3, 4]
mode = (3 + 4) / 2 = 3.5
```

---

## Exemplo de cálculo concreto

Jogador com vitórias em: 3, 2, 3, 5, 4 tentativas (cronológico)

```
sorted = [2, 3, 3, 4, 5]

median:
  comprimento = 5 (ímpar) → sorted[2] = 3
  median = 3

mean:
  (2 + 3 + 3 + 4 + 5) / 5 = 17 / 5 = 3.4

mode:
  freq = { 2:1, 3:2, 4:1, 5:1 } → maxFreq = 2 → modes = [3]
  mode = 3

weightedAttempts = 3 × 0.5 + 3.4 × 0.3 + 3 × 0.2
                 = 1.5 + 1.02 + 0.6
                 = 3.12
```

---

## Campos retornados por entrada do ranking

```json
{
  "userId":           "string  — CUID do usuário",
  "name":             "string  — apelido no Hall da Fama",
  "wins":             "integer — total de vitórias (jogos won=true)",
  "losses":           "integer — total de derrotas (jogos finalizados sem won)",
  "totalGames":       "integer — total de partidas finalizadas",
  "winRate":          "float   — wins / totalGames  (0–1)",
  "averageAttempts":  "float   — média de tentativas nas vitórias",
  "medianAttempts":   "float   — mediana de tentativas nas vitórias",
  "modeAttempts":     "float   — moda de tentativas nas vitórias (média em empate)",
  "weightedAttempts": "float   — pontuação ponderada (menor = melhor; Infinity se 0 vitórias)",
  "bestAttempts":     "integer — menor número de tentativas em uma vitória"
}
```

> Jogadores sem nenhuma vitória têm `weightedAttempts: Infinity` e aparecem apenas em modos VS.

---

## Query parameters do endpoint

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `limit` | integer | `10` | Máximo de entradas retornadas (1–100) |
| `gameType` | `GameType` enum | — | Filtrar por modo de jogo |

**Endpoint:** `GET /api/ranking/global` — ver esquema completo em [`spec/api/openapi.yml`](api/openapi.yml).
