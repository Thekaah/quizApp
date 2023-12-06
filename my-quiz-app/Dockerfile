FROM node:14-alpine

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]
