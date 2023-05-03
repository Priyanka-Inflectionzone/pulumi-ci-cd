FROM node:18.12.0-alpine3.16 AS builder

WORKDIR /app

ADD . /app

COPY package*.json /app/

COPY tsconfig.json /app/

RUN npm install

RUN npm run build

#######################################

FROM node:18.12.0-alpine3.16

RUN apk add bash

# RUN apk add --no-cache \
#     python3 \
#     && rm -rf /var/cache/apk/*
# RUN apk add --update alpine-sdk
# RUN apk azzdd chromium \
#     harfbu

RUN apk update
RUN apk upgrade

WORKDIR /app
RUN rm -rf ./*

COPY --from=builder ./app/package*.json ./
COPY --from=builder ./app/build .

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
