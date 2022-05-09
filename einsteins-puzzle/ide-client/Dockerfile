FROM node:16.14.2-slim
WORKDIR /ide-client

COPY package.json .
COPY package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
