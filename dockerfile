FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm update guifier

RUN npm run build

CMD ["npm","run","prod"]