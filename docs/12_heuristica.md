# 12. Avaliação Heurística de Usabilidade

## 1) Avaliação de IHC através de inspeção HEURÍSTICA 

> **_NOTE:_**: SOMENTE VIOLAÇÕES. As tabelas abaixo apresentam os problemas identificados no protótipo do sistema **FEI Viagens**, separados por cada membro da equipe avaliadora.

### Avaliador 1 (Foco: Cadastro, Login e Painel de Viagens)

| ID | Heurística Violada | Tela do Sistema | Descrição do Problema | Severidade | Sugestão de Correção | Print da Tela |
| :---: | :--- | :--- | :--- | :---: | :--- | :--- |
| **V1.1** | **1. Visibilidade do status** | Tela de Login | Ao clicar em "Confirmar", não há indicador de carregamento (spinner), deixando dúvida se o app travou. | **2** | Adicionar um ícone de "carregando" no botão após o clique. | `<img width="1063" height="785" alt="image" src="https://github.com/user-attachments/assets/1c0f26f3-7341-4627-b264-6bce4fc16151" />
` |
| **V1.2** | **5. Prevenção de erros** | Tela de Cadastro | Não há validação em tempo real se o e-mail digitado já existe antes de o usuário clicar em Confirmar. | **3** | Validar o campo de e-mail ao perder o foco (onblur) e exibir alerta. | `<img width="1063" height="785" alt="image" src="https://github.com/user-attachments/assets/1799a754-1943-4bf2-b256-a223703d10b0" />
` |
| **V1.3** | **8. Minimalismo** | Painel de Viagens | Os cards de viagem na versão Desktop contêm descrições textuais muito longas, poluindo a grade. | **1** | Limitar o texto a 2 linhas e adicionar reticências (...). | `<img width="1063" height="747" alt="image" src="https://github.com/user-attachments/assets/5580743d-2e77-4a27-a2ab-3d52964dee7c" />
` |
| **V1.4** | **9. Recuperação de erros** | Criar Viagem | Se o usuário esquece de preencher o Destino, o erro exibe "Campo 1 nulo" em vez de uma mensagem clara. | **3** | Mudar para: "Por favor, preencha o destino da viagem". | `<img width="1063" height="760" alt="image" src="https://github.com/user-attachments/assets/c256b8c8-3d63-4768-9c57-61a39c5c4004" />
` |

### Avaliador 2 (Foco: Chat, Enquetes e Roteiro)

| ID | Heurística Violada | Tela do Sistema | Descrição do Problema | Severidade | Sugestão de Correção | Print da Tela |
| :---: | :--- | :--- | :--- | :---: | :--- | :--- |
| **V2.1** | **3. Controle e liberdade** | Aba Roteiro (Enquete) | Após clicar em "Confirmar Voto" em um restaurante, o usuário não consegue desfazer ou alterar o voto. | **3** | Incluir um botão "Mudar Voto" abaixo dos resultados da enquete. | `[Print aqui]` |
| **V2.2** | **4. Consistência e padrões** | Chat da Viagem | O ícone de enviar mensagem é uma "setinha" diferente do padrão universal de "avião de papel". | **1** | Trocar o ícone para o avião de papel padrão de mercado. | `[Print aqui]` |
| **V2.3** | **6. Reconhecimento** | Aba Roteiro | O cronograma não destaca qual é o dia atual, obrigando o usuário a lembrar que dia é hoje para se localizar. | **2** | Destacar o card do dia de hoje com uma cor diferente ou tag "Hoje". | `[Print aqui]` |
| **V2.4** | **7. Eficiência de uso** | Chat (Atalhos) | Os atalhos de "Nova Enquete" exigem 3 cliques para serem abertos por dentro do chat. | **2** | Colocar um atalho fixo na barra de digitação. | `[Print aqui]` |

### Avaliador 3 (Foco: Financeiro, Rateio e Pix)

| ID | Heurística Violada | Tela do Sistema | Descrição do Problema | Severidade | Sugestão de Correção | Print da Tela |
| :---: | :--- | :--- | :--- | :---: | :--- | :--- |
| **V3.1** | **2. Compatibilidade** | Nova Despesa | O botão de escanear nota fiscal usa o termo técnico "OCR", desconhecido por usuários comuns. | **2** | Alterar para "Ler Recibo" acompanhado de ícone de câmera. | `[Print aqui]` |
| **V3.2** | **5. Prevenção de erros** | Pagamento Pix | O botão "Já fiz o Pix" fica ativo mesmo antes do usuário clicar em "Copiar Chave", permitindo falsas confirmações. | **3** | Desabilitar o botão de confirmação até que a chave seja copiada. | `[Print aqui]` |
| **V3.3** | **10. Ajuda e Documentação** | Aba Financeiro | Não fica claro como o aplicativo lida com despesas que não devem ser divididas igualmente (ex: alguém que não bebeu). | **3** | Incluir um ícone de ajuda `(?)` explicando a opção de rateio manual. | `[Print aqui]` |

