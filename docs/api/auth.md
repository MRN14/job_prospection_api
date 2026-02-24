# Auth

## Register

> **![POST](../assets/post.svg) /auth/register**
>
> Create a new user

**request:**

```json
method: "POST",
headers: {
    "Content-Type": "application/json"
},
body:
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "P@ss0rd!"
    }
```

> **Password must match this constrains:**  
> `minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1`  
> Validation is actually deactivated

**responses:**

```json
status: 201
{
    "message": "User created successfully!"
}
```

```json
status: 400
{
    "message": "error message"
}
```

## Login

> **![POST](../assets/post.svg) /auth/login**
>
> Login

**request:**

```json
method: "POST",
headers: {
    "Content-Type": "application/json"
},
body:
    {
        "email": "john.doe@example.com",
        "password": "P@ss0rd!"
    }
```

**responses:**

```json
status: 200
{
    "status": "Connected successfully!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc3MTkyMjA4OCwiZXhwIjoxNzcxOTI1Njg4fQ.e2hUeI0CcOaZ3NUSDOJgyZoqOO-uBENUc04F3ZNxVCk"
}
```

```json
status: 400
{
    "message": "error message"
}
```

## Logout

> **![GET](../assets/get.svg) /auth/logout**
>
> Logout

**request:**

```json
method: "GET",
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc3MTQxMzk2NSwiZXhwIjoxNzcxNDE3NTY1fQ.dnBwCCsk9ojeGv1yXv2-UaJfuqqdx6sKmNi4_CI8tyE"
},
````

**responses:**

```json
status: 200
{
    "message": "Disconnected successfully !"
}
```

```json
status: 401
{
    "error": "error message"
}
```
