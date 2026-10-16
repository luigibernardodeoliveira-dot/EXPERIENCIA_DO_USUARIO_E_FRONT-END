# Requisitos de UX e Metas de Usabilidade

<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/b23569f8-fb6d-4cdb-b82e-c4c8dbf6cb54" />


1. **Características da Plataforma**  
   
| Característica | Descrição |
| :---- | :---- |
| Descrição do Software | Aplicação Web Progressiva (PWA) "FEI Viagens", desenvolvida com abordagem *Mobile-First*. Otimizada para funcionar de forma fluida em navegadores de telemóveis (Android/iOS) e adaptável para acesso via desktop (Windows/macOS). |
| Descrição do Hardware | Telemóveis (Smartphones) com ecrã tátil, ligação à internet (Wi-Fi e redes móveis 4G/5G) e câmara fotográfica. Computadores portáteis e de secretária utilizados para o planeamento inicial em casa. |
| LISTA DE Capacidades da Plataforma (com explicação) | **1. Acesso Offline/Cache:** Permite consultar o roteiro e os endereços guardados no dispositivo mesmo sem ligação à internet durante a viagem.<br>**2. Integração com Câmara:** Leitura de faturas e recibos de supermercado ou restaurantes via tecnologia OCR.<br>**3. Notificações Push:** Alertas nativos no telemóvel para votações urgentes ou lembretes de pagamento.<br>**4. Área de Transferência:** Acesso para a função de "Copia e Cola" da chave Pix. |
| LISTA DE Restrições da Plataforma (com explicação) | **1. Espaço de Ecrã Limitado:** A interface mobile exige botões grandes (touch targets) e eliminação de excesso de texto para manter a clareza visual.<br>**2. Consumo de Bateria e Dados:** O uso constante na rua restringe o uso de animações pesadas.<br>**3. Dependência Externa para Pagamentos:** O sistema realiza o rateio e fornece a chave Pix, mas a transação final depende obrigatoriamente do redirecionamento para a app bancária do utilizador. |

2. **Princípios Gerais do Projeto**     

| Nome | Descrição | Link |
| :---- | :---- | :---- |
| Descrição do Contexto | O projeto "FEI Viagens" visa resolver a desorganização em viagens de grupo, centralizando o planeamento (sondagens, itinerários) e automatizando a divisão de despesas para evitar constrangimentos e perda de informações. | |
| Lei Geral de Proteção de Dados (LGPD) - Lei n.º 13.709/2018 | A LGPD é a legislação brasileira que regulamenta o tratamento de dados pessoais. É vital para o projeto porque estabelece regras rigorosas sobre como os dados dos utilizadores (nomes, informações financeiras de rateio) devem ser recolhidos e protegidos. | [https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) |
| Lei n.º 10.098/2000 - Lei da Acessibilidade | Esta lei estabelece normas para a promoção da acessibilidade. No projeto, define as diretrizes para tornar a interface da aplicação compreensível e utilizável por pessoas com diferentes níveis de literacia digital ou limitações físicas temporárias (ex: uso com uma só mão). | [https://www.planalto.gov.br/ccivil_03/leis/l10098.htm](https://www.planalto.gov.br/ccivil_03/leis/l10098.htm) |
| ABNT NBR ISO 9241 Ergonomia da interação humano-sistema | Normas brasileiras que orientam o design centrado no utilizador. Estabelecem os princípios ergonómicos e de usabilidade para garantir que os botões, contrastes e fluxos de ecrã correspondam às expectativas dos utilizadores em ambientes interativos. | [https://www.inf.ufsc.br/~edla.ramos/ine5624/_Walter/Normas/Parte%2011/iso9241-11F2.pdf](https://www.inf.ufsc.br/~edla.ramos/ine5624/_Walter/Normas/Parte%2011/iso9241-11F2.pdf) |
| Diretrizes de Acessibilidade para Conteúdo Web (WCAG) | Documento internacional do W3C que fornece recomendações detalhadas para tornar o conteúdo web e as aplicações móveis mais acessíveis (ex: tamanho legível de fontes, contraste de cores e navegação lógica). | [https://www.w3.org/WAI/standards-guidelines/wcag/](https://www.w3.org/WAI/standards-guidelines/wcag/) |

3. **Metas de Usabilidade**

   1. **Qualitativo**
      * **Eficácia:** O utilizador consegue criar uma viagem, adicionar amigos ao grupo, submeter despesas e calcular rateios sem cometer erros estruturais ou financeiros.
      * **Eficiência:** O tempo necessário para realizar tarefas recorrentes (como votar num restaurante ou copiar a chave Pix) deve ser minimizado a poucos cliques.
      * **Satisfação:** A interface deve proporcionar uma experiência tranquila e organizada, eliminando o stress e a poluição visual característicos de aplicações de mensagens (ex: WhatsApp).
      * **Facilidade de Aprendizagem:** A aplicação deve utilizar padrões de design reconhecíveis (modelos mentais padrão) para que os participantes práticos consigam navegar intuitivamente na primeira utilização.

   2. **Quantitativo**  
   
| Metas | Porcentagem | Justificativa |
| ----- | :---- | :---- |
| Facilidade de Aprendizagem | 30% | Como os participantes (ex: Persona Kauan) utilizam a aplicação apenas para funções pontuais, a curva de aprendizagem deve ser mínima para evitar o abandono. |
| Eficiência de Uso | 30% | Os utilizadores precisam de realizar consultas rápidas e diretas (ex: verificar a morada na rua) em menos de 5 a 10 segundos. |
| Prevenção e Recuperação de Erros | 20% | Crítico para o módulo financeiro. O sistema deve impedir que o organizador calcule despesas de forma incorreta, evitando prejuízos e discussões no grupo. |
| Satisfação do Utilizador | 19% | Uma interface visual limpa, atrativa e sem atritos incentiva o grupo a adotar a aplicação em viagens futuras. |
| Acessibilidade Básica | 1% | Implementação do nível mínimo inicial de contraste, legibilidade de texto e tamanhos de botões exigidos na versão académica do protótipo. |
| **Total** | **100%** | Distribuição do foco das heurísticas durante a fase de prototipagem e testes. |
