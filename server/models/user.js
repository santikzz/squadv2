const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        required: true,
        maxlength: [48, 'name must not exceed 48 characters'],
    },
    surname: {
        type: String,
        maxlength: [48, 'surname must not exceed 48 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxlength: [64, 'email must not exceed 64 characters'],
    },
    about: {
        type: String,
        default: null,
        maxlength: [256, 'about must not exceed 48 characters'],
    },
    image_url: {
        type: String,
        default: null,
    },
    password_hash: {
        type: String,
    },
    email_verified_at: {
        type: Date,
        default: null,
    },
    token_version: {
        type: Number,
        default: 0,
        min: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);