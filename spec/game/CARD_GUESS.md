# Spec Técnica — CARD_GUESS / CARD_GUESS_VS (Mapas Estelares)

![Spec Técnica](https://img.shields.io/badge/Spec_T%C3%A9cnica-111827?style=flat-square&logo=jest&logoColor=green) ![🌕 Mapas Estelares](https://img.shields.io/badge/%F0%9F%8C%95_Mapas_Estelares-FFD700?style=flat-square&logoColor=111827)

`GameType.CARD_GUESS` · Solo  
`GameType.CARD_GUESS_VS` · 1v1 local

> Para as **regras completas do modo**, consulte [`docs/MAPAS_ESTELARES.md`](../../docs/MAPAS_ESTELARES.md).

---

## Parâmetros por dificuldade 🎮

| Dificuldade | Grid | Pares | Total de cartas |
|---|---|---|---|
| `EASY` | 4 × 4 | 8 | 16 |
| `MEDIUM` | 4 × 5 | 10 | 20 |
| `HARD` | 6 × 6 | 18 | 36 |

## Timer contínuo (mesmo para 1v1 — timer individual por jogador)

Timer inicial definido por dificuldade em `MEMORIA_TIMER` (`frontend/src/constants.ts`):

| Dificuldade | Timer inicial | Bônus — par correto | Penalidade — par errado |
|---|---|---|---|
| `EASY` (🌍 Cadete) | `60s` | `+20s` (`MEMORIA_BONUS_PAR`) | `-5s` (mínimo 0) |
| `MEDIUM` (🚀 Piloto) | `50s` | `+20s` | `-5s` |
| `HARD` (👨‍🚀 Comandante) | `35s` | `+20s` | `-5s` |

| Evento | Efeito |
|---|---|
| Par correto encontrado | `+20s` · flash verde "**+20s**" por 900ms |
| Par errado (2 cartas diferentes) | `-5s` · flash vermelho "**-5s**" por 900ms · delay de 1s |
| Timer = 0 | Game Over imediato → `POST /finish { won: false }` |

## Geração do tabuleiro (frontend)

```
1. Criar array de N pares: [1,1, 2,2, …, N,N]
2. Embaralhar com Fisher-Yates (in-place, O(n))
3. Distribuir nas células do grid (row-major order)
```

O backend não conhece o layout das cartas — apenas registra o resultado via `POST /finish`.  
O array embaralhado é gerado uma única vez por partida e reutilizado em CARD_GUESS_VS para garantir o mesmo tabuleiro a ambos os jogadores.

## Lógica de par

```
jogador vira carta A → guarda índice A
jogador vira carta B:
  se tabuleiro[A] === tabuleiro[B] → par encontrado
      ambas ficam viradas (paresEncontrados += A, B)
      timerRestante += 20  (máx. sem teto)
  caso contrário → erro
      bloqueado = true  (impede novas viradas)
      delay 1s → ambas viram de volta → bloqueado = false
      timerRestante = max(0, timerRestante - 5)

  se timer = 0 durante delay → Game Over imediato (delay cancelado)
```

## Estados React — CARD_GUESS

| Estado | Tipo | Descrição |
|---|---|---|
| `tabuleiro` | `number[]` | Array embaralhado com os valores das cartas (tamanho = total de cartas) |
| `cartasViradas` | `number[]` | Índices das cartas viradas **neste turno** (máx. 2 elementos) |
| `paresEncontrados` | `number[]` | Índices de todos os pares já revelados (acumulado) |
| `erros` | `number` | Total de pares errados na partida (enviado ao backend via `mistakes`) |
| `bloqueado` | `boolean` | `true` durante o delay de 1s após par errado — bloqueia cliques |
| `timerRestante` | `number` | Segundos restantes (ver [`spec/timer.md`](../timer.md)) |

## Modo CARD_GUESS_VS — fluxo sequencial

```
POST /api/games  → gameId_P1

Jogador 1 joga:
  tabuleiro gerado e exibido → timer individual P1 corre
  ao completar todos os pares OU timer = 0:
    POST /api/games/:gameId_P1/finish { won, mistakes }
    → resultado P1: { timerRestante, erros }

Tela de transição (confirmação do apelido de P2):
  mesmo array tabuleiro[] é preservado → P2 joga o mesmo layout

POST /api/games  → gameId_P2

Jogador 2 joga:
  mesmo tabuleiro, timer reiniciado pelo valor da dificuldade
  ao completar OU timer = 0:
    POST /api/games/:gameId_P2/finish { won, mistakes }

Comparação final:
  vence quem terminou com maior timerRestante
  empate de timer → vence quem cometeu menos erros
  P1 eliminado (timer=0) → P2 vence automaticamente
  ambos eliminados (timer=0) → empate
```

> Cada jogador usa um `gameId` independente — 2 chamadas `POST /api/games` por partida completa.

## Critério de vitória

| Condição | Resultado |
|---|---|
| Todos os pares encontrados antes do timer = 0 | Vitória (`won: true`) |
| Timer = 0 antes de completar os pares | Derrota (`won: false`) |

## API utilizada

| Método | Endpoint | Quando |
|---|---|---|
| `POST` | `/api/games` | Início da sessão de cada jogador |
| `POST` | `/api/games/:id/finish` | Ao completar todos os pares OU timer = 0 |
| `POST` | `/api/games/:id/save` | Jogador salva no ranking |

> `POST /guess` **não é usado** neste modo — toda a lógica de cartas é local no frontend.