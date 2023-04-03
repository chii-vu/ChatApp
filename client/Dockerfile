FROM node:latest

# Create app directory
WORKDIR /usr/src/app

ENV PORT 8080
EXPOSE 8080

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

CMD ["npm", "start"]
