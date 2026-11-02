# Estágio 1: dependências
FROM node:22-bookworm-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


# Estágio 2: build
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"

RUN npm run build


# Estágio 3: produção
FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
