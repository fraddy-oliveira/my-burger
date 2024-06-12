FROM node:10.15.3 AS dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM node:10.15.3 AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# TODO: wip - production build
FROM node:10.15.3 AS production
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN npm install --global serve@13.0.0
COPY --from=builder /usr/src/app/build ./build
EXPOSE 3000
CMD [ "serve", "-p", "3000", "/usr/src/app/build/" ]
