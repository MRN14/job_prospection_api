# job_prospection_api

The job prospection api is a REST API that helps you track your job pr internship prospection.

## Instructions

```bash
docker compose up --build
```

```bash
docker compose down -v
```

## endpoints

POST /login body: { email, password} returns token
POST /register body: { lastname, firstname, email, password }

GET  /sheet/:name (return sheet’s details)
POST /sheet (create a new sheet) body : {name}
PUT /sheet/:name (update sheet’s name) body : {name}
DELETE /sheet/:name (delete sheet)

return exemple
{
columns : {
 [ column_name, column_type ],
 [ column_name, column_type ],
 [ column_name, column_type ],
 }
values : {
[ value 1, value2, value3 ],
[ value 1, value2, value3 ],
[ value 1, value2, value3 ],
}
}

GET /joboffer/:sheetName/:id (return row details)

return
{
STRING “name” : “value”,
STRING “job” : “value”,
DATE    “createdAt”: “value”,
STRING “source”: “value”,
STRING “contact”: “value”,
TEXT    “notes”:  “value”,
STRING “status”: ”value”,
STRING “place”: ”value”
INTEGER “notice”: “value”,
STRING          “companyName”: “value”
}

POST /joboffer (create a new job offer) body : {column, column, …}
PUT /joboffer/:id (update job offer’s details) body : {column, column, …}
DELETE  /joboffer/:id (delete a job offer)

## Features

Authentification
Création de compte et login. Email de vérification ? (Nodemailer)
Cryptage des mots de passe : bcrypt
tokens : jsonwebtoken

CRUD feuille
CRUD job
fixtures

Vérification du token sur CRUD

NodeJS
server : express
database : MySQL
ORM : Prisma
security : bcrypt, jwt, env

## Tasks

Initiation:
[ ] create express server
[ ] initiate prisma
[ ] define data models

Marine :
[ ] CRUD
[ ] CRUD routes
[ ] add fake datas

Jérémy:
[ ] routes login & register
[ ] auth middleware
[ ] token verification middleware
