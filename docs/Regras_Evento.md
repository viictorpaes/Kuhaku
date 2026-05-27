<h1 align="center">Regras do Evento — Kuhaku 🧑🏻‍🚀⚔️🪐<br>
<img src="https://img.shields.io/badge/🎮%20Evento-111827?style=flat-square&logo=gamepad&logoColor=FFD700" height="25"/>
<img src="https://img.shields.io/badge/Modo%20Arena-⚔️%201v1-111827?style=flat-square" height="25"/>
<img src="https://img.shields.io/badge/Modo%20Jornada-🧩%20Solo-111827?style=flat-square" height="25"/>
</h1>

<p align="center"><b>Estrutura oficial dos modos de jogo, mecânica de prêmios e regras de evento para exibição nos telões e totens.</b></p>

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
| 📊 **Ranking** | **Ambos os astronautas** podem se registrar — vencedor **e** perdedor entram no Hall da Fama; somente o vencedor recebe o prêmio físico |
| ⏱️ **Derrota por Timeout** | Jogadores eliminados **por tempo esgotado** (turno zerado / timer zerado) **não entram no cadastro** do ranking |
| 🔄 **Rotatividade** | Após o fim da partida, os pilotos **liberam a estação** imediatamente |

> [!IMPORTANT]
> No Modo Arena o prêmio físico é entregue **na hora** somente ao vencedor. O perdedor pode registrar seu apelido no Hall da Fama **somente se sua derrota foi por tentativas esgotadas** — perdas por timeout (turno expirado em Batalha de Sinais / timer zerado em Duelo de Mapas) **não contam** para o cadastro.

> [!NOTE]
> **Por que essa distinção?** Quem perde por tentativas demonstrou participação ativa na partida; quem perdeu apenas por não agir dentro do tempo não disputou de fato a missão.

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
| ✅ Par correto | `+8s` (Cadete) · `+20s` (Piloto/Comandante) ao timer — flash verde |
| ❌ Erro | `−5s` ao timer — flash vermelho |
| 🏆 Vencedor | Quem encontrar mais pares ao fim do tempo |
| 💾 Ranking | Ambos registram apelido ao final |

## 🧩 Modo Jornada (Solo)

<img src="https://img.shields.io/badge/Operação_Resgate-NUMBER__GUESS-F97316?style=flat-square&logo=radar&logoColor=F97316" height="18"/> <img src="https://img.shields.io/badge/Mapas_Estelares-CARD__GUESS-FFD700?style=flat-square&logo=grid&logoColor=black" height="18"/> <img src="https://img.shields.io/badge/Protocolo_Lógico-LOGIC__PUZZLE-22C55E?style=flat-square&logo=probot&logoColor=22C55E?" height="18"/> <img src="https://img.shields.io/badge/Hierarquia_de_Comandos-PRECEDENCE__PUZZLE-A855F7?style=flat-square&logo=terminal&logoColor=white" height="18"/>

### 🏅 Limite de Vitórias Consecutivas por Dificuldade

Para garantir a rotatividade das estações e equilibrar as oportunidades de prêmio durante o evento:

| Dificuldade | Patente | Vitórias consecutivas máximas |
| :---: | :---: | :---: |
| `EASY` | 🌍 Cadete | **3 vitórias seguidas** |
| `MEDIUM` | 🚀 Piloto | Sem limite |
| `HARD` | 👨‍🚀 Comandante | Sem limite |

> [!IMPORTANT]
> Ao atingir **3 vitórias consecutivas no modo Cadete (🌍 EASY)**, o astronauta deve **liberar a estação** — não há prêmio adicional na quarta rodada seguida no mesmo nível. Para continuar jogando, ele volta ao fim da fila ou escolhe uma dificuldade mais alta (Piloto ou Comandante).

> [!TIP]
> **Estratégia recomendada:** use o Cadete para entrar no ritmo, depois avance para Piloto ou Comandante para pontuações mais altas no ranking e sem limite de sequência.

