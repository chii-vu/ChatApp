# FROM node:18.13.0

# WORKDIR /usr/src/app

# ENV PORT 8081
# EXPOSE 8081

# COPY . .

# RUN npm install
# # RUN npm rebuild bcrypt --build-from-source

# CMD [ "npm", "start" ]
ARG NODE_VERSION=19-alpine3.16
FROM node:${NODE_VERSION}

ENV PORT 8081

# Expose port
EXPOSE 8081

RUN apk update && apk add bash

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

# Copy files
COPY . .

# Start the app
CMD [ "npm", "start" ]