FROM node:22

COPY . .

RUN npm i
RUN npm run bundle
