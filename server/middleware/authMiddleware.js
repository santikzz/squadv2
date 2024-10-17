const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // extract token from auth headers

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // set userId in the request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

};

module.exports = authMiddleware;