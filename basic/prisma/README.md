## Learn:

03:15 Setup Prisma
06:09 Schema fundamentals
10:09 Create database
12:38 Prisma Studio
14:13 Prisma Client singleton
16:50 findMany, findUnique
22:18 npx prisma db push
25:38 @unique, @map, @index
28:53 where, Ordering, Select
33:42 POST / PUT / DELETE
42:03 Relations (one-to-many)
43:54 Many-to-many
44:27 One-to-one
46:50 include & connect (relations queries)
49:12 Seeding database
51:10 Prisma types
1:04:32 Migrations
1:06:15 npx prisma migrate
1:08:18 postinstall (prisma generate)
1:08:42 Push to Vercel
1:10:19 Serverless vs Edge
1:10:59 Middleware (edge)
1:13:07 Prisma Pulse

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Prisma

#### Install

```
npm i prisma -D
```

#### Init

```
npx prisma init
```

#### Generate prisma client

prisma client on each OS is different. Therefore, re-run the "generate" command when deploying to
docker, vercel, ...

```
npx prisma generate
```

#### Create db / Update db and prisma client

Run the following cmd to crearte db, tables / update db, tables / prisma client when changing the schema

```
npx prisma db push
```

#### Migrate

```
npx prisma migrate dev --[name]
```

#### push vs migrate

Refer: https://www.prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema

#### Init singleton instance prisma client

Refer: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution

#### Run studio

```
npx prisma studio
```

#### Seed db

Refer: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#integrated-seeding-with-prisma-migrate

```
npx prisma db seed
```

#### Postgres in docker

image: postgres:13.3-alpine
container: nextjs_school_dashboard
port: 5432
user: lamadev
pwd: lama123456
db name: school
DATABASE_URL="postgresql://lamadev:lama123456@localhost:5432/school"
