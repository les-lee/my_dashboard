# Development

## Prerequisites

- Node.js 22+
- Docker Desktop or Docker Engine
- MySQL 8 and Redis 7, or `docker compose up mysql redis`

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

Seed account:

- Username: `admin`
- Password: `Admin@123456`

## Database

```bash
npm exec prisma migrate dev -- --schema prisma/schema.prisma
npm exec prisma db seed -w apps/api-server
```

## Docker

```bash
docker compose up --build
```
