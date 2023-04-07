Chi Vu
cpv616
11299008
CMPT 353
Project

This is a chat app built with React, Node.js, and MySQL. It uses Docker to run the client, server, and database in separate containers.

To run the chat app, go into the project directory and run `docker compose up`.
Three containers will be created: chatapp-node, chatapp-react, and mysql:5.7.
Nagivate to `localhost:8081` to view the app.

File Structure

chat-app/
├── client/
│   ├── build/
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── …
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── …
│   │   ├── helpers/
│   │   │   ├── AuthContext.js
│   │   ├── images/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── …
│   ├── node_modules/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── dbfiles/
├── server/
│   ├── config/
│   │   ├── config.json
│   ├── middlewares/
│   │   ├── AuthMiddleWare.js
│   ├── models/
│   │   ├── Channels.js
│   │   ├── Comments.js
│   │   ├── index.js
│   │   ├── Likes.js
│   │   ├── Posts.js
│   │   └── Users.js
│   ├── node_modules/
│   ├── routes/
│   │   ├── channels.js
│   │   ├── comments.js
│   │   ├── likes.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── .dockerignore
├── .gitignore
└── docker-compose.yml

All the code for the client is in the client directory. The server code is in the server directory. The dbfiles directory contains the SQL file used to create the database.