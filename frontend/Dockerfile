FROM node:19

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENV NODE_ENV production
ENV PORT 80

EXPOSE 80

CMD [ "npx", "serve", "-s", "build", "-p", "80"]