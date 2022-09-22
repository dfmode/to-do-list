FROM node:18-alpine3.15
WORKDIR /home/node/app
COPY package.json ./
RUN npm install
COPY . .
CMD node app.js
