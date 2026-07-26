# --- Build stage ---
FROM node:22-slim AS build
WORKDIR /app

# better-sqlite3 (chat Elon) compile un binding natif au build
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++     && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime stage ---
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["node", "server.js"]
