FROM node:18-alpine AS base

ENV NEXT_TELEMETRY_DISABLED=1

#==== Prod Deps ====#
FROM base AS prod-deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

# copy package manager files
COPY package.json package-lock.json ./

# install dependencies
RUN --mount=type=cache,target=/root/.npm npm clean-install --only=production
# Install sharp to make nextjs image optimization possible
RUN --mount=type=cache,target=/root/.npm npm clean-install npm i sharp


#==== PROD BUILDER ====#
FROM base AS prod-builder

WORKDIR /app

# copy installed dependencies
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .   

RUN npm run build


####  RUNNER : final image ####
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# create separate users for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=prod-builder /app/public ./public

# copy built files from the builer layer
COPY --from=prod-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=prod-builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"


ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "./server.js"]
