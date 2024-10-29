const User = require('../models/user');
const config = require('../config');

const getEnvironmentFull = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('name surname email image_url');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getEnvironmentFull }