# In-place rebuilder: frontend source + Astro + a tiny trigger server.
# Shares the `frontend` volume (read-write) with Caddy and rebuilds the static
# site against the live API when the admin clicks "Publish".
FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY astro.config.mjs tsconfig.json tailwind.config.ts postcss.config.js components.json ./
COPY src/ src/
COPY public/ public/
COPY builder/server.mjs ./builder/server.mjs

EXPOSE 9000
CMD ["node", "builder/server.mjs"]
