<h1 align="center">Regras do Evento — Kuhaku 🧑🏻‍🚀⚔️🪐<br>
<img src="https://img.shields.io/badge/🎮%20Evento-111827?style=flat-square&logo=gamepad&logoColor=FFD700" height="25"/>
<img src="https://img.shields.io/badge/Modo%20Arena-⚔️%201v1-111827?style=flat-square" height="25"/>
<img src="https://img.shields.io/badge/Modo%20Jornada-🧩%20Solo-111827?style=flat-square" height="25"/>
</h1>

<p align="center"><b>Estrutura oficial dos modos de jogo, mecânica de prêmios e regras de evento para exibição nos telões e totens.</b></p>

---

## 🗂️ Categorias de Jogo

Para o dia do evento, os jogos são divididos em **duas filas/estações distintas**:

| Categoria | Missões Disponíveis | Backend `GameType` | Dinâmica |
| :---: | :--- | :--- | :--- |
| ⚔️ **Modo Arena** | 📡 Batalha de Sinais · ⚔️ Duelo de Mapas | `VS_GUESS` · `CARD_GUESS_VS` | Confronto direto — dois entram, um vence |
| 🧩 **Modo Jornada** | 🔭 Operação Resgate · 🌕 Mapas Estelares · 🧠 Protocolo Lógico · ⚙️ Hierarquia de Comandos | `NUMBER_GUESS` · `CARD_GUESS` · `LOGIC_PUZZLE` · `PRECEDENCE_PUZZLE` | Risco vs. Recompensa — desafio progressivo |

---

## ⚔️ Modo Arena (1v1)

<img src="https://img.shields.io/badge/Batalha_de_Sinais-VS__GUESS-0284c7?style=flat-square&logo=wifi&logoColor=white" height="18"/> <img src="https://img.shields.io/badge/Duelo_de_Mapas-CARD__GUESS__VS-7c3aed?style=flat-square&logo=grid&logoColor=white" height="18"/>

> Confronto direto e rápido. **Dois astronautas entram, apenas um sai vitorioso.**

| Regra | Detalhe |
| :--- | :--- |
| 🏆 **Regra de Ouro** | O prêmio é **instantâneo** — ganhou a missão, levou |
| 🚫 **Empate** | Empates **não** geram prêmio físico |
| 📊 **Ranking** | **Ambos os astronautas** se registram — vencedor e perdedor entram no Hall da Fama |
| 🔄 **Rotatividade** | Após o fim da partida, os pilotos **liberam a estação** imediatamente |

> [!IMPORTANT]
> No Modo Arena o prêmio físico é entregue **na hora** somente ao vencedor. Porém, **os dois participantes digitam seus apelidos** para o ranking antes de liberar a estação — cada missão conta pontos para ambos.

### 📡 Batalha de Sinais — `VS_GUESS`

> Dois astronautas captam a mesma frequência de emergência. Quem sintonizar primeiro salva a missão.

| Parâmetro | Valor |
| :--- | :--- |
| 🔄 Rodadas | 3 |
| 🎯 Tentativas por rodada | 12 por jogador (alternadas) |
| ⏱️ Timer por turno | **15s** — esgotar consome a tentativa automaticamente |
| 🏆 Vencedor da rodada | Quem acertar a frequência primeiro |
| 💾 Ranking | Ambos registram apelido ao final |

### ⚔️ Duelo de Mapas — `CARD_GUESS_VS`

> Dois pilotos mapeiam a mesma nebulosa. Quem decifrar mais coordenadas estelares domina o setor.

| Parâmetro | Valor |
| :--- | :--- |
| 🃏 Grid compartilhado | 4×4 · 4×5 · 6×6 conforme dificuldade |
| ⏱️ Timer base | **60s (Cadete) · 50s (Piloto) · 35s (Comandante)** |
| ✅ Par correto | `+20s` ao timer — flash verde |
| ❌ Erro | `−5s` ao timer — flash vermelho |
| 🏆 Vencedor | Quem encontrar mais pares ao fim do tempo |
| 💾 Ranking | Ambos registram apelido ao final |

---

## 🧩 Modo Jornada (Solo)

<img src="https://img.shields.io/badge/Operação_Resgate-NUMBER__GUESS-F97316?style=flat-square&logo=radar&logoColor=white" height="18"/> <img src="https://img.shields.io/badge/Mapas_Estelares-CARD__GUESS-FFD700?style=flat-square&logo=grid&logoColor=black" height="18"/> <img src="https://img.shields.io/badge/Protocolo_Lógico-LOGIC__PUZZLE-22C55E?style=flat-square&logo=probot&logoColor=white" height="18"/> <img src="https://img.shields.io/badge/Hierarquia_de_Comandos-PRECEDENCE__PUZZLE-A855F7?style=flat-square&logo=terminal&logoColor=white" height="18"/>