---

## 2) INDICAÇÃO DE BOAS PRÁTICAS DE HEURÍSTICA - HEURÍSTICAS NÃO VIOLADAS

> **_NOTE:_**: 1 exemplo do sistema FEI Viagens onde a heurística FOI ATENDIDA (Boas práticas apontadas por cada avaliador).

### Boas Práticas - Avaliador 1
1. **Visibilidade do status:** Quando o usuário clica em "Copiar Chave Pix", o botão muda para "Copiado!" por 3 segundos.
2. **Compatibilidade:** Uso dos termos comuns como "Minhas Viagens" e "Roteiro" em vez de jargões técnicos.
3. **Controle e liberdade:** O formulário de "Nova Viagem" possui um botão claro de "Cancelar" que descarta o rascunho.
4. **Consistência e padrões:** As cores do sistema respeitam os padrões (Verde para sucesso/salvar, Vermelho para exclusão).
5. **Prevenção de erros:** A senha no cadastro exige digitação dupla (Confirmar Senha) para evitar erros de digitação.
6. **Reconhecimento:** A tela "Bem-vindo de volta" já traz o e-mail preenchido do último acesso.
7. **Flexibilidade:** O usuário pode navegar entre as abas deslizando a tela (swipe) ou clicando no menu inferior.
8. **Minimalismo:** A tela inicial foca 100% no botão primário "Nova Viagem", sem elementos que desviem a atenção.
9. **Recuperação de erros:** Se o usuário errar a senha no login, o sistema sugere o botão de redefinição de senha.
10. **Ajuda e documentação:** A tela inicial possui um ícone "Ajuda?" no canto inferior direito para acesso rápido ao suporte.

### Boas Práticas - Avaliador 2
1. **Visibilidade do status:** Ao votar na enquete, as barras de porcentagem preenchem na hora, indicando que o voto computou.
2. **Compatibilidade:** O chat utiliza o formato de "balões" verdes e cinzas, padrão em aplicativos de mensagens.
3. **Controle e liberdade:** Dentro do fluxo de "Nova Despesa", há um botão de voltar `<` no topo superior esquerdo em todas as telas.
4. **Consistência e padrões:** Os menus inferiores estão na mesma ordem no Mobile (Home, Roteiro, Chat, Financeiro).
5. **Prevenção de erros:** Ao tentar excluir uma viagem, um modal de confirmação pergunta "Tem certeza que deseja apagar a viagem?".
6. **Reconhecimento:** O Chat exibe o avatar e o nome da pessoa em cima de cada mensagem, sem precisar clicar no perfil.
7. **Flexibilidade:** A criação de despesas tem atalhos diretos dentro da tela do Chat para os usuários mais experientes.
8. **Minimalismo:** O cronograma do Roteiro não usa linhas de grade, apenas horários claros e títulos das atividades.
9. **Recuperação de erros:** Se a internet cair ao enviar mensagem, aparece um ícone vermelho indicando falha no envio.
10. **Ajuda e documentação:** Balões flutuantes (tooltips) aparecem na primeira vez que o usuário abre a Aba Roteiro explicando como criar enquetes.

### Boas Práticas - Avaliador 3
1. **Visibilidade do status:** O saldo total da viagem fica sempre fixo no topo da Aba Financeira e atualiza na hora.
2. **Compatibilidade:** O ícone de adicionar despesa é um cifrão `$`, universalmente compreendido.
3. **Controle e liberdade:** Se a câmera do recibo falhar, o usuário tem a liberdade de digitar os valores da nota manualmente.
4. **Consistência e padrões:** O formato de data (DD/MM/AAAA) e moeda (R$) é padronizado em todo o sistema.
5. **Prevenção de erros:** O sistema impede que uma despesa seja salva com valor zerado.
6. **Reconhecimento:** A tela "Meus Saldos" mostra a foto do participante para quem a dívida deve ser paga.
7. **Flexibilidade:** O usuário pode escolher dividir a conta "Igualmente" ou editar o valor de cada pessoa manualmente.
8. **Minimalismo:** A tela de pagamento exibe apenas o valor devido e a chave Pix, focando apenas na conversão.
9. **Recuperação de erros:** Se o usuário digitar um e-mail inválido no convite, a caixa fica vermelha e avisa antes do envio.
10. **Ajuda e documentação:** A tela de divisão de contas possui uma legenda breve explicando que todos do grupo entrarão no rateio.
