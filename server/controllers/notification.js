const Notification = require('../models/notification');

// @desc    Get all notifications for the logged-in user
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
    try {
        
        const status = req.body.status;

        const notifications = await Notification.find({ recipient: req.userId, status: 'pending' })
            .populate('sender', 'name surname')
            .populate('groupId', 'title')
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get all notifications for the logged-in user
// @route   GET /api/notifications
// @access  Private
const setAllSeen = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.userId })
            .populate('sender', 'name surname')
            .populate('groupId', 'title')
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getNotifications, setAllSeen }