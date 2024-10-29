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
    getSelfUser
} = require('../controllers/user');


router.get('/', authMiddleware, getAll);

router.get('/me', authMiddleware, getSelfUser);

router.get('/search', authMiddleware, getBySearch);

router.get('/:id', authMiddleware, getById);

router.post('/', authMiddleware, updateUser);

// router.post('/register', registerUser);

router.post('/resetpassword', authMiddleware, resetPassword);

module.exports = router;