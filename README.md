# 2209-wns-lovelace-wild-ticket

## Getting started

### Run server in dev mode

Docker and Docker Compose are required on host system.

```
./build-start.dev.sh
```

## Run Integration testing with test-database (back-end)

Use this command in the root of the project, when the server is running.

```
docker compose -f docker-compose.dev.yml exec back-end npm run test:watch
```
## Update the library on the client side (web-app)

When modifying the schema on the backend side, use the following command to update the library on the client side.

```
graphql-codegen --config codegen.ts
```
## Stack technique

### Back-end

Node.js: 
https://nodejs.org/fr/

Apollo:
https://www.apollographql.com/

GraphQL:
https://graphql.org/

TypeGraphQL
https://typegraphql.com/

TypeORM: 
https://typeorm.io/

PostgreSQL: 
https://www.postgresql.org/

### Front-end

React: 
https://fr.reactjs.org/

## Author

[Estelle](https://github.com/Estelle9)

[Vincent](https://github.com/vincentDubresson)

[Anthony](https://github.com/Anthony-AGTN)

## School

[Wild Code School](https://github.com/WildCodeSchool)