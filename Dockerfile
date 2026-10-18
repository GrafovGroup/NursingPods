FROM node:24-bookworm-slim AS build
WORKDIR /app
RUN npm install --global pnpm@11.25.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://nursingpods.ca
ARG NEXT_PUBLIC_BUSINESS_PHONE=+18336969996
ARG NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY="(833) 696-9996"
ARG NEXT_PUBLIC_PHONE_VERIFIED=false
ARG NEXT_PUBLIC_BUSINESS_EMAIL=""
ARG NEXT_PUBLIC_EMAIL_VERIFIED=false
ARG NEXT_PUBLIC_LEGAL_NAME=""
ARG NEXT_PUBLIC_PRIVACY_EMAIL=""
ARG NEXT_PUBLIC_MAILING_ADDRESS=""
ARG NEXT_PUBLIC_RETENTION_DAYS=""
ARG NEXT_PUBLIC_DELIVERY_PROVIDER_LABEL=""
RUN pnpm build && pnpm prune --prod
FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV LEAD_RATE_LIMIT_DIR=/app/runtime
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/next.config.ts ./next.config.ts
COPY --from=build --chown=node:node /app/scripts/prune-operational-data.mjs ./scripts/prune-operational-data.mjs
RUN mkdir /app/runtime && chown node:node /app/runtime
USER node
EXPOSE 3000
CMD ["node","node_modules/next/dist/bin/next","start"]
