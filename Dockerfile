FROM node:18-alpine AS base

# 1. 의존성 설치
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 2. 소스 복사 및 빌드
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 업로드 폴더 생성
RUN mkdir -p ./public/uploads

# 빌드
RUN npm run build

# 3. 프로덕션 환경 구성
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 필요한 폴더 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 업로드 폴더가 없으면 생성
RUN mkdir -p ./public/uploads

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 