# 2209-wns-lovelace-wild-ticket

## Getting started

### Create .env file

```
cp back-end/.env.example back-end/.env
```

and fill it with your own values.

### Mailjet

For using Mailjet, you need to create an account on https://www.mailjet.com/ and get your own API keys.

You need to create some transactionnal templates :

1. Go to https://app.mailjet.com/templates/transactional. For each template :
2. Click on "Create a new template" button
3. Choose "By coding it in HTML"
4. Click on "Import HTML from file" button
5. Choose a name for the template (ex: R'Ticket Delivered Template)
6. Import the html file located in the back-end/email-templates folder of this repository
7. Copy the Template ID that appears on the top of the next page, and paste it in your .env file.
8. Click on "Save & Publish" button
9. Enter a Subject and a Name (Mandatory but not used in our project) and save your template
10. Click a second time on "Save & Publish" button
11. Don't forget to put your email address in the .env file (MJ_AVAILABLE_EMAIL)

### Run server in dev mode

Docker and Docker Compose are required on host system.

```
./build-start.dev.sh
```

## Development mode

### Back-end tests

When you develop some tests with Jest, and have some underlines problems with VsCode :

1. Build your app
2. Go to back-end > tsconfig.ts
3. Comment these lines

```
"exclude": ["**/*.test.ts", "**/*.spec.ts"]
```

4. Do your job nicely.
5. If you have to rebuild Docker during tests or if your test development is done, just uncomment those lines before.

## Run Integration testing with test-database (back-end)

Use this command in the root of the project, when the server is running.

```
docker compose -f docker-compose.dev.yml exec back-end npm run test:watch
```

If you have some errors with tests that are running from 'js' files :

1. Stop Docker
2. Delete the 'dist' folder in the back-end folder
3. Restart Docker
4. Re-run the tests.

## Run Web-app's Integration testing (web-app)

Use this command in the root of the project, when the server is running.

```
docker compose -f docker-compose.dev.yml exec web-app npm run test
```

## Update the library on the client side (web-app)

When modifying the schema on the backend side, use the following command to update the library on the client side.

```
npm run gql-codegen
```

## Running the mobile-app

Expo installation on computer.

1. Follow the link: https://docs.expo.dev/get-started/installation/

Expo installation on devices.

1. Follow the link: https://expo.dev/client

Starting the development server:

1. Navigate to the project directory

```
cd mobile-app
```

2. Run the server

```
npx expo start
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

### Mobile-app

React native:
https://reactnative.dev/

Expo:
https://expo.dev/

## Author

[Estelle](https://github.com/Estelle9)

[Vincent](https://github.com/vincentDubresson)

[Anthony](https://github.com/Anthony-AGTN)

## School

[Wild Code School](https://github.com/WildCodeSchool)
