const express = require('express');
const router = express.Router();
const { getAll, getById } = require('./userController');

// GET all users
router.get('/', getAll);

// GET user by id
router.get('/:id', getById);

// router.post('/', createUser);
// router.put('/', updateUser);

module.exports = router;