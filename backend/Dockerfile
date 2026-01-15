# Backend Dockerfile
FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@10.17.1 --activate
WORKDIR /app

# --- Dependencies Stage ---
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
# We need all deps (including devDeps) to build and generate prisma
RUN pnpm install --frozen-lockfile

# --- Build Stage ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 1. Generate Prisma (it will go to /app/generated/prisma based on your schema)
RUN pnpm exec prisma generate

# 2. Build TypeScript
RUN pnpm run build

# --- Production Stage ---
FROM node:24-alpine AS runner
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.17.1 --activate
ENV NODE_ENV=production

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Install ONLY production dependencies
RUN pnpm install --prod --frozen-lockfile

# COPY the generated Prisma client from the builder stage
# This matches your "output = ../generated/prisma" setting
COPY --from=builder /app/generated /app/generated

# Copy the built JS files
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Note: No need to 'generate' again here because we copied the folder
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && node dist/index.js"]