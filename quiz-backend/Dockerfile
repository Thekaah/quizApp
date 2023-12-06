FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY server.js ./
COPY questions.js ./


RUN npm install

EXPOSE 3001

CMD ["node", "server.js"]
