# ===============================
# Builder
# ===============================
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package-lock.json сначала для кэширования npm install
COPY package.json package-lock.json ./

# Форсируем чистую установку пакетов и скачивание с npm registry
ENV NPM_CONFIG_CACHE=/tmp/.npm
ENV NPM_CONFIG_REGISTRY=https://registry.npmjs.org/

RUN npm ci --prefer-online --fetch-retries=5 --fetch-retry-mintimeout=20000 --no-audit --no-fund

# Копируем весь проект
COPY . .

# Генерация Prisma client
RUN npx prisma generate

# Аргументы окружения для сборки
ARG NEXT_PUBLIC_API_URL
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NOVA_POSHTA_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NOVA_POSHTA_KEY=$NOVA_POSHTA_KEY

# Сборка Next.js
RUN npm run build


# ===============================
# Runner
# ===============================
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Копируем только production зависимости
COPY package.json package-lock.json ./

# Чистая установка production пакетов
ENV NPM_CONFIG_CACHE=/tmp/.npm
ENV NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
RUN npm ci --omit=dev --prefer-online --fetch-retries=5 --fetch-retry-mintimeout=20000 --no-audit --no-fund

# Копируем build из builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start"]