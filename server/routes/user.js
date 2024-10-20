const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getAll,
    getById,
    getBySearch,
    registerUser,
    loginUser,
    updateUser,
    resetPassword,
} = require('../controllers/user');
const passport = require('passport');

// GET all users
router.get('/', authMiddleware, getAll);

// GET user by id
router.get('/:id', authMiddleware, getById);

// GET search user
router.get('/search', authMiddleware, getBySearch);

// POST update user
router.post('/', authMiddleware, updateUser);

// POST register user
router.post('/register', registerUser);

// POST user login
router.post('/login', loginUser);

// POST user reset password
router.post('/resetpassword', authMiddleware, resetPassword);

// GET google oauth
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// GET authenticated google oauth redirect
router.get('/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to your app
        res.redirect('/dashboard');
    }
);

// GET logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logged out successfully' });
        // res.redirect('/');
    });
});


module.exports = router;