# ---- Stage 1: Build the frontend ----
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install
COPY index.html vite.config.ts tsconfig*.json tailwind.config.ts postcss.config.js components.json ./
COPY src/ src/
COPY public/ public/
RUN npm run build

# ---- Stage 2: Production API server ----
FROM node:20-alpine AS api
WORKDIR /app

COPY server/package.json ./
RUN npm install --omit=dev

COPY server/ ./

# Copy built frontend so it can be served by Caddy via a shared volume
# (We'll extract it in docker-compose via a named volume)
COPY --from=frontend-build /app/dist /app/dist

EXPOSE 3001

CMD ["node", "index.js"]
