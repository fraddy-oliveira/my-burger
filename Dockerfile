FROM node:18.20.4-alpine3.20 AS dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM node:18.20.4-alpine3.20 AS builder
WORKDIR /usr/src/app
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG NEXT_PUBLIC_BACKEND_BASE_URL
ENV NEXT_PUBLIC_BACKEND_BASE_URL $NEXT_PUBLIC_BACKEND_BASE_URL
ARG NEXT_PUBLIC_WEB_ANALYTICS_TOKEN
ENV NEXT_PUBLIC_WEB_ANALYTICS_TOKEN $NEXT_PUBLIC_WEB_ANALYTICS_TOKEN
COPY package.json package-lock.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18.20.4-alpine3.20 AS production
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN npm install --global serve
COPY --from=builder /usr/src/app/build ./build
EXPOSE 3000
CMD [ "serve", "-p", "3000", "/usr/src/app/build/" ]
