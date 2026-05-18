FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/admin-web/package.json apps/admin-web/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm install

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build -w apps/admin-web

FROM nginx:1.27-alpine AS runner
COPY --from=build /app/apps/admin-web/dist /usr/share/nginx/html
COPY nginx/frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
