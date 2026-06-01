# Spec Técnica — NUMBER_GUESS (Operação Resgate)

![Spec Técnica](https://img.shields.io/badge/Spec_T%C3%A9cnica-111827?style=flat-square&logo=jest&logoColor=green) 
![Operação Resgate](https://img.shields.io/badge/🔭Opera%C3%A7%C3%A3o_Resgate-purple?style=flat-square&logoColor=111827)

`GameType.NUMBER_GUESS` · Solo · 1 jogador

> Para as **regras completas do modo**, consulte [`docs/OPERACAO_RESGATE.md`](../../docs/OPERACAO_RESGATE.md).

---

## Parâmetros por dificuldade

| Dificuldade | Range | Max tentativas |
|---|---|---|
| `EASY` | 1 – 10 | 5 |
| `MEDIUM` | 1 – 50 | 8 |
| `HARD` | 1 – 100 | 10 |

### Missão Livre (range customizado)

| Campo | Valor |
|---|---|
| `customRange` | 1 – N (N informado pelo jogador, sem limite superior) |
| Max tentativas | ilimitado — sem `maxAttempts` para este submode |
| Timer | `TIMER_SOLO[dificuldade]` por fase (ver abaixo) |

Timer por dificuldade em `TIMER_SOLO` (`frontend/src/constants.ts`):

| Dificuldade | Timer inicial |
|---|---|
| `EASY` | `60s` |
| `MEDIUM` | `50s` |
| `HARD` | `35s` |

Ver [`spec/timer.md`](../timer.md) para o comportamento completo do timer de fases.

---

## Geração do alvo (backend)

```
target = Math.floor(Math.random() * maxRange) + 1
```

`maxRange` = range da dificuldade escolhida ou `customRange` se informado no `CreateGameDto`.  
O `target` é armazenado no banco e revelado ao frontend **apenas** após `POST /finish` ou `POST /guess` com acerto.

---

## Algoritmo de feedback por palpite

O feedback é proporcional à distância relativa (`|guess - target| / maxRange`):

| Condição | Feedback interno (backend) | Exibido ao jogador |
|---|---|---|
| `value === target` | `"acertou ✅"` | `"📡 Sinal estabelecido! Resgate a caminho!"` |
| distância relativa ≤ 10 % | `"pegando fogo 🔥🔥🔥"` | `"🔭 Frequência muito próxima!"` |
| distância relativa ≤ 20 % | `"quente 🌡️"` | `"📶 Sinal detectado!"` |
| distância relativa ≤ 40 % | `"morno ☔️"` | `"🌌 Interferência estática..."` |
| distância relativa > 40 % | `"frio ❄️"` | `"🔇 Sem sinal no espaço..."` |

Além do feedback textual, o backend retorna `direction: "higher" | "lower" | "correct"`.

> O limiar de 10 %/20 %/40 % é calculado com `Math.ceil(limit * 0.10)` etc. — arredondado para cima, evitando zona neutra em ranges pequenos.

---

## Fluxo de partida — modo padrão (com tentativas limitadas)

```
POST /api/games  { gameType: NUMBER_GUESS, difficulty }
  └─► { id, maxRange }

loop até won = true OU attempts = maxAttempts:
  POST /api/games/:id/guess  { value }
    └─► { feedback, direction, won, attemptsLeft }

  se won = true → encerrado automaticamente pelo backend (endedAt preenchido)
  se attempts = maxAttempts e não venceu → POST /api/games/:id/finish { won: false }
```

---

## Fluxo de partida — Missão Livre (sistema de fases)

```
POST /api/games  { gameType: NUMBER_GUESS, difficulty: HARD, customRange: N }
  └─► { id: gameId_fase1, maxRange: N }

fase 1 (timer = TIMER_SOLO[dificuldade]):
  POST /api/games/:id/guess  { value }
    └─► won = true  → fase concluída
          POST /api/games/:id/finish { won: true }
          fase++; melhorFase = max(melhorFase, fase)
          POST /api/games  → gameId_fase2  (novo jogo, mesmo customRange)
    └─► timer = 0  → POST /api/games/:id/finish { won: false }
          RESET: fase = 1; timerRestante = TIMER_SOLO[dificuldade]
          POST /api/games  → novo gameId_fase1

fase 2, 3, … → mesmo padrão, timer continua correndo entre fases
```

> O estado `melhorFase` é preservado no RESET — mostra o recorde da sessão.  
> Cada fase usa um `gameId` independente. O App.tsx mantém `currentGameId` e substitui a cada fase.

---

## Validação de palpite (frontend)

```
palpite deve ser inteiro entre 1 e maxRange (inclusive)
campo numérico com min=1, max=maxRange, step=1
botão "Confirmar" desabilitado se campo vazio ou fora do range
```

---

## API utilizada

| Método | Endpoint | Quando |
|---|---|---|
| `POST` | `/api/games` | Início da partida / nova fase |
| `POST` | `/api/games/:id/guess` | A cada palpite |
| `POST` | `/api/games/:id/finish` | Timer = 0 ou max tentativas esgotadas sem vitória |
| `POST` | `/api/games/:id/save` | Jogador salva resultado no ranking |
