# 🌲 Cypress, do Zero à Nuvem ☁️

👋 Seja bem-vindo(a)!

É muito bom tê-lo(a) aqui. Tenho certeza que você vai amar esse curso. ❤️

## O que você vai aprender?

- Como configurar um projeto Cypress do zero
- Como visitar páginas locais e remotas
- Como lidar com os elementos mais comuns encontrados em aplicações web
- Como testar upload de arquivos
- Como realizar as mais diversas verificações de resultados esperados
- Como criar comandos customizados
- Como lidar com links que abrem em outra aba do navegador
- Como rodar testes simulando as dimensões de um dispositivo móvel
- Como resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents)
- Como criar uma documentação mínima para seu projeto de testes automatizados
- Como executar os testes em um _workflow_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes)
- Como integrar seu _workflow_ de integração contínua com o Cypress Cloud (o serviço de gestão de testes do Cypress na nuvem).

## Vamos começar?

Vá para a seção [estrutura do curso](./lessons/_course-structure_.md)

## Execução local

Pré-requisitos: Node.js 20 ou superior e npm.

```bash
npm install
npm start
```

Em outro terminal, abra o Cypress ou execute os testes em modo headless:

```bash
npm run cy:open
npm test
npm run test:mobile
```

O servidor local disponibiliza a aplicação em `http://localhost:8080`. O workflow do GitHub Actions executa a mesma suíte a cada `push` ou _pull request_.

Para gravar resultados no Cypress Cloud, configure `projectId` no `cypress.config.js` e a variável secreta `CYPRESS_RECORD_KEY`, então execute `npm run test:cloud`.

___

## Autoria

Esta versão e as implementações dos exercícios foram realizadas por **Everaldo BArros**.

O projeto original e o conteúdo do curso são de autoria de [Walmyr Lima e Silva Filho](https://walmyr.dev/), da [Escola Talking About Testing](https://talkingabouttesting.com/). O repositório original está disponível em [wlsf82/cypress-do-zero-a-nuvem](https://github.com/wlsf82/cypress-do-zero-a-nuvem).