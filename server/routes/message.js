const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getMessagesByGroupId } = require('../controllers/message');

router.get('/group/:id', authMiddleware, getMessagesByGroupId);

module.exports = router;