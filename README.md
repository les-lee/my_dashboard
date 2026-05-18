# Fullstack Admin System

Enterprise-style admin system scaffold based on `.agent/PLANS.md`.

## Stack

- Frontend: React, Vite, TypeScript, Ant Design, React Router, Zustand, Axios
- Backend: NestJS, TypeScript, Prisma, MySQL, JWT, Redis
- DevOps: Docker Compose, Nginx, GitHub Actions

## Quick Start

```bash
cp .env.example .env
npm install
docker compose up -d mysql redis
npm exec prisma migrate dev -- --schema prisma/schema.prisma
npm exec prisma db seed -w apps/api-server
npm run dev
```

Default account:

- Username: `admin`
- Password: `Admin@123456`

## Scripts

- `npm run dev`: start frontend and backend
- `npm run build`: build all workspaces
- `npm run lint`: lint all workspaces
- `npm run typecheck`: run TypeScript checks
- `docker compose up --build`: run the production-style stack