### ⚖️ Mecânica de Risco vs. Recompensa

#### Critérios de Resultado

| Resultado | Condição |
| :---: | :--- |
| ✅ **Vitória** — Ganha Recompensa | Completou a missão dentro do limite de tentativas/tempo |
| ❌ **Derrota** — Sem Recompensa | Timer zerou **OU** tentativas esgotadas antes de concluir |

#### Timer Universal por Dificuldade

| Dificuldade | Patente | Timer Inicial | Acerto | Erro |
| :---: | :---: | :---: | :---: | :---: |
| `EASY` | 🌍 Cadete | **60s** | `+20s` | `−5s` |
| `MEDIUM` | 🚀 Piloto | **50s** | `+20s` | `−5s` |
| `HARD` | 👨‍🚀 Comandante | **35s** | `+20s` | `−5s` |

---

### 🎯 A Decisão: Seguir ou Parar? (Modos com Fases)

Nos modos **🧠 Protocolo Lógico**, **⚙️ Hierarquia de Comandos** e **🔭 Operação Resgate (Missão Livre)**, ao completar uma fase o astronauta se depara com uma escolha:

```
┌──────────────────────────────────────────────────────────────┐
│         🏆  FASE CONCLUÍDA — MISSÃO BEM-SUCEDIDA!            │
│                                                              │
│   [1] 🎁  Retirar Prêmio e Registrar no Hall da Fama        │
│   [2] 🚀  Dobrar ou Nada  (avançar para a próxima fase)     │
└──────────────────────────────────────────────────────────────┘
```

| Opção | O que acontece |
| :--- | :--- |
| 🎁 **Retirar Prêmio e Registrar** | Digita o apelido → entra no Hall da Fama · recebe o voucher/brinde · libera a estação · pode voltar ao fim da fila para outra missão |
| 🚀 **Dobrar ou Nada** | Abdica do prêmio físico atual · tenta pontuação maior na fase seguinte (mais difícil) · se **vencer**: novo prêmio + pontuação maior · se **timer zerar**: RESET para a Fase 1 — sem prêmio, mas os pontos acumulados entram no Hall da Fama |

> [!NOTE]
> Ao escolher **Dobrar ou Nada**, o timer **continua correndo** da fase anterior — nenhuma recomposição de tempo. Os pontos acumulados até a derrota são sempre salvos no ranking.

> [!TIP]
> **Estratégia galáctica:** Cadete → Piloto → Comandante encadeados no "Dobrar ou Nada" multiplicam a pontuação — mas um único timer zerado reinicia tudo!

---

### 🔭 Operação Resgate — `NUMBER_GUESS`

> Sintonize a frequência de resgate exata antes que as tentativas acabem.

| Parâmetro | Cadete 🌍 | Piloto 🚀 | Comandante 👨‍🚀 |
| :--- | :---: | :---: | :---: |
| Range de frequência | 1–10 | 1–50 | 1–100 |
| Tentativas máximas | 5 | 8 | 10 |
| Timer | 60s | 50s | 35s |
| **Missão Livre** | Fases infinitas | Fases infinitas | Fases infinitas |

| Feedback | Interno | Exibido ao astronauta |
| :---: | :--- | :--- |
| ✅ Acerto | `acertou ✅` | 📡 Sinal estabelecido! Resgate a caminho! |
| 🔥🔥🔥 | `pegando fogo` | 🔭 Frequência muito próxima! |
| 🌡️ | `quente` | 📶 Sinal detectado! |
| ☔️ | `morno` | 🌌 Interferência estática… |
| ❄️ | `frio` | 🔇 Sem sinal no espaço… |

### 🌕 Mapas Estelares — `CARD_GUESS`

> Desvende as coordenadas estelares ocultas antes que o tempo expire.

| Parâmetro | Cadete 🌍 | Piloto 🚀 | Comandante 👨‍🚀 |
| :--- | :---: | :---: | :---: |
| Grid | 4×4 (8 pares) | 4×5 (10 pares) | 6×6 (18 pares) |
| Timer base | 60s | 50s | 35s |
| Par correto | `+20s` | `+20s` | `+20s` |
| Erro (par errado) | `−5s` | `−5s` | `−5s` |

### 🧠 Protocolo Lógico — `LOGIC_PUZZLE`

> A base intercepta transmissões cifradas do cosmos. Decodifique cada sinal como VERDADEIRO ou FALSO.

