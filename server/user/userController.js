const User = require('./userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getById = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAll, getById }