FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/api-server/package.json apps/api-server/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm install

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build -w apps/api-server

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api-server/dist ./apps/api-server/dist
COPY --from=build /app/prisma ./prisma
COPY apps/api-server/package.json ./apps/api-server/package.json
EXPOSE 3000
CMD ["node", "apps/api-server/dist/main.js"]
