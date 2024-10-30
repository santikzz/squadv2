const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const config = require('./config');
const db = require('./config/db');
require('./utils/passport');

const app = express();
db.connect();
app.use(cors({
  // origin: 'https://squadv2.xnebula.duckdns.org',
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true,
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


// ======================= ROUTES ======================= //


// app.get('/', (req, res) => {
//   res.send('<a href="auth/google">Authenticate with google</a>')
// });

// app.get('/dashboard', (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   res.send(`Hello ${req.user.name}, welcome to your dashboard!`);
// });

app.use('/auth', require('./routes/auth'));
app.use('/api/environment', require('./routes/env'));
app.use('/api/users', require('./routes/user'));
app.use('/api/groups', require('./routes/group'));

app.listen(config.port, () => {
  console.log(`[*] Server is running on port ${config.port}`);
});