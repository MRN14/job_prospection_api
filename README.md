# Job Prospection API

The job prospection api is a REST API that helps you track your job pr internship prospection.

## Instructions

[Instructions](./docs/instructions.md)

## API Doc

[API DOC](./docs/api.md)

## Middlewares

### AuthMiddleware

AuthMiddleware allows, during user login, verification that they are properly logged in via the verifyToken function.

We use them like this:

```bash
app.use('/route',Router, AuthMiddleware)
```

## Features

#### Authentification

Register, login and logout  
Email verification ? (nodemailer)  
password crypt (bcrypt)  
token handling (jsonwebtoken)  

#### CRUD

CRUD sheet  
CRUD job  
fake datas  

#### Technos

NodeJS.
server : express  
database : MySQL  
ORM : sequelize  
security : bcrypt, jwt, env

## Tasks

Initiation:

- [x] create express server
- [x] database connection
- [x] define data models

Marine :

- [x] routes
- [x] CRUD
- [x] add fake datas

Jérémy:

- [x] routes login & register
- [x] auth middleware
- [x] token verification middleware
