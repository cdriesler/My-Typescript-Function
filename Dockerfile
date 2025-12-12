FROM node:22-slim AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json tsup.config.ts ./
COPY src ./src

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:22-slim AS runner

WORKDIR /app

RUN corepack enable

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

CMD ["node", "dist/main.mjs"]
