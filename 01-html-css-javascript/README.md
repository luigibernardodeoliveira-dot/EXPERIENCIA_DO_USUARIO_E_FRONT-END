# FEI Viagens — HTML, CSS e JavaScript

Esta é a primeira versão funcional do projeto. Ela foi feita com HTML, CSS e JavaScript puro, sem bibliotecas ou frameworks.

## Como abrir

Abra esta pasta no VS Code e use a extensão Live Server no arquivo `index.html`. Outra opção é executar um servidor local na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador.

## Fluxo principal

A primeira tela apresenta as opções de criar conta e fazer login. O cadastro pede nome, e-mail, telefone, senha, confirmação da senha e aceite dos termos. Ao concluir o cadastro, o usuário entra em Minhas viagens. O login usa os dados cadastrados no mesmo navegador.

Após entrar, é possível criar viagens, copiar convite, usar o chat, votar no roteiro, consultar o financeiro, cadastrar despesas com divisão igual ou personalizada e confirmar a despesa.

Os dados são armazenados apenas no `localStorage` do navegador, na chave `fei-viagens-html-css-js-v2`. Para testar o cadastro novamente, limpe os dados do site no navegador.
