<h1 align="center">⚙️ Hierarquia de Comandos
<br>
<img src="https://img.shields.io/badge/Modo-PRECEDENCE__PUZZLE-8b5cf6?style=for-the-badge&logo=settings&logoColor=white" height="28"/>
<img src="https://img.shields.io/badge/Jogadores-Solo-a78bfa?style=for-the-badge" height="28"/>
<img src="https://img.shields.io/badge/Precedência-∧_>_∨_>_→_>_↔-c4b5fd?style=for-the-badge" height="28"/>
</h1>

<p align="center">
  <img src="../img/hierarquia_de_comandos_acerto.png" width="720" alt="Hierarquia de Comandos"/>
</p>

<table align="center" width="760"><tr>
  <td align="center"><img src="../img/hierarquia_de_comandos_erro.png" width="370" alt="Erro"/></td>
  <td align="center"><img src="../img/hierarquia_de_comandos_fase_completa.png" width="370" alt="Fase completa"/></td>
</tr></table>

> [!NOTE]
> **Lore:** O computador da nave sofreu uma falha catastrófica e perdeu todos os parênteses das equações lógicas de navegação! O astronauta deve restaurar a ordem de precedência dos operadores — ou a nave ficará à deriva para sempre.


## 🎯 Objetivo

Modo **single-player**. Dada uma expressão lógica **sem parênteses**, insira os parênteses corretos que restauram a **precedência hierárquica dos operadores**. O sistema valida automaticamente se a parentização está correta.


## 📋 Regras

| Regra | Detalhe |
|---|---|
| 👤 Jogadores | 1 (Solo) |
| 📝 Questões | Determinado pela dificuldade |
| ⏱️ Timer por questão | Determinado pela dificuldade |
| 🖱️ Interação | Clique nos tokens para inserir parênteses |
| ✅ Verificação | Botão `verificar()` compara com `normalizar()` |
| 💡 Objetivo | Parentização equivalente à precedência padrão |


## 📐 Hierarquia de Precedência (do maior para o menor)

> [!IMPORTANT]
> Memorize esta ordem — ela é a base de todo o modo: **¬ > ∧ > ∨ > → > ↔**. Parênteses devem refletir exatamente essa precedência, agrupando os operadores de maior prioridade primeiro.

| Prioridade | Operador | Símbolo | Exemplo |
|---|---|---|---|
| 1º (maior) | Negação | `¬` | `¬P` avaliado primeiro |
| 2º | Conjunção | `∧` | `P ∧ Q` antes de ∨ |
| 3º | Disjunção | `∨` | `P ∨ Q` antes de → |
| 4º | Condicional | `→` | `P → Q` antes de ↔ |
| 5º (menor) | Bicondicional | `↔` | Último a ser avaliado |


## 📝 Exemplo de Exercício

```
Expressão original:  P ∧ Q ∨ R → S
Com parentização:   ((P ∧ Q) ∨ R) → S
```

> [!NOTE]
> A conjunção `∧` agrupa P e Q primeiro. O resultado é combinado com `∨ R`. Por último, o condicional `→ S` envolve toda a expressão.


## 🌍 Dificuldades

| Dificuldade | Patente | Questões | Operadores disponíveis | Timer/questão |
|---|---|---|---|---|
| 🌍 **Cadete** | Recruta | 8 | `∧ ∨` | 45s |
| 🚀 **Piloto** | Tenente | 10 | `∧ ∨ →` | 35s |
| 👨‍🚀 **Comandante** | Elite | 12 | `∧ ∨ → ↔` | 25s |


## 📊 Exemplos por Dificuldade

| Dificuldade | Expressão | Resposta esperada |
|---|---|---|
| 🌍 Cadete | `P ∧ Q ∨ R` | `(P ∧ Q) ∨ R` |
| 🌍 Cadete | `P ∨ Q ∧ R` | `P ∨ (Q ∧ R)` |
| 🚀 Piloto | `P ∧ Q ∨ R → S` | `((P ∧ Q) ∨ R) → S` |
| 🚀 Piloto | `P → Q ∧ R ∨ S` | `P → ((Q ∧ R) ∨ S)` |
| 👨‍🚀 Cmd | `P ∧ Q ↔ R ∨ S → T` | `(P ∧ Q) ↔ (R ∨ (S → T))` |


## 🖥️ Informações Técnicas

| Campo | Valor |
|---|---|
| Frontend `Modo` | `precedencia` |
| Backend `GameType` | `PRECEDENCE_PUZZLE` |
| Questões (Cadete) | `PARENTESES_CONFIG.EASY.count = 8` |
| Questões (Piloto) | `PARENTESES_CONFIG.MEDIUM.count = 10` |
| Questões (Cmd) | `PARENTESES_CONFIG.HARD.count = 12` |
| Timer (Cadete) | `TIMER_PRECEDENCIA.EASY = 45s` |
| Timer (Piloto) | `TIMER_PRECEDENCIA.MEDIUM = 35s` |
| Timer (Cmd) | `TIMER_PRECEDENCIA.HARD = 25s` |
| Validação | `verificar()` vs `normalizar()` — equivalência estrutural |

> [!WARNING]
> A validação compara a **estrutura** da parentização, não apenas o valor lógico final. Expressões semanticamente equivalentes mas com parênteses em posições diferentes serão consideradas **incorretas**.
| Endpoint criar jogo | `POST /api/games` → `{ gameType: "PRECEDENCE_PUZZLE" }` |
| Endpoint encerrar | `POST /api/games/:id/finish` → `{ won: boolean }` |
| Endpoint salvar | `POST /api/games/:id/save` → `{ name: string }` |
| Ranking | `GET /api/ranking/global?gameType=PRECEDENCE_PUZZLE` |


## 🏆 Critério de Ranking

O ranking **Hierarquia de Comandos** ordena por:

1. **Taxa de vitória** (`winRate`) — percentual de equações restauradas com sucesso
2. **Média ponderada de tentativas** — `mediana × 0,5 + média × 0,3 + moda × 0,2` (desempate)

| Estatística | Significado |
|---|---|
| 🎯 Mediana | Tentativas na partida do meio (robusta a outliers) |
| 📊 Média | Tentativas médias em todas as vitórias |
| 📐 Moda | Número de tentativas mais frequente nas vitórias |
| 🏅 Recorde | Menor número de tentativas em uma única vitória |
| 📈 Taxa de Vitória | `equações_restauradas / total_jogado` |

> [!TIP]
> **Dica de elite:** Comece sempre pelos `∧` (maior precedência). Agrupe-os em pares, depois os `∨`, e por último os `→` e `↔`. Seguindo essa ordem de dentro para fora, a parentização estará sempre correta.