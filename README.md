<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

This project is developed by [AliDeWeb](https://github.com/AliDeWeb) based on [NestJs](https://github.com/nestjs/nest) framework.
This project is open source and under [MIT licensed](LICENSE).
Enjoy using ❤

## Installation

1. install the latest version of nodeJs (LTS).
2. install the latest version of mongodb community server and mongodb compass.
3. clone the project on your local system.
4. create a `.env` file in root folder and set the `Environment Variables`.
5. follow `Running the app` steps.
6. to access API document, open `http://localhost:3000/docs` on your browser.

## Environment Variables

```env
<!-- Just Use [ 'local' || 'dev' || 'production' ] -->
NODE_ENV={{Set Node Env}}

DATABASE={{Database Url}}

JWT_SECRET={{JWT Secret Code}}
JWT_EXPIRES_IN={{JWT Expire Time}}

<!-- To Access Swagger API Document -->
SWAGGER_USER={{Set A Username}}
SWAGGER_PASSWORD={{Set A Password}}
```

## Running the app

```bash
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
