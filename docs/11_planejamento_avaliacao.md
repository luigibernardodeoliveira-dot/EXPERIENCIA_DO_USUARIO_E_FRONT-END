# Planejamento da Avaliação de Usabilidade

### 1) Planejamento de Usabilidade (método DECIDE)

| Letra | Significado e Aplicação no Projeto |
| :---: | :---- |
| **D** | **Determinar os objetivos:** Avaliar a usabilidade, a clareza da navegação e a eficiência do protótipo de alta fidelidade do aplicativo **FEI Viagens** (versões Mobile e Desktop). O foco é validar se o usuário consegue realizar os fluxos principais (criar viagem, votar em roteiros, registrar gastos/divisão e confirmar pagamento via Pix) de forma autônoma e sem frustrações. |
| **E** | **Explorar perguntas a serem respondidas:** <br>1. O usuário compreende imediatamente como criar uma nova viagem e convidar pessoas?<br>2. A divisão de despesas deixa claro o valor individual de cada membro?<br>3. Os atalhos de "Enquete" e "Despesas" no Chat são fáceis de encontrar e utilizar?<br>4. O fluxo de quitação com "Copia e Cola" e o botão "Já fiz o Pix!" transmitem segurança? |
| **C** | **Escolher (Choose) os métodos de avaliação:** Serão adotados dois métodos complementares: a **Avaliação Heurística** (inspeção da interface pelos avaliadores com base nas 10 Heurísticas de Nielsen) e o **Teste de Usabilidade** (observação prática de usuários reais executando tarefas guiadas no protótipo interativo do Figma). |
| **I** | **Identificar questões práticas:** <br>• **Participantes:** 3 a 5 usuários-alvo (jovens/universitários que costumam viajar em grupo).<br>• **Equipamentos:** Testes realizados presencialmente ou via conferência (Teams/Discord) com compartilhamento de tela, acessando o link do Figma.<br>• **Tarefas:** Roteiro com 5 tarefas essenciais mapeadas na etapa de fluxo do usuário. |
| **D** | **Decidir como lidar com as questões éticas:** Aplicação do **Termo de Consentimento Livre e Esclarecido (TCLE)** antes de iniciar. Deixar claro ao participante que o teste avalia o *sistema*, e não as suas habilidades, garantindo o anonimato dos dados coletados. |
| **E** | **Avaliar (Evaluate) e apresentar os dados:** A análise e produção dos resultados precisam considerar vários aspectos, como a taxa de conclusão das tarefas (sucesso, sucesso com ajuda ou falha), o tempo médio gasto, os cliques errados, comentários verbais e a gravidade dos problemas encontrados. Esses dados guiarão as correções na interface antes do desenvolvimento Front-End. |

---

### 2) Lista de Instrumentos

#### 1) Termo de Consentimento Livre e Esclarecido (TCLE)

> **TERMO DE CONSENTIMENTO PARA TESTE DE USABILIDADE**
> 
> Você está sendo convidado(a) a participar da avaliação do protótipo **FEI Viagens**, um projeto acadêmico de Experiência do Usuário. 
> 
> **Objetivo:** Avaliar a interface do sistema. Ressaltamos que **estamos testando o aplicativo, não você**. Não há respostas corretas ou incorretas.
> **Procedimentos:** Solicitaremos que você execute algumas tarefas no protótipo enquanto observamos sua navegação. 
> **Privacidade:** Sua identidade será mantida em sigilo e os dados servirão apenas para melhoria do projeto na disciplina. A participação é voluntária e você pode encerrar o teste a qualquer momento.
> 
> [ ] Li, compreendi e concordo em participar do teste.
> 
> Nome: __________________________________________________  Data: ___/___/2026

#### 2) Questionários

**A) Questionário Pré-Teste (Perfil)**
1. Qual a sua faixa etária? ( ) 18-24 ( ) 25-34 ( ) 35+
2. Com qual frequência você viaja em grupo? ( ) Raramente ( ) 1x ao ano ( ) Várias vezes ao ano
3. Qual a sua maior dificuldade ao viajar em grupo hoje? ( ) Dividir contas ( ) Decidir os passeios ( ) Comunicação

**B) Questionário Pós-Teste (Satisfação - Escala 1 a 5, onde 1=Muito Difícil e 5=Muito Fácil)**
1. Como você avalia a facilidade para criar uma viagem e convidar amigos? `[1] [2] [3] [4] [5]`
2. A tela de divisão de despesas e visualização de saldos foi clara? `[1] [2] [3] [4] [5]`
3. Como foi a experiência de confirmar um pagamento via Pix pelo sistema? `[1] [2] [3] [4] [5]`
4. Pergunta aberta: O que você mais gostou na interface e o que mudaria?

#### 3) Tabela de Observação

*A ser preenchida pelos avaliadores durante o teste com os usuários:*

| ID | Tarefa Solicitada | Sucesso? (S / Não / Ajuda) | Tempo | Qtd. Cliques Errados | Observações (Comportamento/Dúvidas) |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **T1** | Criar conta, fazer login e criar a viagem "Praia 2026". | | | | |
| **T2** | Acessar o Roteiro e votar no restaurante da enquete. | | | | |
| **T3** | Abrir o Chat e usar o atalho para cadastrar Nova Despesa. | | | | |
| **T4** | Lançar despesa de R$ 150 e confirmar divisão igualitária. | | | | |
| **T5** | Ver Saldo Pendente, copiar Pix e confirmar pagamento. | | | | |

#### 4) Formulário de Avaliação Heurística

*A ser preenchido pelos desenvolvedores inspecionando o protótipo (Figma) sem o usuário final, utilizando a Escala de Severidade de Nielsen (0 = Não é problema a 4 = Catástrofe de usabilidade).*

| Heurística (Nielsen) | Tela ou Fluxo | Problema Encontrado | Severidade (0-4) | Recomendação de Correção |
| :--- | :--- | :--- | :---: | :--- |
| 1. Visibilidade do Status | | | | |
| 2. Compatibilidade | | | | |
| 3. Controle e Liberdade | | | | |
| 4. Consistência e Padrões| | | | |
| 5. Prevenção de Erros | | | | |
| 6. Reconhecimento | | | | |
| 7. Eficiência de Uso | | | | |
| 8. Design Minimalista | | | | |
| 9. Recuperação de Erros | | | | |
| 10. Ajuda e Documentação| | | | |
