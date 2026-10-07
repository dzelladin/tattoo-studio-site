# Obsidian Ink — production image (Next.js standalone server on port 3000)

# 1) Install dependencies exactly as pinned in package-lock.json
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# 2) Build the site (prerenders every page for mk / en / al)
FROM node:22-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3) Small runtime image: only the standalone server + assets
FROM node:22-slim AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# Journal posts are read from disk by src/lib/posts.ts
COPY --from=build --chown=node:node /app/content ./content
# Writable by the non-root user: the booking inbox (used when RESEND_API_KEY
# is not set) and Next's image-optimizer cache
RUN mkdir -p .bookings .next/cache && chown node:node .bookings .next/cache
USER node
EXPOSE 3000
CMD ["node", "server.js"]
