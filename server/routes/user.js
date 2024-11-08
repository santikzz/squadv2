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
    getSelfUser,
    getUserOwnedGroups,
    getSelfGroups
} = require('../controllers/user');


router.get('/', authMiddleware, getAll);

router.get('/me', authMiddleware, getSelfUser);

router.get('/me/groups', authMiddleware, getSelfGroups);

router.get('/search', authMiddleware, getBySearch);

router.get('/:id', authMiddleware, getById);

router.get('/:id/groups', authMiddleware, getUserOwnedGroups);

// router.post('/register', registerUser);

router.post('/resetpassword', authMiddleware, resetPassword);

module.exports = router;