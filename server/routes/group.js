const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getAll,
    getById,
    createGroup,
    updateGroup,
    deleteGroup,
    joinGroup,
    manageJoinRequest,
    leaveGroup,
    kickMember
} = require('../controllers/group');

// GET all groups
router.get('/', authMiddleware, getAll);

// GET group by id
router.get('/:id', authMiddleware, getById);

// POST create group
router.post('/', authMiddleware, createGroup);

// PUT update group
router.put('/:id', authMiddleware, updateGroup);

// DELETE group
router.delete('/:id', authMiddleware, deleteGroup);

// POST join group (public/private)
router.post('/:id/join', authMiddleware, joinGroup);

// POST owner manage join request (accept/decline)
router.post('/:id/join-request', authMiddleware, manageJoinRequest);

// POST leave group
router.post('/:id/leave', authMiddleware, leaveGroup);

// POST owner kick member from group
router.post('/:id/kick', authMiddleware, kickMember);

module.exports = router;