FROM node:20-alpine AS base
WORKDIR /app

# Etapa 1: Instalar dependencias
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
# Usar npm install sin errores de peer-deps si ocurre
RUN npm install --legacy-peer-deps

# Etapa 2: Desarrollo (Hot Reload)
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Etapa 3: Construcción
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa 4: Producción
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app ./
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
