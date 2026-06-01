# Spec Técnica — LOGIC_PUZZLE (Protocolo Lógico)

![Spec Técnica](https://img.shields.io/badge/Spec_T%C3%A9cnica-111827?style=flat-square&logo=jest&logoColor=green) 
![🧠 Protocolo Lógico](https://img.shields.io/badge/Protocolo_L%C3%B3gico-22C55E?style=flat-square&logoColor=111827)

`GameType.LOGIC_PUZZLE` · Solo · Sistema de fases

> Para as **regras completas do modo**, consulte [`docs/PROTOCOLO_LOGICO.md`](../../docs/PROTOCOLO_LOGICO.md).

---

## Parâmetros por dificuldade

| Dificuldade | Variáveis | Operadores | Questões / fase |
|---|---|---|---|
| `EASY` | P, Q | `∧ ∨ ¬` | 8 |
| `MEDIUM` | P, Q, R | `∧ ∨ ¬ →` | 10 |
| `HARD` | P, Q, R | `∧ ∨ ¬ → ↔` | 12 |

---

## Geração de questões (frontend — `frontend/src/ts/`)

```
Para cada questão:
  1. Escolher valores aleatórios para cada variável (true | false)
  2. Gerar fórmula aleatória com os operadores disponíveis na dificuldade
  3. Avaliar a fórmula → gabarito (VERDADEIRO | FALSO)
  4. Classificar: TAUTOLOGIA | CONTRADIÇÃO | CONTINGÊNCIA
```

### Classificação da fórmula — algoritmo

```
Dado n variáveis, enumerar todas as 2^n valorações possíveis:
  EASY  (P, Q)    → 2² = 4 combinações
  MEDIUM (P, Q, R) → 2³ = 8 combinações
  HARD  (P, Q, R) → 2³ = 8 combinações

Para cada valoração, avaliar a fórmula:
  todos os resultados = true  → TAUTOLOGIA  🌟
  todos os resultados = false → CONTRADIÇÃO  🕳️
  resultados mistos            → CONTINGÊNCIA  🪐

Nota: TAUTOLOGIA e CONTRADIÇÃO não dependem dos valores atuais das variáveis.
A classificação é exibida ao jogador após ele responder.
```

---

## Avaliação de resposta

| Resposta do jogador | Gabarito | Resultado |
|---|---|---|
| Igual | — | Acerto → `+20s`, streak++ |
| Diferente | — | Erro → `-5s`, streak = 0 |

---

## Sistema de Streak Combo

| Acertos consecutivos | Badge exibido | Comportamento |
|---|---|---|
| 3 | `3×` | Aparece ao atingir o 3° acerto consecutivo |
| 5 | `5×` | Substitui o badge anterior |
| 10 | `10×` | Substitui o badge anterior |

O badge permanece visível até o próximo **erro** (que zera o streak).  
O streak é puramente visual — não altera a lógica de timer ou persistência.

---

## Sistema de fases + timer

Timer inicial por dificuldade em `TIMER_LOGICA` (`frontend/src/constants.ts`):

| Dificuldade | Timer inicial |
|---|---|
| `EASY` | `60s` |
| `MEDIUM` | `50s` |
| `HARD` | `35s` |

Ver [`spec/timer.md`](../timer.md) para o comportamento completo do timer e comportamento quando timer = 0.

```
timer = TIMER_LOGICA[dificuldade] (início de cada fase)

loop de N questões:
  resposta correta → +20s (flash verde 900ms)
  resposta errada  → -5s  (flash vermelho 900ms)
  timer = 0        → RESET para fase 1 + POST /finish { won: false }

todas as questões respondidas → fase concluída → fase++ + timer continua correndo
```

---

## Resultado da missão

Exibido ao final (ao vencer todas as questões da fase antes do timer = 0):

| Campo | Fonte | Notas |
|---|---|---|
| Acertos | Contado localmente no frontend | Questões respondidas corretamente |
| Falhas | Contado localmente | Questões respondidas incorretamente |
| Transmissões totais | `acertos + falhas` | Total de questões respondidas na fase |
| Melhor fase | `melhorFase` (estado React) | Maior fase atingida na sessão — preservado no RESET |

---

## API utilizada

| Método | Endpoint | Quando |
|---|---|---|
| `POST` | `/api/games` | Início de cada fase |
| `POST` | `/api/games/:id/finish` | Timer = 0 (derrota) OU fase concluída (vitória) |
| `POST` | `/api/games/:id/save` | Jogador salva no ranking |

> `POST /guess` **não é usado** — as questões são geradas e avaliadas inteiramente no frontend.