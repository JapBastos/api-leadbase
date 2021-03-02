# API - Desafio Técnico

### Montar um projeto em Node.js, com a função de fazer Autenticação e autorização de usuários.

#### O processo se dá onde um usuário pode enviar seu CPF e uma senha para a API e realizar login na plataforma, recebendo assim um token de acesso contendo seus dados, sua role e suas permissões, feito login, existem dois casos:

1. Se o usuário administrador ele pode usar seu token para acessar uma rota para remover uma permissão (enviando o nome dessa permissão) ou adicionar uma permissão (enviando o nome dessa permissão).
2. Se o usuário for vendedor não terá acesso a nenhuma rota.

## Tecnologias

Este projeto foi desenvolvido como um desafio técnico, com as seguintes tecnologias:

- [Node.js][nodejs]
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [Docker](https://www.docker.com/docker-community)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [BcryptJS](https://www.npmjs.com/package/bcrypt)
- [VS Code][vc] com [ESLint][vceslint], [EditorConfig][vceditconfig] e [Prettier][vcprettier]

## Como Usar

Para clonar e rodar esta aplicação, você vai precisar de [Git](https://git-scm.com), [Node.js v14.15][nodejs] ou superior + [Yarn v1.22][yarn] ou superior instalados em seu computador.
Do seu terminal, execute:

```bash
# Clonar este repositório
$ git clone https://github.com/JapBastos/api-auth-test

# Entrar no repositório
$ cd api-auth-test

# Instalar as dependências
$ yarn

# Iniciar o servidor de desenvolvimento
$ yarn dev:server
```

Para desenvolvimento fui utilizada uma base de dados em
[PostgreSQL](https://www.postgresql.org/) utilizando uma
imagem [Docker](https://www.docker.com/docker-community),
também foi utilizado o [DBeaver](https://dbeaver.io/) para
observar os dados e o [Postman](https://www.postman.com/)
para testar as requisições.

Feitor por [João Bastos](https://www.linkedin.com/in/japbastos/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
