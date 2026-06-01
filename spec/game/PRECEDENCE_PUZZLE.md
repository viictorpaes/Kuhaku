# Spec Técnica — PRECEDENCE_PUZZLE (Hierarquia de Comandos)

![Spec Técnica](https://img.shields.io/badge/Spec_T%C3%A9cnica-111827?style=flat-square&logo=jest&logoColor=green) 
![⚙️ Hierarquia de Comandos](https://img.shields.io/badge/⚙️Hierarquia_de_Comandos-A855F7?style=flat-square&logoColor=111827)

`GameType.PRECEDENCE_PUZZLE` · Solo · Sistema de fases

> Para as **regras completas do modo**, consulte [`docs/HIERARQUIA_DE_COMANDOS.md`](../../docs/HIERARQUIA_DE_COMANDOS.md).

## Parâmetros por dificuldade

| Dificuldade | Operadores disponíveis | Expressões / fase |
|---|---|---|
| `EASY` | `∧ ∨` | 8 |
| `MEDIUM` | `∧ ∨ →` | 10 |
| `HARD` | `∧ ∨ → ↔` | 12 |

## Precedência de operadores (ordem decrescente)

```
¬  >  ∧  >  ∨  >  →  >  ↔
```

A expressão gerada tem a precedência implícita deliberadamente omitida — o jogador precisa inserir parênteses para restaurar a ordem correta de avaliação.

## Geração de expressões (frontend — `frontend/src/ts/`)

```
1. Gerar expressão com N operadores (sem parênteses)
   Exemplo: P ∧ Q ∨ R → P
2. Calcular o gabarito:
   a. Tokenizar a expressão
   b. Avaliar respeitando a precedência padrão (¬ > ∧ > ∨ > → > ↔)
   c. Gabarito = resultado boolean da avaliação
3. Apresentar os tokens como sequência de elementos clicáveis
```

## Estrutura de token (representação conceitual)

Cada token da expressão pode ser um dos seguintes tipos:

| Tipo | Exemplos | Selecionável |
|---|---|---|
| variável | `P`, `Q`, `R` | ✅ |
| operador | `∧`, `∨`, `¬`, `→`, `↔` | ✅ |
| parêntese gerado | `(`, `)` | ❌ (são inseridos — não clicáveis) |

O jogador seleciona um intervalo contínuo de tokens e clica "Adicionar ( )" para envolvê-los.

## Interação do jogador (UX)

| Ação | Efeito |
|---|---|
| Clicar em um token | Seleciona / deseleciona o token |
| "Adicionar ( )" | Envolve a sequência selecionada em parênteses — push na stack |
| "Desfazer" | Remove o último par de parênteses adicionado — pop da stack |
| "Resetar" | Restaura a expressão ao estado original sem parênteses — stack = [] |
| "Confirmar" | Avalia a expressão com os parênteses inseridos e compara com o gabarito |

### Stack de parênteses (desfazer)

```
estado interno: pilha de operações de parênteses adicionados

Adicionar ( ):
  registrar { inicio: índice_token, fim: índice_token } na pilha

Desfazer:
  pop() da pilha → remove visualmente o último par inserido

Resetar:
  esvaziar a pilha → exibir expressão sem parênteses adicionados
```

## Avaliação de resposta

```
ao "Confirmar":
  1. Construir a expressão com os parênteses inseridos pelo jogador
  2. Avaliar pelo parser considerando parênteses explícitos + precedência
     Resultado_jogador = boolean

  3. Comparar com gabarito (avaliação pela precedência padrão sem parênteses do jogador)
     Resultado_gabarito = boolean

  se Resultado_jogador === Resultado_gabarito:
    acerto → +20s, streak++
  caso contrário:
    erro   → -5s, streak = 0
```

> A comparação é feita pelo **resultado boolean** — não pela forma da expressão.  
> Múltiplas formas de parentetizar que produzem o mesmo resultado são aceitas.

## Sistema de Streak Combo

Idêntico ao LOGIC_PUZZLE — ver [`spec/game/LOGIC_PUZZLE.md`](LOGIC_PUZZLE.md#sistema-de-streak-combo).

## Sistema de fases + timer

Timer inicial por dificuldade em `TIMER_PRECEDENCIA` (`frontend/src/constants.ts`):

| Dificuldade | Timer inicial |
|---|---|
| `EASY` | `60s` |
| `MEDIUM` | `50s` |
| `HARD` | `35s` |

Idêntico ao LOGIC_PUZZLE — ver [`spec/timer.md`](../timer.md).

```
timer = TIMER_PRECEDENCIA[dificuldade] (início de cada fase)
todas as expressões da fase respondidas → fase++ + timer continua correndo
timer = 0 → RESET para fase 1 + POST /finish { won: false }
```

## API utilizada

| Método | Endpoint | Quando |
|---|---|---|
| `POST` | `/api/games` | Início de cada fase |
| `POST` | `/api/games/:id/finish` | Timer = 0 (derrota) OU fase concluída (vitória) |
| `POST` | `/api/games/:id/save` | Jogador salva no ranking |

> `POST /guess` **não é usado** — toda a lógica de tokens e parênteses é local no frontend.