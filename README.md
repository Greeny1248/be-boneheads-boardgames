```
__________                         .__                         .___
\______   \  ____    ____    ____  |  |__    ____  _____     __| _/  ______
 |    |  _/ /  _ \  /    \ _/ __ \ |  |  \ _/ __ \ \__  \   / __ |  /  ___/
 |    |   \(  <_> )|   |  \\  ___/ |   Y  \\  ___/  / __ \_/ /_/ |  \___ \
 |______  / \____/ |___|  / \___  >|___|  / \___  >(____  /\____ | /____  >
        \/              \/      \/      \/      \/      \/      \/      \/

                                          =||=
                         o   |\ ,'`. /||\ ,'`. /|    o
 _   _   _   |\__      /\^/\ | `'`'`' || `'`'`' |  /\^/\   |\__     _   _   _
| |_| |_| | /   o\__  |  /  ) \      /  \      /  |  /  ) /   o\__ | |_| |_| |
 \       / |    ___=' | /  /   |    |    |    |   | /  / |    ___=' \       /
  |     |  |    \      Y  /    |    |    |    |    Y  /  |    \      |     |
  |     |   \    \     |  |    |    |    |    |    |  |   \    \     |     |
  |     |    >    \    |  |    |    |    |    |    |  |    >    \    |     |
 /       \  /      \  /    \  /      \  /      \  /    \  /      \  /       \
|_________||________||______||________||________||______||________||_________|
            __________                  __                        .___
            \______   \_____     ____  |  | __  ____    ____    __| _/
            |    |  _/\__  \  _/ ___\ |  |/ /_/ __ \  /    \  / __ |
            |    |   \ / __ \_\  \___ |    < \  ___/ |   |  \/ /_/ |
            |______  /(____  / \___  >|__|_ \ \___  >|___|  /\____ |
                   \/      \/      \/      \/     \/      \/      \/
__________                             .___
\______   \  ____  _____   _______   __| _/   ____  _____     _____    ____    ______
 |    |  _/ /  _ \ \__  \  \_  __ \ / __ |   / ___\ \__  \   /     \ _/ __ \  /  ___/
 |    |   \(  <_> ) / __ \_ |  | \// /_/ |  / /_/  > / __ \_|  Y Y  \\  ___/  \___ \
 |______  / \____/ (____  / |__|   \____ |  \___  / (____  /|__|_|  / \___  >/____  >
        \/              \/              \/ /_____/       \/       \/      \/      \/
```

# Boneheads brilliant back-end boardgame Server...

## Summary

Hello, and thank you for visiting my back-end boardgame server.
By using different endpoints it is possible to: get, patch, post and delete existing data from my board games database. Checkout the Endpoints section below to try it yourself!

I created this as part of my Northcoders bootcamp backend project.

Link to the hosted version of my server, feel free to have a play: https://backend-boardgame-server.onrender.com

## 1: How-to: Clone

1: Fork the repo from: https://github.com/Greeny1248/be-ncgames

2: Copy code HTTPS URL from clone window:

3: Using your terminal navigate to where you would like to clone:

```
cd /home/repos
```

Type the following to clone:

```
git clone <URL-HERE>
```

Then if you want to open the repo:

```
cd /be-ncgames
code .
```

The above will clone and open the repo in vs code:

## 2: How-to: Install Dependencies

### All dependencies should install via using:

```
run npm install
```

Only follow the below if required. (Skip to 3:Seed Local Databases otherwise)

### DotEnv:

> Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
> https://www.npmjs.com/package/dotenv

```
npm install dotenv --save
```

### Express:

> Fast, unopinionated, minimalist web framework for Node.js.
> https://www.npmjs.com/package/express

```
npm install express
```

### Node-postgres(pg):

> Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.
> https://www.npmjs.com/package/pg

```
npm install pg
```

### Node-pg-format:

> Node.js implementation of PostgreSQL format() to safely create dynamic SQL queries. SQL identifiers and literals are escaped to help prevent SQL injection
> https://www.npmjs.com/package/pg-format

```
npm install pg-format
```

### Supertest:

> The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.
> https://www.npmjs.com/package/supertest

```
npm install supertest --save
```

### Install Dev Dependencies:

Do this by adding a -dev before name i.e

```
npm install -dev jest
```

    Dependencies List
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "pg": "^8.7.3",
    "pg-format": "^1.0.4",
    "supertest": "^6.3.3"
    Dev Dependencies
    "husky": "^8.0.2",
    "jest": "^27.5.1",
    "jest-extended": "^2.0.0",
    "jest-sorted": "^1.0.14"

## 3: How-to: Seed Local Databases

To create and seed local databases run the following `npm setup-dbs` then `npm run seed`

## 4: How-to: Run Tests

By running the command `npm test` you will run test files.

## 5: How-to Add ENV files to access databases

You will need to create two .env files for your project: .`env.test` and `.env.development`. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see /db/setup.sql for the database names).

## 6: Usable Endpoints

### GET

/api
/api/categories
/api/reviews
/api/reviews/:review_id
/api/reviews/:review_id/comments

### PATCH

/api/reviews/:review_id

### POST

/api/reviews/review_id/comments

### DELETE

/api/comments/:comment_id

## Minimum Versions

Ensure the following are used as a minimum

```
"Node.js": v19.1.0
"PostgreSQL": v14.6
```
