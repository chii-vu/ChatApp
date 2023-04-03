FROM node:14

WORKDIR /usr/src/app

ENV PORT 8081
EXPOSE 8081

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]