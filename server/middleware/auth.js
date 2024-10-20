const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {

    // check if user is authenticated via session (Google OAuth)
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next(); // exit middleware early if authenticated
    }

    // ==============================================================================================//

    // check if user is authenticated via jwt basic login
    const token = req.headers.authorization?.split(' ')[1]; // extract token from auth headers
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        // get user.token_version and check if the token_version matches the jwt version, if not invalidate token
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.token_version !== decoded.token_version) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.userId = decoded.userId; // set userId in the request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

};

module.exports = authMiddleware;