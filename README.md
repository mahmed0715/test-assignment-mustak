
# Product inventory app

Goal of the assignment is to create a minimalistic product inventory system.
This repository contains a stub of the application with the same tech stack
that our real application is built with:

* [Docker](https://www.docker.com/)
* [Postgres SQL database](https://www.postgresql.org/)
* [Hasura GraphQL server](https://hasura.io/)
* [Typescript](https://www.typescriptlang.org/)
* [React](https://react.dev/)
* [Apollo GraphQL client](https://www.apollographql.com/docs/react/)
* [Ant Design UI library](https://ant.design/)

## Tasks

Please complete all of the following:

1. List available products, their stock and prices
1. Calculate total value of all products in the inventory
1. Create a form to add new product to inventory

## Run the application

```sh
# install dependencies
npm i

# start frontend server
npm start

# start postgres & hasura
docker compose up
```


Then open http://localhost:3000/ in your browser.

Hasura serves a grapql endpoint with schema auto generated from Postgres schema. It is available at http://localhost:8080/v1/graphql. Frontend should interact with the database only through this endpoint.

Hasura console is available at http://localhost:8080/console.

To add migrations for new database tables, you would have to run Hasura console locally using [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/overview/).# test-assignment-mustak


# Instruction to run the application from Mustak, Local hasura
- Get the repo, on main branch
- Run `yarn install` on root
- Install hasura-cli globally > `yarn global add hasusa-cli`
- Run `docker compose up`, this will run our database and hasura engine connected to it
- After all the servcies run, on another terminal run 
  `hasura migrate apply --admin-secret=myadminsecretkey` select `db` if cli asks for selection
  `hasura metadata apply --admin-secret=myadminsecretkey`
- run > `yarn start`
- In browser you will get project running on http://localhost:3000/ 
- Add new products and see the list afterwards
- The product list show products added in database,
- The total product count and the sum of the stock are showin above the list with a Add Product button
- No tests added

# For hasura cloud
Please switch to branch `hasura-cloud` in this repo, that branch has react integration with hasura cloud instead of local hasura engine setup in case you have issue with setting up local hasura.
