const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

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
        const user = await User.findById(req.params.id);
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

        const user = new User({
            name,
            surname,
            email,
            password_hash: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    User login
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '30 days' });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
            },
        });

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

module.exports = { getAll, getById, registerUser, updateUser, loginUser }