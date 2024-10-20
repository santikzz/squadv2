const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
// const dotenv = require('dotenv');

const config = require('./config');

const db = require('./config/db');
require('./utils/passport');

// dotenv.config();
const app = express();
db.connect();
app.use(cors());
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

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to your app
    res.redirect('/dashboard');
  }
);

// Logout Route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  res.send('<a href="auth/google">Authenticate with google</a>')
});

// Simple Route to Check if Logged In
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`Hello ${req.user.name}, welcome to your dashboard!`);
});

app.use('/api/users', require('./routes/user'));
app.use('/api/groups', require('./routes/group'));

app.listen(config.port, () => {
  console.log(`[*] Server is running on port ${config.port}`);
});