FROM node:18-alpine AS builder

WORKDIR /app

# важно: сначала lockfile
COPY package.json package-lock.json ./

# гарантируем чистую установку
RUN npm ci --no-audit --no-fund

COPY . .

RUN npx prisma generate

ARG NEXT_PUBLIC_API_URL
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NOVA_POSHTA_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NOVA_POSHTA_KEY=$NOVA_POSHTA_KEY

RUN npm run build


FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# только production зависимости
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start"]