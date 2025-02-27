## Video

https://www.youtube.com/watch?v=rJ62a7YNZ4Q

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

## For development

Create 2 files: docker-compose-dev.yml and Dockerfile.dev

```
docker compose -f docker-compose-dev.yml up -d --build
```

## For production

docker-compose up -f docker-compose-dev.yml -d --build --build-arg NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="my-stripe-key"
docker compose up -f
