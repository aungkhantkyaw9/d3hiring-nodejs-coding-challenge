# d3hiring NodeJS Coding Challenge

## Pre-requisites

  - Node version 16.17.1 or later
  - npm is required to run the server
  - implemented using Node.JS and MySQL

<br/>

## Libraries and Framework used in this project

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Sequelize](https://sequelize.org/docs/v6/getting-started/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)

<br/>

## Project Setup

Clone repository from `https://github.com/aungkhantkyaw9/d3hiring-nodejs-coding-challenge.git`

Then, run following:

```bash
> npm install
```

If `npm install` encounters conflicting peerDependencies, use following command

```bash
> npm install --legacy-peer-deps
```

When installation finished, open project and create `.env` file under `root` directory. Then copy data from `.env-local` file and paste paste to `.env` file

Before starting server, create database named `university` in local mysql. Note that if you can't use `sequelize` command, install it as global package. <br/><br/>

```bash
> npm install -g sequelize-cli
```

After finished, run following commands

```bash
> sequelize db:migrate
```

<br/>

When finished, start the server using `npm start` . Then you can access API by browsing to http://localhost:4000 <br/><br/>

## Unit Test

Run `npm test` for unit testing. Overall code coverage is 88%