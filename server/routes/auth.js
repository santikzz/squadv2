const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');
const { loginUser, registerUser } = require('../controllers/user');
const jwt = require('jsonwebtoken');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {

    failureRedirect: config.clientURL + '/login',
}),
    (req, res) => {
        const user = req.user;
        const token = jwt.sign({ userId: user._id, token_version: user.token_version }, config.jwtSecret);
        res.redirect(`${config.clientURL}/auth?token=${token}`);
    }
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(`${config.clientURL}/login`);
    });
});

module.exports = router