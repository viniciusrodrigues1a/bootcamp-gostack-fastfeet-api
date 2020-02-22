<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">FastFeet</h3>

<p align="center"> Desafio do terceiro módulo do <a href="https://rocketseat.com.br/bootcamp">Bootcamp GoStack</a> <br> 
</p>

## 📝 Índice

- [Sobre](#about)
- [Primeiros passos](#getting_started)
- [Rotas](#routes)
- [Feito com](#built_using)
- [Licença](#license)

## 🧐 Sobre <a name = "about"></a>

App para uma transportadora fictícia, o FastFeet.

## 🏁 Primeiros passos <a name = "getting_started"></a>

Estas instruçōes te darão uma cópia funcional do projeto na sua máquina local para desenvolvimento e testes.
### Pré-requisitos

Instalar as dependências

```sh
yarn install
```

### Instalação

Configurar a conexão com o banco de dados em src/config/database.js

```js
module.exports = {
  dialect: 'postgres', // veja https://sequelize.org/v5/manual/dialects.html para mais informações sobre dialects
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
```

Rodando a aplicação:

```js
yarn dev
```

## :truck: Rotas <a name = "routes"></a>

| MÉTODO        | ROTA                                     | BODY       | FUNÇÃO                                             |
| ------------- | ---------------------------------------- | ---------- | -------------------------------------------------- |
| POST          | /sessions                                | JSON       | Cria um token JWT                                  |
| <br />        |                                          |            |                                                    |
| GET           | /deliverymen/:id                         | -          | Mostra informações de um entregador                |
| PUT           | /deliverymen/:id                         | JSON       | Atualiza informações de um entregador              |
| DELETE        | /deliverymen/:id                         | -          | Deleta um entregador                               |
| GET           | /deliverymen/:id/deliveries              | -          | Mostra as deliveries disponíveis para um entregador|
| GET           | /deliverymen                             | -          | Mostra informações de todos entregadores           |
| POST          | /deliverymen                             | JSON       | Cadastra um entregador                             |
| <br />        |                                          |            |                                                    |
| GET           | /recipients/:id                          | -          | Mostra informações de um destinatário              |
| PUT           | /recipients/:id                          | JSON       | Atualiza informações de um destinatário            |
| DELETE        | /recipients/:id                          | -          | Deleta um destinatário                             |
| GET           | /recipients                              | -          | Mostra informações de todos destinatários          |
| POST          | /recipients                              | JSON       | Cadastra um destinatário                           |
| <br />        |                                          |            |                                                    |
| GET           | /deliveries/:id                          | -          | Mostra informações de uma entrega                  |
| PUT           | /deliveries/:id                          | JSON       | Atualiza informações de uma entrega                |
| DELETE        | /deliveries/:id                          | -          | Delete uma entrega                                 |
| GET           | /deliveries                              | -          | Mostra informações de todas entregas               |
| POST          | /deliveries                              | JSON       | Cadastra uma entrega                               |
| PUT           | /deliveries/start-delivery/:id           | JSON       | Faz a retirada de uma entrega                      |
| PUT           | /deliveries/finish-delivery/:id          | JSON       | Finaliza uma entrega                               |
| <br />        |                                          |            |                                                    |
| GET           | /deliveries/problems/:id                 | -          | Mostra informações de um problema da entrega       |
| PUT           | /deliveries/problems/:id                 | JSON       | Atualiza informações de um problema da entrega     |
| DELETE        | /deliveries/problems/:id                 | -          | Deleta um problema de uma entrega                  |
| GET           | /deliveries/problems/                    | -          | Mostra todas os problemas de uma entrega           |
| POST          | /deliveries/problems/                    | JSON       | Cadastra um problema na entrega                    |
| POST          | /deliveries/problems/:id/cancel-delivery | -          | Cancela uma entrega                                |
| <br />        |                                          |            |                                                    |
| POST          | /files                                   | MULTI-PART | Faz upload de um arquivo                           |

## ⛏️ Feito com <a name = "built_using"></a>

- [PostgresSQL](https://www.postgresql.org/) - Database
- [Sequelize](https://sequelize.org/) - ORM
- [Express](https://expressjs.com/) - Server Framework
- [NodeJS](https://nodejs.org/en/) - Server Environment
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Nodemailer](https://nodemailer.com/about/)
- [Bee-queue](https://github.com/bee-queue/bee-queue)
- [Multer](https://github.com/expressjs/multer)

## :memo: Licença <a name = "license"></a>

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
