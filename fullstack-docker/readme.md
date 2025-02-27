An example of Full Stack Web application App, with these technologies:
Next.js 14
Node.js
Express
Prisma
Docker
Docker Compose

## Build and up services

```
docker compose -p "nextjs_expressjs_postgres" up -d db

docker compose -p "nextjs_expressjs_postgres" build
docker compose -p "nextjs_expressjs_postgres" up -d backend

docker compose -p "nextjs_expressjs_postgres" build
docker compose -p "nextjs_expressjs_postgres" up -d frontend
```

## Access into backend container and migrate prisma

```
docker exec -it nextjs_backend npx prisma migrate dev --name init
```

## Access into "db" container with user "postgres"

```
docker exec -it db psql -U postgres

then run commands to verify:
\l: list databases
\dt: list tables
```

## Prisma | init

```bash
npx prisma init
```

## Prisma | Generate models

```bash
npx prisma generate
```

## Prisma | Run studio

```
npx prisma studio
```
