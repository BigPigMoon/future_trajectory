FROM node:19 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM node:19

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [ "npm", "run", "start:prod"]