| Parâmetro | Cadete 🌍 | Piloto 🚀 | Comandante 👨‍🚀 |
| :--- | :---: | :---: | :---: |
| Transmissões por fase | 8 | 10 | 12 |
| Variáveis lógicas | P, Q | P, Q, R | P, Q, R |
| Operadores | `∧ ∨ ¬` | `∧ ∨ ¬ →` | `∧ ∨ ¬ → ↔` |
| Timer base | 60s | 50s | 35s |
| Sistema de fases | ✅ Infinitas | ✅ Infinitas | ✅ Infinitas |

### ⚙️ Hierarquia de Comandos — `PRECEDENCE_PUZZLE`

> O computador da nave perdeu os parênteses! Restaure a ordem de precedência dos operadores lógicos.

| Parâmetro | Cadete 🌍 | Piloto 🚀 | Comandante 👨‍🚀 |
| :--- | :---: | :---: | :---: |
| Expressões por fase | 8 | 10 | 12 |
| Operadores | `∧ ∨` | `∧ ∨ →` | `∧ ∨ → ↔` |
| Timer base | 60s | 50s | 35s |
| Sistema de fases | ✅ Infinitas | ✅ Infinitas | ✅ Infinitas |

---

## 📜 Regras Oficiais de Premiação

> Para exibição nos **telões e totens** próximos às estações de jogo.

| # | Regra | Detalhe |
| :---: | :--- | :--- |
| 1 | ⚔️ **Modos Arena (1v1)** | Vitória garante prêmio imediato · empates **não** geram prêmio |
| 2 | 🧩 **Modos Jornada (Solo)** | Para ganhar: concluir a missão dentro do tempo e tentativas disponíveis |
| 3 | 🎁 **Limite de Brindes** | Cada astronauta pode ganhar no máximo **5 prêmios** por dia |
| 4 | 🔄 **Abandono de Missão** | Escolheu retirar o prêmio → **libere a estação** · escolheu continuar → permanece na máquina |
| 5 | 📊 **Hall da Fama** | Todo astronauta que conclui uma missão (vencedor **ou** perdedor nos modos Arena) pode registrar seu apelido |
| 6 | ⏱️ **Timer zerado** | Nos modos com fases: RESET para Fase 1 · pontos acumulados são preservados no ranking |

> [!IMPORTANT]
> O limite de prêmios por astronauta (**X**) deve ser definido pela organização antes do evento e configurado na tela de operador.

---

## 🗺️ Fluxo Geral do Evento

```
Chegou na estação
        │
        ▼
┌─────────────────┐         ┌─────────────────────────┐
│   Modo Arena    │         │     Modo Jornada         │
│  📡 Bat. Sinais │         │  🔭 Op. Resgate          │
│  ⚔️  Duelo Mapas│         │  🌕 Mapas Estelares      │
└────────┬────────┘         │  🧠 Protocolo Lógico     │
         │                  │  ⚙️  Hierarquia Cmds     │
    Partida 1v1             └────────────┬────────────┘
         │                               │
    Venceu? ──Não──► Sem prêmio     Missão concluída?
         │           (ambos salvam       │
        Sim          no ranking)    ──Não──► Sem prêmio
         │                          (pts salvos)
    Prêmio imediato                      │
    + ambos registram                   Sim
    no Hall da Fama                      │
         │              ┌────────────────▼────────────────┐
         │              │   Retirar Prêmio ou Dobrar?      │
         │              └──────────────┬──────────────────┘
         │                  Retirar    │    Dobrar ou Nada
         │                            │         │
         │              Prêmio + rank │    Próxima fase
         │              + libera      │    (timer continua)
         ▼                            ▼         ▼
   Libera estação               Libera     Permanece
                                estação    na estação
```

---

## 🏆 Sistema de Pontuação — Hall da Fama

O ranking global é ordenado pela **pontuação ponderada** calculada pelo `GameService.getGlobalRanking()`:

```
1° critério: winRate DESC           (taxa de vitória — % de missões vencidas)
2° critério: weightedAttempts ASC   (tentativas ponderadas — menor é melhor)
3° critério: averageAttempts ASC    (tentativas médias — desempate final)
```

### Fórmula de Pontuação Ponderada

```
weightedAttempts = mediana × 0.5 + média × 0.3 + moda × 0.2
```

| Estatística | Peso | Significado |
| :--- | :---: | :--- |
| 📐 Mediana | `× 0.5` | Tentativas da missão do meio — robusta a missões atípicas |
| 📊 Média | `× 0.3` | Tentativas médias em todas as vitórias |
| 🎯 Moda | `× 0.2` | Número de tentativas mais frequente nas vitórias |

> [!NOTE]
> Nos modos Arena (**Batalha de Sinais** e **Duelo de Mapas**), o ranking exibe separadamente vitórias 🏆 e derrotas 💀. Astronautas sem vitória aparecem com ícone 💀 e placar de derrotas — a participação sempre conta!
