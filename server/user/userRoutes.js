const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAll,
    getById,
    registerUser,
} = require('./userController');

// GET all users
router.get('/', authMiddleware, getAll);

// GET user by id
router.get('/:id', authMiddleware, getById);

// POST register user
router.post('/register', registerUser);

module.exports = router;