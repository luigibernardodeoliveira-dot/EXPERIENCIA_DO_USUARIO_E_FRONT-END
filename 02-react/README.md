# FEI Viagens — React

Esta é a segunda versão do projeto. Ela mantém o mesmo visual e os mesmos fluxos da versão em HTML, CSS e JavaScript, mas organiza a interface em componentes React e usa estados para atualizar a tela.

## Como executar

Com Node.js instalado, abra esta pasta no terminal e execute:

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite. Para gerar os arquivos finais, execute:

```bash
npm run build
```

Os arquivos compilados ficarão na pasta `dist`. A versão React deve ser aberta por um servidor local; não abra o `index.html` com duplo clique.

## Fluxo principal

A aplicação inicia na tela de boas-vindas, com os caminhos Criar conta e Fazer login. O cadastro valida nome, e-mail, telefone, senha, confirmação e termos de uso. Quando o cadastro é concluído, a pessoa é direcionada para Minhas viagens. O login usa a conta cadastrada no mesmo navegador.

Depois do acesso, a aplicação permite criar viagens, copiar convite, conversar no chat, votar em enquetes do roteiro, consultar despesas e registrar uma nova despesa com divisão igual ou personalizada.

Os dados são guardados no `localStorage` do navegador, na chave `fei-viagens-react-v2`. Para reiniciar a demonstração, limpe os dados do site nas configurações do navegador.

## Organização

`src/App.jsx` centraliza os dados e a navegação. A pasta `src/components` contém as telas e partes reutilizáveis da interface. `src/data.js` tem os dados iniciais, `src/utils.js` reúne cálculos de valores e rotas, e `src/styles.css` contém o visual responsivo.
