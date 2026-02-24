# Job

## Create job

> **![POST](../assets/post.svg) /job/:sheetName**
>
> Create a new job

**request:**

```json
method: "POST"
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
},
body: {
    "job": "full stack",
    "companyName": "Quel Bon Plan",
    "status" : "application sent",
    "opinion" : 2,
    "source": "https://exemple.com",
    "dispatchDate" : "2027-11-01",
    "contact" : "+33 6 21 65 36 23"
}
```

> - Only the name is required  
> - Status must match one of this strings:  
>   - `'application sent'` `'first interview'` `'refused'` `'no response'`
> - Opinion must be a valid integer between `0` and `5`
> - Source must be a valid url matching this regex :
>   - `/https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi`
> - Dispach date must be a valid date in the format `YYYY-DD-DD`
> - Contact must be a valid email or phone number matching one of this regex :
>   - `/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g`
>   - `/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm`
>
> Other inputs as no restrictions  
> Feel free to our regex to make sure users request will always succeed

**responses:**

```json
status: 201
{
    "message": "job succesfully created"
}
```

```json
status: 400
{
    "message": "error message"
}
```

## Get job infos

> **![GET](../assets/get.svg) /job/:sheetName/:jobId**
>
> Get job details

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
    "id": 2,
    "job": "full stack",
    "companyName": "Quel Bon Plan",
    "place": null,
    "status": "application sent",
    "source": "https://exemple.com",
    "contact": "+33 06 21 65 36 23",
    "dispatchDate": "2027-11-01T00:00:00.000Z",
    "note": null,
    "opinion": 2,
    "sheetId": 2
}
```

```json
status: 400
{
    "message": "error message"
}
```

## Update job

> **![PUT](../assets/put.svg) /job/:sheetName/:jobId**
>
> Udpate sheet's name

```json
method: "PUT"
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
},
body : {
    "job": "full stack",
    "companyName": "Quel Bon Plan",
    "status" : "application sent",
    "opinion" : 2,
    "source": "https://exemple.com",
    "dispatchDate" : "2027-11-01",
    "contact" : "+33 06 21 65 36 23"
}
```

> Same rules apply for create and update a job

**responses:**

```json
status: 200,
{
    "message": "job succesfully updated"
}
```

```json
status: 400,
{
    "message": "error message"
}
```

## Delete sheet

> **![DELETE](../assets/delete.svg) /job/:sheetName/:jobId**
>
> Delete job

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
