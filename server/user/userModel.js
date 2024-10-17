const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        // required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    about: {
        type: String,
        default: null,
    },
    image_url: {
        type: String,
        default: null,
    },
    password_hash: {
        type: String,
        // required: true,
    },
    email_verified_at: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);