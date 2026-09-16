# Cenário de Análise/Problema

### 1) Cenário de Análise/Problema

Maria Clara e seus amigos decidem passar um feriado prolongado na praia. Ela toma a iniciativa e cria o grupo de WhatsApp "Feriadão". No primeiro dia, o clima é de empolgação. Maria Clara passa horas pesquisando casas e manda três opções de links no grupo. No entanto, as mensagens logo se perdem no meio de memes e figurinhas. Parte do grupo opina, outros visualizam e não respondem. Com medo de perder a data, Maria Clara decide fechar a casa por conta própria e passa o valor total no seu cartão de crédito. Ela manda uma mensagem no grupo avisando o valor que cada um deve transferir via Pix. Uma semana se passa, a viagem está chegando, e dois amigos ainda não pagaram porque "não viram a mensagem" no meio de tanta conversa. Maria Clara se sente extremamente constrangida de ter que ir no privado de cada um cobrar a dívida, ficando frustrada antes mesmo da viagem começar.

### 2) Questões de Refinamento

- A falta de pagamento dos amigos acontece por má intenção ou porque as informações financeiras realmente se perdem no chat?
- Como são controlados os gastos que surgem durante a viagem (ex: compras de supermercado e combustível)?
- A Maria Clara já tentou usar alguma outra ferramenta além do WhatsApp para organizar essa viagem?
- Por que os amigos ignoram os links de pesquisa de hospedagem que ela envia?

### 3) Refinamento do Cenário de Análise/Problema

Nas últimas viagens do grupo, o padrão de desorganização se manteve. O problema da falta de pagamento não ocorre por má fé, mas porque o histórico do WhatsApp fica tão poluído que informações vitais desaparecem em poucas horas. Para tentar resolver, Maria Clara já tentou criar planilhas de Excel, mas percebeu que perfis mais práticos (como seu amigo Kauan) têm preguiça de abrir e ler planilhas pelo celular. Como consequência, ela acaba centralizando todas as despesas no próprio cartão e sofre com o peso emocional e o constrangimento de ter que cobrar amigos íntimos individualmente. A ausência de um local fixo e claro para o controle das dívidas transforma o que deveria ser um momento de lazer em um grande estresse financeiro e gerencial para ela.

### 4) Contexto de Uso

- Maria Clara organiza a viagem usando seu smartphone, geralmente em momentos de pausa (intervalos da faculdade ou do estágio), dependendo de conexões 4G ou Wi-Fi.
- Contexto social: A viagem ocorre entre um grupo de amigos próximos (sem hierarquia). Isso torna a cobrança financeira um "tabu", pois ela não quer parecer mesquinha ou chata.
- O problema da perda de informações se agrava durante a viagem em si, onde o ambiente é dinâmico (na rua, na praia) e exige cálculos rápidos de divisão de contas no supermercado ou no restaurante.
- Os demais participantes costumam silenciar o grupo de WhatsApp devido ao alto volume de mensagens não relacionadas à organização.

### 5) Jornada do Usuário (atual, sem solução) — Maria Clara

| Etapa | O que acontece | Estado emocional |
| :---- | :---- | :---- |
| 1. Iniciativa e pesquisa | Maria Clara cria o grupo no WhatsApp e pesquisa opções de hospedagem. | Empolgada |
| 2. Envio de opções | Ela envia os links no grupo para votação, mas a conversa desvia de assunto. | Ansiosa |
| 3. Fechamento da reserva | Com medo de perder o local, ela assume a responsabilidade e paga no próprio cartão. | Tensa / Preocupada |
| 4. Informa a dívida | Manda a chave Pix e o valor exato no grupo de WhatsApp. | Aliviada (temporariamente) |
| 5. Silêncio e esquecimento | Dias passam e algumas pessoas não pagam pois a mensagem se perdeu no chat. | Frustrada |
| 6. Cobrança individual | Maria Clara precisa mandar mensagem no privado cobrando os amigos. | Constrangida / Exausta |

```mermaid
journey
    title Jornada atual de Maria Clara (sem solução)
    section Planejamento
      Cria grupo e pesquisa locais: 8: Maria Clara
      Envia links e tenta organizar votação: 5: Maria Clara
    section Comprometimento Financeiro
      Paga a reserva no próprio cartão: 4: Maria Clara
      Informa o valor do Pix no grupo: 6: Maria Clara
    section Estresse e Cobrança
      Amigos não pagam (mensagem perdida): 3: Maria Clara
      Cobra no privado passando constrangimento: 1: Maria Clara