---

### ⚖️ Mecânica de Risco vs. Recompensa

#### Critérios de Resultado

| Resultado | Condição |
| :---: | :--- |
| ✅ **Vitória** — Ganha Recompensa | Completou a missão dentro do limite de tentativas/tempo |
| ❌ **Derrota** — Sem Recompensa | Timer zerou **OU** tentativas esgotadas antes de concluir |

#### Timer Universal por Dificuldade

| Dificuldade | Patente | Timer Inicial | Acerto | Erro | Teto do Timer |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `EASY` | 🌍 Cadete | **60s** | `+8s` | `−5s` | **90s máx** |
| `MEDIUM` | 🚀 Piloto | **50s** | `+20s` | `−5s` | **150s máx** |
| `HARD` | 👨‍🚀 Comandante | **35s** | `+25s` | `−5s` | Sem limite |

> [!NOTE]
> O bônus reduzido e o teto de timer no modo **Cadete (🌍 EASY)** evitam que um único astronauta monopolize a estação em eventos com fila — quanto mais fácil o nível, mais curta é a sessão máxima possível.

---

### 🎯 A Decisão: Seguir ou Parar? (Modos com Fases)

Nos modos **🧠 Protocolo Lógico**, **⚙️ Hierarquia de Comandos**, **🌕 Mapas Estelares** e **🔭 Operação Resgate (Missão Livre)**, ao completar uma fase o astronauta se depara com uma escolha — **desde que tenha passado no critério de aprovação:**

#### 🚦 Critério de Aprovação de Fase

> **Acertos > Erros** — o astronauta só tem direito a continuar se tiver mais respostas certas do que erradas na fase concluída. Empate ou maioria de erros = eliminado.

O que conta como "acerto" e "erro" varia por modo:

| Modo | Acertos | Erros | Gate de Aprovação |
| :--- | :--- | :--- | :---: |
| 🧠 Protocolo Lógico | Transmissões respondidas corretamente | Transmissões erradas | Acertos > Erros |
| ⚙️ Hierarquia de Comandos | Expressões com parênteses corretos | Expressões erradas | Acertos > Erros |
| 🌕 Mapas Estelares | Pares de coordenadas encontrados | Tentativas de par incorretas | Pares > Erros |
| 🔭 Operação Resgate | Tentativas economizadas¹ | Palpites errados | Acertos > Erros |

> ¹ **Operação Resgate — como funciona o gate:**
> O "acertos" não é simplesmente "1 por ter adivinhado" — vale pelas **tentativas que você economizou**:
> `Acertos = Tentativas Máximas − Palpites Errados`
>
> | Dificuldade | Tentativas máximas | Passa se errou até | Ou seja: acertou em até |
> | :---: | :---: | :---: | :---: |
> | 🌍 Cadete | 5 | 2 erros | 3ª tentativa |
> | 🚀 Piloto | 8 | 3 erros | 4ª tentativa |
> | 👨‍🚀 Comandante | 10 | 4 erros | 5ª tentativa |
>
> Isso incentiva precisão: sintonizar a frequência rápido avança a missão; usar quase todas as tentativas bloqueia a próxima fase.

| Condição ao fim da fase | Resultado |
| :--- | :--- |
| ✅ Acertos > Erros **e** tempo não zerou | Aprovado — pode escolher retirar ou continuar |
| ❌ Erros ≥ Acertos | **Eliminado** — a estação está lotada, próximo piloto na fila |
| ⏱️ Timer zerou | **Eliminado** — sessão encerrada, resultado salvo no ranking |

