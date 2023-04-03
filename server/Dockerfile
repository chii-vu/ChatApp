FROM node:18.13.0

WORKDIR /usr/src/app

ENV PORT 8081
EXPOSE 8081

COPY . .

RUN npm install
# RUN npm rebuild bcrypt --build-from-source

CMD [ "npm", "start" ]