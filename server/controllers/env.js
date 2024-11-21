const User = require('../models/user');
const config = require('../config');
const { getOwnedAndJoinedGroups } = require('./group');

const getEnvironmentFull = async (req, res) => {
    try {
        
        const userId = req.userId;
        const user = await User.findById(userId).select('name surname email image_url');
        const groups = await getOwnedAndJoinedGroups(userId);

        res.status(200).json({
            user: user,
            groups: groups,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getEnvironmentFull }