```
┌──────────────────────────────────────────────────────────────┐
│         🏆  FASE CONCLUÍDA — APROVADO!                       │
│              ✅ Acertos > Erros                               │
│                                                              │
│   [1] 🎁  Retirar Prêmio e Registrar no Hall da Fama        │
│   [2] 🚀  Dobrar ou Nada  (avançar para a próxima fase)     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│         🚨  ACESSO BLOQUEADO — ELIMINADO!                    │
│    A estação está lotada — outro piloto assume a posição.    │
│              🚫 Erros ≥ Acertos                              │
│                                                              │
│   [📊]  Ver Resultado Final e registrar apelido              │
└──────────────────────────────────────────────────────────────┘
```

| Opção | O que acontece |
| :--- | :--- |
| 🎁 **Retirar Prêmio e Registrar** | Digita o apelido → entra no Hall da Fama · recebe o voucher/brinde · libera a estação · pode voltar ao fim da fila para outra missão |
| 🚀 **Dobrar ou Nada** | Abdica do prêmio físico atual · tenta pontuação maior na fase seguinte (mais difícil) · se **vencer com acertos > erros**: novo prêmio + pontuação maior · se **timer zerar ou erros ≥ acertos**: eliminado — pontos acumulados entram no Hall da Fama |

> [!NOTE]
> Ao escolher **Dobrar ou Nada**, o timer **continua correndo** da fase anterior — nenhuma recomposição de tempo. Os pontos acumulados até a derrota são sempre salvos no ranking.

> [!TIP]
> **Estratégia galáctica:** Cadete → Piloto → Comandante encadeados no "Dobrar ou Nada" multiplicam a pontuação — mas um único timer zerado **ou** uma fase com mais erros que acertos reinicia tudo!

---

### 🔭 Operação Resgate — `NUMBER_GUESS`

> Sintonize a frequência de resgate exata antes que as tentativas acabem.

| Parâmetro | Cadete 🌍 | Piloto 🚀 | Comandante 👨‍🚀 |
| :--- | :---: | :---: | :---: |
| Range de frequência | 1–10 | 1–50 | 1–100 |
| Tentativas máximas | 5 | 8 | 10 |
| Timer | 60s | 50s | 35s |
| **Gate de fase** | ≤ 2 erros | ≤ 3 erros | ≤ 4 erros |
| **Missão Livre** | Fases infinitas* | Fases infinitas* | Fases infinitas* |

*Infinitas enquanto aprovar o gate de fase a cada rodada.

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
| Par correto | `+8s` | `+20s` | `+20s` |
| Erro (par errado) | `−5s` | `−5s` | `−5s` |
| Teto do timer | **90s** | **150s** | Sem limite |
| **Gate de fase** | Pares > Erros | Pares > Erros | Pares > Erros |

### 🧠 Protocolo Lógico — `LOGIC_PUZZLE`

> A base intercepta transmissões cifradas do cosmos. Decodifique cada sinal como VERDADEIRO ou FALSO.

> [!NOTE]
> **O que são P, Q e R?** São apenas apelidos para afirmações que podem ser **verdadeiras (V)** ou **falsas (F)** — como "está chovendo" ou "tenho guarda-chuva". Os operadores combinam essas afirmações:
>
> | Símbolo | Nome | Funciona assim |
> | :---: | :--- | :--- |
> | `¬` | NÃO (NOT) | Inverte o valor — `¬V = F` e `¬F = V` |
> | `∧` | E (AND) | Verdadeiro **só se os dois lados forem** verdadeiros |
> | `∨` | OU (OR) | Verdadeiro se **pelo menos um lado for** verdadeiro |
> | `→` | SE…ENTÃO | Falso **apenas se** o lado esquerdo for V e o direito F |
> | `↔` | SE E SÓ SE | Verdadeiro quando os dois lados têm o **mesmo valor** |
>
> O jogo mostra uma fórmula com valores atribuídos a P, Q e R e você decide se o resultado final é **V** ou **F** — e se a fórmula é sempre V (🌟 Tautologia), sempre F (🕳️ Contradição) ou depende dos valores (🪐 Contingência).

