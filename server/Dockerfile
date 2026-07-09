FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
COPY prisma ./prisma
COPY src ./src
COPY .env.example ./

RUN npm install --production
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "server.js"]
