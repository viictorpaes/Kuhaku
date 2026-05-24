<h1 align="center">🔭 Operação Resgate
<br>
<img src="https://img.shields.io/badge/Modo-NUMBER__GUESS-7c3aed?style=for-the-badge&logo=radar&logoColor=white" height="28"/>
<img src="https://img.shields.io/badge/Jogadores-Solo-a78bfa?style=for-the-badge" height="28"/>
<img src="https://img.shields.io/badge/Range-Nível_/_Customizável-8b5cf6?style=for-the-badge" height="28"/>
</h1>

<p align="center">
  <img src="../img/operação_resgate.jpeg" width="720" alt="Operação Resgate"/>
</p>

> [!NOTE]
> **Lore:** Uma nave à deriva envia pulsos de frequência pelo cosmos. O astronauta precisa sintonizar o canal exato de resgate antes que as tentativas se esgotem — e o silêncio tome conta.


## 🎯 Objetivo

Modo **single-player**. Descubra o número-frequência secreto (entre 1 e o range da dificuldade) dentro do número máximo de tentativas. A cada palpite, o servidor revela se você está quente, morno ou frio — proporcional ao range escolhido.


## 📋 Regras

| Regra | Detalhe |
|---|---|
| 👤 Jogadores | 1 (Solo) |
| 🔢 Tentativas | Limitadas por dificuldade |
| ⏱️ Timer por tentativa | Limitado por dificuldade — tempo esgotado consome uma tentativa ⚠️ |
| 🎯 Feedback | Proporcional ao range (não ao range fixo) |
| 🛸 Missão Livre | Range e timer personalizáveis pelo jogador |


## 🌍 Dificuldades

| Dificuldade | Patente | Range | Tentativas | Timer/tentativa |
|---|---|---|---|---|
| 🌍 **Cadete** | Recruta | `1 – 10` | 5 | 30s |
| 🚀 **Piloto** | Tenente | `1 – 50` | 8 | 20s |
| 👨‍🚀 **Comandante** | Elite | `1 – 100` | 10 | 15s |
| 🛸 **Missão Livre** | — | Customizável | — | Customizável |

> [!NOTE]
> **Missão Livre** permite configurar o range de `1–100` até `1–100.000` e o timer de `sem limite` a `5s` por tentativa. O feedback continua proporcional ao range escolhido.


## 📶 Sistema de Feedback (proporcional ao range)

| Diferença `diff` | Sinal interno | Mensagem ao jogador |
|---|---|---|
| `diff == 0` | `acertou ✅` | 📡 Sinal estabelecido! Resgate a caminho! |
| `diff ≤ 10% range` | `pegando fogo 🔥🔥🔥` | 🔭 Frequência muito próxima! |
| `diff ≤ 20% range` | `quente 🌡️` | 📶 Sinal detectado! |
| `diff ≤ 40% range` | `morno ☔️` | 🌌 Interferência estática... |
| `diff > 40% range` | `frio ❄️` | 🔇 Sem sinal no espaço... |

> [!TIP]
> **Exemplo:** Range 1–100, frequência = 70, palpite = 50 → `diff = 20` → `20% do range` → quente 🌡️. Quanto menor o range, mais preciso precisa ser o palpite para acender o 🔥.


## 🖥️ Informações Técnicas

| Campo | Valor |
|---|---|
| Frontend `Modo` | `solo` |
| Backend `GameType` | `NUMBER_GUESS` |
| Tentativas (Cadete) | `MAX_TENTATIVAS_SOLO.EASY = 5` |
| Tentativas (Piloto) | `MAX_TENTATIVAS_SOLO.MEDIUM = 8` |
| Tentativas (Cmd) | `MAX_TENTATIVAS_SOLO.HARD = 10` |
| Timer (Cadete) | `TIMER_SOLO.EASY = 30s` |
| Timer (Piloto) | `TIMER_SOLO.MEDIUM = 20s` |
| Timer (Cmd) | `TIMER_SOLO.HARD = 15s` |
| Range custom | Parâmetro `customRange` no DTO |

> [!WARNING]
> O parâmetro `customRange` sobrescreve o range da dificuldade. Ao usar Missão Livre, o backend ignora o range padrão e calcula todos os feedbacks com base no `customRange` enviado.
| Endpoint criar jogo | `POST /api/games` → `{ difficulty, customRange? }` |
| Endpoint palpite | `POST /api/games/:id/guess` → `{ value: number }` |
| Endpoint encerrar | `POST /api/games/:id/finish` |
| Endpoint salvar | `POST /api/games/:id/save` → `{ name: string }` |
| Ranking | `GET /api/ranking/global?gameType=NUMBER_GUESS` |


## 🏆 Critério de Ranking

O ranking **Operação Resgate** ordena os astronautas por:

1. **Taxa de vitória** (`winRate`) — percentual de missões concluídas com sucesso
2. **Média ponderada de tentativas** — `mediana × 0,5 + média × 0,3 + moda × 0,2` (desempate)

| Estatística | Significado |
|---|---|
| 🎯 Mediana | Tentativas na missão do meio — robusta a missões atípicas |
| 📊 Média | Tentativas médias em todas as missões vencidas |
| 📐 Moda | Número de tentativas mais frequente nas vitórias |
| 🏅 Recorde | Menor número de tentativas em uma única missão |
| 📈 Taxa de Vitória | `vitórias / missões_finalizadas` |

> [!TIP]
> **Dica de elite:** No Cadete com 5 tentativas e range 1–10, a estratégia ótima é busca binária: tente 5, depois 2 ou 8, depois refine — garantindo vitória em qualquer número em até 4 tentativas.