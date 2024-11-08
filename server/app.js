const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const config = require('./config');
const db = require('./config/db');
require('./utils/passport');
const http = require('http');
const setupApiRoutes = require('./routes');
// const initChatSocket = require('./sockets/chat');

const app = express();
const server = http.createServer(app);
db.connect();

app.use(cors({
  origin: config.clientURL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// setup endpoints routes
setupApiRoutes(app);

// initialize chat socket.io
// initChatSocket(server);

// server.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`)
// });

app.listen(config.port, () => {
  console.log(`[*] Server is running on port ${config.port}`);
});