| Parâmetro | Cadete 🌍 | Piloto 🚀 | Comandante 👨‍🚀 |
| :--- | :---: | :---: | :---: |
| Transmissões por fase | 8 | 10 | 12 |
| Variáveis lógicas | P, Q | P, Q, R | P, Q, R |
| Operadores | `∧ ∨ ¬` | `∧ ∨ ¬ →` | `∧ ∨ ¬ → ↔` |
| Timer base | 60s | 50s | 35s |
| Bônus por acerto | `+8s` | `+20s` | `+25s` |
| Teto do timer | **90s** | **150s** | Sem limite |
| **Gate de fase** | Acertos > Erros | Acertos > Erros | Acertos > Erros |
| Sistema de fases | ✅ Infinitas* | ✅ Infinitas* | ✅ Infinitas* |

*Infinitas enquanto aprovar o gate de fase a cada rodada.

### ⚙️ Hierarquia de Comandos — `PRECEDENCE_PUZZLE`

> O computador da nave perdeu os parênteses! Restaure a ordem de precedência dos operadores lógicos.

> [!NOTE]
> **O que é precedência?** Igual à matemática — `2 + 3 × 4` é `14`, não `20`, porque `×` tem prioridade sobre `+`. Na lógica a ordem é:
>
> ```
> ¬ (NÃO)  →  maior prioridade — age só no símbolo ao lado
> ∧ (E)    →  segunda
> ∨ (OU)   →  terceira
> → (SE)   →  quarta
> ↔ (SSE)  →  menor prioridade
> ```
>
> Então `P ∨ Q ∧ R` deve ser lido como `P ∨ (Q ∧ R)`. O jogo te dá a expressão **sem parênteses** e você reinsere os parênteses no lugar certo para mostrar qual parte é calculada primeiro.

| Parâmetro | Cadete 🌍 | Piloto 🚀 | Comandante 👨‍🚀 |
| :--- | :---: | :---: | :---: |
| Expressões por fase | 8 | 10 | 12 |
| Operadores | `∧ ∨` | `∧ ∨ →` | `∧ ∨ → ↔` |
| Timer base | 60s | 50s | 35s |
| Bônus por acerto | `+8s` | `+20s` | `+25s` |
| Teto do timer | **90s** | **150s** | Sem limite |
| **Gate de fase** | Acertos > Erros | Acertos > Erros | Acertos > Erros |
| Sistema de fases | ✅ Infinitas* | ✅ Infinitas* | ✅ Infinitas* |

*Infinitas enquanto aprovar o gate de fase a cada rodada.

---

## 📜 Regras Oficiais de Premiação

> Para exibição nos **telões e totens** próximos às estações de jogo.

| # | Regra | Detalhe |
| :---: | :--- | :--- |
| 1 | ⚔️ **Modos Arena (1v1)** | Vitória garante prêmio imediato · empates **não** geram prêmio |
| 2 | 🧩 **Modos Jornada (Solo)** | Para ganhar: concluir a missão dentro do tempo e tentativas disponíveis |
| 3 | 🎁 **Limite de Brindes** | Cada astronauta pode ganhar no máximo **5 prêmios** por dia |
| 4 | 🔄 **Abandono de Missão** | Escolheu retirar o prêmio → **libere a estação** · escolheu continuar → permanece na máquina |
| 5 | 📊 **Hall da Fama** | Arena: vencedor **e** perdedor (por tentativas) registram apelido · perdedor por timeout **não** registra. Jornada: qualquer conclusão registra |
| 6 | ⏱️ **Timer zerado** | Nos modos com fases: eliminado imediatamente · pontos acumulados são preservados no ranking |
| 7 | 🔁 **Sequência Cadete** | No modo Jornada dificuldade 🌍 Cadete: máximo **3 vitórias consecutivas** — após isso, libera a estação ou sobe para Piloto/Comandante |
| 8 | 🚦 **Gate de Fase** | Nos modos com fases: **Acertos > Erros** para continuar — empate ou maioria de erros elimina imediatamente |
| 9 | 🏟️ **Rotatividade em Evento** | Modo 🌍 Cadete tem bônus reduzido (`+8s`) e teto de timer (**90s**) para liberar as estações mais rápido em filas cheias |

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
         │              │     Acertos > Erros?             │
         │              └──────┬───────────────────┬───────┘
         │                    Sim                  Não
         │                     │                   │
         │              ┌──────▼──────┐      🚨 Eliminado
         │              │ Retirar ou  │      (estação lotada)
         │              │  Dobrar?    │      Resultado salvo
         │              └──┬──────┬───┘
         │            Ret. │      │ Dobrar
         │    Prêmio+rank  │  Próxima fase
         │    + libera     │  (timer continua)
         ▼                 ▼         ▼
   Libera estação     Libera     Permanece
                      estação    na estação
