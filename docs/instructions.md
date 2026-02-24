# Intructions

## Github

### Clone git repository

```bash
git clone https://github.com/MRN14/job_prospection_api.git
```

### Update git repository

```bash
git pull
```

## .env

The .env file is already filled. You just need to remove the extensions `.dev`.

## Docker

### Start docker

```bash
docker compose up --build
```

This will :

- build two containers
- download all the dependencies
- start api on port 3000
- generate fake datas

### Stop docker

```bash
docker compose down -v
```

This will :

- stop api
- remove containers and all dependencies downloaded
