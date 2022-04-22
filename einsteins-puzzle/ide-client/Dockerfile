FROM node:16.14.2-slim
WORKDIR /ide-client

# ENV PATH /ide-client/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json ./

RUN npm install
# RUN npm install react-scripts@3.4.1 -g 

COPY . .

CMD ["npm", "start"]
