# Sheet

## Create sheet

> **![POST](../assets/post.svg) /sheet**
>
> Create a new sheet

**request:**

```json
method: "POST"
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
},
body: {
    "name":"Job été 2026"
}
```

**responses:**

```json
status: 201
{
    "message": "sheet created"
}
```

```json
status: 400
{
    "message": "error message"
}
```

## Get all sheets

> **![GET](../assets/get.svg) /sheet**
>
> Get all sheets for a user

**request:**

```json
method: "GET"
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
}
```

**responses:**

```json
status: 200,
{
    "sheets": [
        {
            "id": 1,
            "name": "Job été 2026",
            "createdAt": "2026-02-24T08:48:39.000Z",
            "updatedAt": "2026-02-24T08:48:39.000Z"
        }
    ]
}
```

## Get sheet infos

> **![GET](../assets/get.svg) /sheet/:name**
>
> Get sheet details for a user

**request:**

```json
method: "GET"
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
}
```

**responses:**

```json
status: 200,
{
  "sheet": {
    "id": 1,
    "name": "Job été 2026",
    "createdAt": "2026-02-24T08:48:39.000Z",
    "updatedAt": "2026-02-24T08:48:39.000Z",
    "Jobs": [
      {
        "id": 1,
        "job": "full stack",
        "companyName": "Quel Bon Plan",
        "place": null,
        "status": "application sent",
        "source": "https://exemple.com",
        "contact": "+33 06 21 65 36 23",
        "dispatchDate": "2027-11-01T00:00:00.000Z",
        "note": null,
        "opinion": 2,
        "sheetId": 1,
        "createdAt": "2026-02-24T08:53:44.000Z",
        "updatedAt": "2026-02-24T08:53:44.000Z"
      }
    ]
  }
}
```

```json
status: 400
{
    "message": "error message"
}
```

## Update sheet

> **![PUT](../assets/put.svg) /sheet/:name**
>
> Udpate sheet's name

**request:**

```json
method: "PUT"
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
},
body : {
    "name":"Job été 2027"
}
```

**responses:**

```json
status: 200,
{
    "message": "sheet updated"
}
```

```json
status: 400,
{
    "message": "error message"
}
```

## Delete sheet

> **![DELETE](../assets/delete.svg) /sheet/:name**
>
> Delete sheet

**request:**

```json
method: "DELETE"
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
}
```

**responses:**

```json
status: 200,
{
  "message": "sheet deleted successfully !"
}
```

```json
status: 400,
{
    "message": "error message"
}
```
