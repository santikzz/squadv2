const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getAll,
    getById,
    registerUser,
    loginUser,
} = require('../controllers/user');

// GET all users
router.get('/', authMiddleware, getAll);

// GET user by id
router.get('/:id', authMiddleware, getById);

// POST register user
router.post('/register', registerUser);

// POST user login
router.post('/login', loginUser);

module.exports = router;