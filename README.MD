# Como usar 

1) Primeiro clone o projeto `git clone git@gitlab.com:maxscalla/esqueleto-api-typeorm.git`;
2) Depois remova o arquivo .git `rm -rf .git`;
3) E agora é so começar a fazer seu projeto com base  no esqueleto;

## ATENÇÃO

Esse é o esqueleto (layout base) para as próximas APIs da maxscalla, lembre-se de alterar os dados de conexão **(em ambiente de desenvolvimento usar um banco de dados local)**.

Lembre-se também que se você tentar usar uma porta ja usada no servidor vai dar erro, então fique de olho nisso.

## Configurações necessárias

Server.ts
.env

- Use o .env.example apenas como base para criar o .env separadamente no ambiente de produção

## Build

```
yarn build
```

## Rodar banco de dados

### Desenvolvimento(TS)

```
yarn start:dev
```

### Produção(JS)

```
yarn start
```

## Criar nova migration

```
yarn typeorm migration:create ./src/database/migrations/<nome-da-migration>
```

## Rodar as migrations

```
yarn typeorm migration:run -- -d ./src/database/
```
