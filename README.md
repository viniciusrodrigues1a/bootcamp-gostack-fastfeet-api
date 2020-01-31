<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">FastFeet</h3>

<p align="center"> Projeto desenvolvido no bootcamp GoStack da <a href="https://github.com/RocketSeat">Rocketseat</a>
    <br> 
</p>

## 📝 Índice

- [Sobre](#about)
- [Primeiros passos](#getting_started)
- [Feito com](#built_using)

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

## ⛏️ Feito com <a name = "built_using"></a>

- [PostgresSQL](https://www.postgresql.org/) - Database
- [Sequelize](https://sequelize.org/) - ORM
- [Express](https://expressjs.com/) - Server Framework
- [NodeJS](https://nodejs.org/en/) - Server Environment
- [JsonWebToken](https://jwt.io/)