```

---

## 🏆 Hall da Fama — Critério de Ranking

> **Menor mediana = astronauta de elite** — este é o critério universal de todos os rankings.

### 🥇 Prêmio e Ranking são coisas separadas

Apenas o **1º lugar no placar do jogo** (quem vencer a partida) resgata o prêmio. O ranking completo dos participantes é exibido **ao final**, ordenado por eficiência.

> Exemplo: a1 venceu a partida de a2 → recebe o prêmio. O ranking final mostra todos os participantes ordenados pela menor mediana de tentativas, mesmo que a2 esteja acima de a1

### Ordem de Classificação (todos os modos)

```
1° critério: medianAttempts ASC    → menor mediana de tentativas/erros
2° critério: averageAttempts ASC   → menor média (desempate)
3° critério: wins DESC             → mais vitórias (desempate final)
```

### O que é contado como "tentativa" em cada modo

| Modo | O que a mediana representa | Menor = melhor porque… |
| :--- | :--- | :--- |
| 🔭 **Operação Resgate** | Nº de palpites para acertar a frequência | Acertou em menos tentativas → mais preciso |
| 📡 **Batalha de Sinais** | Nº de palpites para acertar (nas rodadas ganhas) | Idem — só conta rodadas vencidas |
| 🌕 **Mapas Estelares** | Nº de pares errados antes de completar o mapa | Menos erros → mapeou mais limpo |
| ⚔️ **Duelo de Mapas** | Idem Mapas Estelares | Idem |
| 🧠 **Protocolo Lógico** | Nº de transmissões respondidas errado por fase | Menos erros → decodificação mais precisa |
| ⚙️ **Hierarquia de Comandos** | Nº de expressões erradas por fase | Menos erros → melhor domínio de precedência |
| 🌌 **Galáxia (Geral)** | Mediana combinada de todos os modos jogados | O mais versátil e preciso lidera |

### Exibição no Hall da Fama por modo

| Modo | Ícone de vitória | Ícone de derrota | Astronauta sem vitórias |
| :--- | :---: | :---: | :--- |
| 📡 Batalha de Sinais | 📡 (verde) | 🔇 (cinza/vermelho) | Aparece com `🔇` e placar de derrotas |
| ⚔️ Duelo de Mapas | 🌟 (verde) | 💀 (cinza/vermelho) | Aparece com `💀` e placar de derrotas |
| Demais modos | — | — | Exibe número de missões concluídas |

> [!NOTE]
> No Modo Arena, o vencedor exibe `📡 1V 🔇 0D` e o perdedor exibe `🔇 0V 🔇 1D`. A posição no ranking entre dois vencedores é determinada pela mediana — mesmo com vitórias iguais, quem usou menos tentativas fica à frente.

> [!TIP]
> **Para subir no ranking:** ganhe rápido e com poucos erros. Uma vitória em 2 tentativas vale mais do que dez vitórias em 9 tentativas cada.
