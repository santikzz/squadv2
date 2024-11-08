const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getNotifications,
    setAllSeen,
} = require('../controllers/notification');

router.get('/', authMiddleware, getNotifications);
// router.put('/', authMiddleware, setAllSeen);

module.exports = router;