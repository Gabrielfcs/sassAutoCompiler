![Magazord Sass Auto Compiler logo](assets/img/logo-magazord-sass-auto-compiler.png)

Isto é pequeno guia de utilização do auto compiler, que utiliza do interpretador de código JavaScript "Node.js" para automatizar as funções do sistema.

## Introdução

Criado para compilar todos os clientes do magazord, o Sass Auto Compiler foi desenvolvido com a intenção de otimizar a forma como compilamos todos os arquivos sass e ganhar mais tempo para fazer outras coisas. Assim, não precisamos mais perder tempo executando os comandos um por um nos clientes, e podemos prosseguir com outras atividades!

## Princípios 

O Sass Auto Compiler é baseado no iterpretador de código Javascript  [Node.js](https://nodejs.org/en/) que é o principal responsavel pela compilação e disponibilização dos dados no navegador acompanhado pelo [Sass](https://sass-lang.com/) que cria as folhas de estilo da página e permite uma melhor visualização dos dados apresentados.

## Instalação

Primeiro, se faz necessária a execução do comando a seguir no [console](https://en.wikipedia.org/wiki/System_console):

```bash
> npm install
```
este código é o responsável pela instalação de todas as dependências utilizadas no sistema.

## Como executar?

### é simples!
depois de executar o comando acima, tudo o que você precisa fazer é executar outro comando novamente no [console](https://en.wikipedia.org/wiki/System_console):

```bash
> node app.js 
```
## Em caso de atualizações do fonte.
Para fazer o "[Watch](#watch)" do compilador: 

```bash
> nodemon compiler 
```

### BOM TRABALHO!! O Sass Auto Compiler ja esta funcionando!

## Dicionário
#### Watch: 
- É um Live Reload da página quando o arquivo fonte em edição for salvo, ou seja, assim que o arquivo for salvo a página é recarregada.

## Referências

Este compilador foi baseado nos seguintes conteúdos:
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/pt-br/)
- [jQuery](https://jquery.com/)
- [Sass](https://sass-lang.com/)
- [Nodemon](https://nodemon.io/)
- [console](https://en.wikipedia.org/wiki/System_console)

