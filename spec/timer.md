# Timer System Spec

![Spec Técnica](https://img.shields.io/badge/Spec_T%C3%A9cnica-111827?style=flat-square&logo=jest&logoColor=green) 
![⏱️ Sistema de Timer](https://img.shields.io/badge/Sistema_de_Timer-111827?style=flat-square&logo=clockify&logoColor=white)

Fonte de verdade: `frontend/src/constants.ts`.

> Para as **regras de jogo** dos modos individuais, consulte [`docs/`](../docs/).  
> Para os **estados React** do sistema de fases, consulte [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md#-sistema-de-fases).

---

## Constantes globais (compartilhadas por todos os modos) 🌐

| Constante | Valor | Aplicação |
|---|---|---|
| `TIMER_BONUS_ACERTO` | `+20` s | Adicionados ao acertar / par encontrado |
| `TIMER_PENALIDADE_ERRO` | `-5` s | Subtraídos ao errar (mínimo 0) |

---

## Constantes por modo 🎮

| Constante | Dificuldades | Cadete (EASY) | Piloto (MEDIUM) | Comandante (HARD) |
|---|---|---|---|---|
| `TIMER_SOLO` | NUMBER_GUESS | `60s` | `50s` | `35s` |
| `TIMER_LOGICA` | LOGIC_PUZZLE | `60s` | `50s` | `35s` |
| `TIMER_PRECEDENCIA` | PRECEDENCE_PUZZLE | `60s` | `50s` | `35s` |
| `MEMORIA_TIMER` | CARD_GUESS / CARD_GUESS_VS | `60s` | `50s` | `35s` |

| Constante | Valor fixo | Modo |
|---|---|---|
| `TIMER_VS_TURNO` | `15s` | VS_GUESS — por turno de cada jogador |
| `MEMORIA_BONUS_PAR` | `+20s` | CARD_GUESS — par correto encontrado |

> VS_GUESS usa timer **por turno** (15s), reiniciado a cada troca de jogador — sem bônus/penalidade.  
> Todos os outros modos usam timer **contínuo**, que corre sem parar durante toda a fase.

---

## Comportamento do countdown 🧭

```
setInterval(1000ms) → timerRestante -= 1

Mínimo absoluto: 0 (nunca negativo)
Sem teto superior: timer pode crescer indefinidamente com bônus acumulados
```

### Flash de feedback (900ms)

| Evento | Badge | Cor |
|---|---|---|
| Acerto / par encontrado / resposta correta | `+20s` | Verde 🟢 |
| Erro / par errado / resposta incorreta | `-5s` | Vermelho 🔴 |

Estado React: `timerFlash: string | null` — limpo após 900ms.

> O flash dura 900ms (não 1000ms) para garantir que seja apagado antes do próximo tick do `setInterval`.

---

## Ciclo de vida do setInterval

```typescript
// Iniciar timer
timerRef.current = setInterval
(
  () => 
  {
    setTimerRestante(prev => Math.max(0, prev - 1))
  }, 
  1000
)

// Parar timer (ao encerrar fase, ao chegar em 0, ou ao trocar de turno no VS)
clearInterval(timerRef.current)

// Reiniciar timer (nova fase, RESET, troca de dificuldade)
clearInterval(timerRef.current)
setTimerRestante(valorInicial)    // estado atualizado assincronamente
timerRef.current = setInterval(…) // novo intervalo
```

`timerRef` é um `MutableRefObject<NodeJS.Timeout>` — permite acessar o intervalo fora do escopo do closure React sem causar re-renders.

---

## Comportamento quando timer = 0

### Modos com sistema de fases (NUMBER_GUESS Missão Livre, LOGIC_PUZZLE, PRECEDENCE_PUZZLE)

```
timer = 0
  └─► exibe tela de RESET por 1800ms
        └─► POST /api/games/:id/finish  { won: false }
              └─► timerRestante = TIMER_[MODO][dificuldade]
                    └─► fase = 1  (melhorFase preservado)
                          └─► POST /api/games  → novo gameId
```

### Modos sem fases (VS_GUESS)

```
timer = 0 (por turno, TIMER_VS_TURNO = 15s)
  └─► turno perdido automaticamente → passa para o próximo jogador
        └─► timerRestante = 15s  (reiniciado para o próximo turno)
```

### CARD_GUESS / CARD_GUESS_VS

```
timer = 0
  └─► Game Over imediato
        └─► POST /api/games/:id/finish  { won: false }
        └─► (CARD_GUESS_VS) → exibe resultado parcial de P1
```

---

## Estados React do timer

| Estado | Tipo | Descrição |
|---|---|---|
| `timerRestante` | `number` | Segundos restantes (decrementa via `setInterval`) |
| `timerFlash` | `string \| null` | Badge exibido por 900ms após acerto/erro |
| `timerRef` | `MutableRefObject<NodeJS.Timeout>` | Referência do `setInterval` ativo |
| `fase` | `number` | Fase atual nos modos com sistema de fases (começa em 1) |
| `melhorFase` | `number` | Maior fase atingida na sessão atual — preservado no RESET |
| `resettando` | `boolean` | Controla a exibição da tela de RESET (1800ms) |
