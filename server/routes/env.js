const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getEnvironmentFull } = require('../controllers/env');

router.get('/', authMiddleware, getEnvironmentFull);

module.exports = router;