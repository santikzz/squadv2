const User = require('./userModel');
const bcrypt = require('bcrypt');

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

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User.save({
            name,
            surname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Update user
// @route   PUT /api/users
// @access  Public
const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, surname, about } = req.body;

        const user = User.findByIdAndUpdate(
            userId,
            {
                name,
                surname,
                about,
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAll, getById, registerUser, updateUser }