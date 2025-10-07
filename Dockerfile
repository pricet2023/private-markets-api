# ---- Build stage ----
FROM node:20-bookworm AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# ---- Production stage ----
FROM node:20-bookworm AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

COPY run_backend.sh .

RUN chmod +x ./run_backend.sh



EXPOSE 3000

CMD ["/app/run_backend.sh"]