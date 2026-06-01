# Spec Técnica — VS_GUESS (Batalha de Sinais)

![Spec Técnica](https://img.shields.io/badge/Spec_T%C3%A9cnica-111827?style=flat-square&logo=jest&logoColor=green) 
![Batalha de Sinais](https://img.shields.io/badge/📡Batalha_de_Sinais-06B6D4?style=flat-square&logoColor=111827)

`GameType.VS_GUESS` · Multiplayer local · 2 jogadores

> Para as **regras completas do modo**, consulte [`docs/BATALHA_DE_SINAIS.md`](../../docs/BATALHA_DE_SINAIS.md).

## Parâmetros por dificuldade

| Dificuldade | Range | Max tentativas / rodada |
|---|---|---|
| `EASY` | 1 – 10 | 12 |
| `MEDIUM` | 1 – 50 | 12 |
| `HARD` | 1 – 100 | 12 |

**Rodadas:** 3 fixas por partida.

## Estrutura de uma rodada

```
rodada N:
  └─► POST /api/games  (nova partida; target gerado pelo backend — mesmo para ambos)
        └─► turno P1:
              POST /api/games/:id/guess { value }  ← timer TIMER_VS_TURNO = 15s por turno
                └─► won = true  → P1 vence a rodada → turno de P2 não ocorre
                └─► timer = 0   → turno perdido → passa para P2
                └─► attempts P1 = maxAttempts e não venceu → passa para P2
        └─► turno P2:
              mesma lógica
        └─► se ambos esgotam tentativas/timer sem acertar → empate nesta rodada
  └─► placar atualizado; próxima rodada
```

> O backend usa o mesmo `gameId` para os dois jogadores na mesma rodada.  
> O `App.tsx` gerencia um array de `gameId`s (`gameIds[3]`) e o placar entre rodadas.

## Gerenciamento de estado (App.tsx)

| Estado | Tipo | Descrição |
|---|---|---|
| `gameIds` | `string[3]` | Um `gameId` por rodada (criado no início de cada rodada) |
| `placar` | `{ p1: number, p2: number }` | Rodadas vencidas por cada jogador |
| `rodadaAtual` | `1 \| 2 \| 3` | Rodada em andamento |
| `jogadorAtual` | `1 \| 2` | Jogador cujo turno está ativo |
| `faseRodada` | `'p1' \| 'p2' \| 'resultado'` | Fase interna da rodada |

## Timer por turno

| Evento | Efeito |
|---|---|
| Timer = 0 | Turno perdido → passa para o próximo jogador (`faseRodada: p1 → p2`) |
| Acerto | Rodada encerrada para este jogador (`won = true`) |
| Max tentativas esgotadas sem acerto | Próximo jogador assume |

Timer: `TIMER_VS_TURNO = 15s` (sem bônus/penalidade por tentativa neste modo).  
O timer é reiniciado para `15s` a cada troca de turno.

## Critério de vitória por rodada

| Situação | Resultado |
|---|---|
| P1 acerta antes de P2 jogar | P1 vence a rodada (+1 ponto P1) |
| P2 acerta | P2 vence a rodada (+1 ponto P2) |
| Ambos acertam — P1 com menos tentativas | P1 vence a rodada |
| Ambos acertam — mesmo número de tentativas | Empate na rodada (sem ponto) |
| Nenhum acerta (timer ou tentativas esgotados) | Empate na rodada (sem ponto) |

### Critério de vitória geral (ao final das 3 rodadas)

| Situação | Resultado |
|---|---|
| Um jogador com mais rodadas vencidas | Esse jogador vence a partida |
| Empate (ex.: 1–1 com 1 rodada empatada) | Partida encerrada sem vencedor declarado — exibe "Empate!" |

> Com 3 rodadas, cenários de empate possíveis: 1–1 (1 empate), 0–0 (3 empates).

## Persistência no ranking

Ambos os jogadores podem salvar seus resultados individualmente via `POST /api/games/:id/save` com seus respectivos `gameId`s e apelidos.

O ranking do modo VS exibe `wins` e `losses` por jogador — astronautas sem vitória aparecem com ícone 💀 e placar de derrotas.

## API utilizada

| Método | Endpoint | Quando |
|---|---|---|
| `POST` | `/api/games` | Início de cada rodada (3× por partida) |
| `POST` | `/api/games/:id/guess` | A cada palpite de cada jogador |
| `POST` | `/api/games/:id/finish` | Rodada encerrada sem vitória |
| `POST` | `/api/games/:id/save` | Cada jogador salva individualmente |