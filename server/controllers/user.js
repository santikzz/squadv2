const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { body, validationResult } = require('express-validator');

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

// @desc    Search users
// @route   GET /api/users/search
// @access  Private
const getBySearch = async (req, res) => {
    try {

        const { search = '' } = req.query;

        const searchQuery = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { surname: { $regex: search, $options: 'i' } },
            ],
        } : {};

        const users = await User.find(searchQuery);
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const registerUser = [

    body('name').isString().trim().notEmpty().isLength({ max: 48 }).withMessage('name must not exceed 48 characters'),
    body('surname').isString().trim().notEmpty().isLength({ max: 64 }).withMessage('surname must not exceed 48 characters'),
    body('email').trim().isEmail().withMessage('email must not exceed 64 characters'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('passwords don\'t match');
        }
        return true;
    }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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
];

// @desc    User login
// @route   POST /api/users/login
// @access  Public
const loginUser = [

    body('email').isString().trim().notEmpty(),
    body('password').isString().trim().notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            if (user.googleId !== null) {
                return res.status(400).json({ message: 'User already registered with google' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user._id, token_version: user.token_version }, config.JWT_SECRET, { expiresIn: '30 days' });

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
];

// @desc    Update user
// @route   PUT /api/users
// @access  Public
const updateUser = [

    body('name').isString().trim().notEmpty().isLength({ max: 48 }).withMessage('name must not exceed 48 characters'),
    body('surname').isString().trim().notEmpty().isLength({ max: 64 }).withMessage('surname must not exceed 48 characters'),
    body('about').isString().trim().notEmpty().isLength({ max: 256 }).withMessage('about must not exceed 256 characters'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const userId = req.userId;
            const { name, surname, about } = req.body;

            const user = await User.findByIdAndUpdate(
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
];


// @desc    Reset user password
// @route   POST /api/users/resetpassword
// @access  Private
const resetPassword = [

    body('currentPassword').isString().notEmpty(),
    body('newPassword').isLength({ min: 6 }).custom((value, { req }) => {
        if (value === req.body.currentPassword) {
            throw new Error('new password can\t be the same');
        }
        return true;
    }),
    body('newPasswordConfirmation').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('passwords don\'t match');
        }
        return true;
    }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            const userId = req.userId;
            const { currentPassword, newPassword } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.googleId !== null) {
                return res.status(400).json({ message: 'Can\'t reset a google password' });
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid current password' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await User.findByIdAndUpdate(
                userId,
                {
                    password_hash: hashedPassword,
                    $inc: { token_version: 1 },
                },
                { new: true, runValidators: true }
            );

            res.status(200).json({ message: 'Password updated successfully' });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
];


// @desc    Get self authenticated user data
// @route   POST /api/users/me
// @access  Private
const getSelfUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = { getAll, getById, getBySearch, registerUser, updateUser, loginUser, resetPassword, getSelfUser }