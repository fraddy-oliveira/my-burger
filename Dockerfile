FROM node:18.20.4-alpine3.20 AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:18.20.4-alpine3.20 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18.20.4-alpine3.20 AS production
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/.env ./
RUN npm ci --production
EXPOSE 3000
CMD [ "npm", "run", "start" ]
