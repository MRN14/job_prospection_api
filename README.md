# Job Prospection API

The job prospection api is a REST API that helps you track your job pr internship prospection.

## Instructions

### Github

#### Clone git repository

```bash
git clone https://github.com/MRN14/job_prospection_api.git
```

#### Update git repository

```bash
git pull
```

### Docker

#### Start docker

```bash
docker compose up --build
```

This will :

- build two containers
- download all the dependencies
- start api on port 3000
- generate fake datas

#### Stop docker

```bash
docker compose down -v
```

This will :

- stop api
- remove containers and all dependencies downloaded

#### Troubleshouting

If you get this error :

```bash
Unable to connect to the database: ConnectionRefusedError [SequelizeConnectionRefusedError]: connect ECONNREFUSED 172.18.0.2:3306
    at ConnectionManager.connect (/var/www/node_modules/sequelize/lib/dialects/mysql/connection-manager.js:92:17)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async ConnectionManager._connect (/var/www/node_modules/sequelize/lib/dialects/abstract/connection-manager.js:222:24)
    at async /var/www/node_modules/sequelize/lib/dialects/abstract/connection-manager.js:174:32 {
  parent: Error: connect ECONNREFUSED 172.18.0.2:3306
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16) {
    errno: -111,
    code: 'ECONNREFUSED',
    syscall: 'connect',
    address: '172.18.0.2',
    port: 3306,
    fatal: true
  },
  original: Error: connect ECONNREFUSED 172.18.0.2:3306
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16) {
    errno: -111,
    code: 'ECONNREFUSED',
    syscall: 'connect',
    address: '172.18.0.2',
    port: 3306,
    fatal: true
  }
}
```

restart  job_prospection_api-web-1 container with :

```bash
 docker restart job_prospection_api-web-1
 ```

## API

**API base url** = <http://localhost:3000>

### Authentification

POST `/login`

```json
{
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
    },
    body: {
        "email" : <value>,
        "pasword" : <value>
    }
}
```

response :

```json
{ 
  "status" : `Connected successfully!`,
  "token" : <value>
}
```

error :

```json
{
    "error" : [<error>]
}
```

POST `/register`

request :

```json
{
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
    },
    body: {
        "fistName" : <value>,
        "lastName" : <value>,
        "email" : <value>,
        "pasword" : <value>
    }
}
```

response :

```json
{ "status" : `User n°${user.id} created successfully!` }
```

error :

```json
{
    "error" : [<error>]
}
```

GET `/logout`

```json
{
    method: "GET",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    }
}
```

response :

```json
{
    "status" : "Disconnected successfully !"
}
```

error :

```json
{
    "error" : [<error>]
}
```

### Sheet

GET `/sheet/:name` # get sheet's details

```json
{
    method: "GET",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    }
}
```

POST `/sheet` # create a new sheet

request :

```json
{
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    },
    body : {
        "name" : <value>
    }
}
```

PUT `/sheet/:name` # update sheet  

request :

```json
{
    method: "PUT",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    },
    body : {
        "name" : <value>
    }
}
```

DELETE `/sheet/:name` # delete sheet

request :

```json
{
    method: "DELETE",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    }
}
```

### Job

GET `/job/:name/:id` # get job's details

request :

```json
{
    method: "GET",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    }
}
```

response :

```json
{
    "job": <string>,
    "company": <string>,
    "place": <string>,
    "status": <value>,
    "source": <string>,
    "contact": <string>,
    "dispatchDate": <date>,
    "note": <text>,
    "opinion": <integer>
}
```

POST `/job` # create a new job offer

request :

```json
{
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    }
    body: {
        "job": <string>,
        "company": <string>,
        "place": <string>,
        "status": <value>,
        "source": <string>,
        "contact": <string>,
        "dispatchDate": <date>,
        "note": <text>,
        "opinion": <integer>
    }
}
```

PUT `/job/:id`

```json
{
    method: "PUT",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    }
    body: {
        "job": <string>,
        "company": <string>,
        "place": <string>,
        "status": <value>,
        "source": <string>,
        "contact": <string>,
        "dispatchDate": <date>,
        "note": <text>,
        "opinion": <integer>
    }
}
```

DELETE  `/job/:id` # delete a job offer

```json
{
    method: "DELETE",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
    }
}
```

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
- [ ] define data models

Marine :

- [x] routes
- [ ] CRUD
- [ ] add fake datas

Jérémy:

- [ ] routes login & register
- [ ] auth middleware
- [ ] token verification middleware
